import React from "react";
import { User } from "firebase/auth";
import { IUserData } from "common/utils/types";

interface AuthContextProps {
	user: User | null;
	userData: IUserData | null;
}

export const AuthContext = React.createContext<AuthContextProps | null>(null);
