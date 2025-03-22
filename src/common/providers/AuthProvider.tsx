import { PropsWithChildren, useEffect, useState } from "react";
import { AuthContext } from "common/context/AuthContext";
import { PageLoader } from "common/components/PageLoader";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "firebase";
import { IUserData } from "common/utils/types";
import { doc, getDoc } from "firebase/firestore";

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [userData, setUserData] = useState<IUserData | null>(null);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
			setUser(authUser);

			if (authUser) {
				// Fetch user data from Firestore
				const userRef = doc(db, "users", authUser.uid);
				const userSnap = await getDoc(userRef);

				if (userSnap.exists()) {
					setUserData(userSnap.data() as IUserData);
				} else {
					console.log("No user data found in Firestore");
					setUserData(null);
				}
			} else {
				setUserData(null);
			}

			setIsLoaded(true);
		});

		return unsubscribe;
	}, []);

	if (!isLoaded) {
		return <PageLoader />;
	}

	return <AuthContext.Provider value={{ user, userData }}>{children}</AuthContext.Provider>;
};
