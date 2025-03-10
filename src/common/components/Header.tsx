import { Button } from "@headlessui/react";
import { AuthContext } from "common/context/AuthContext";
import { ModalContext } from "common/context/ModalContext";
import { Modal } from "common/utils/enums";
import { auth } from "firebase";
import { signOut } from "firebase/auth";
import { useContext } from "react";

export const Header: React.FC = () => {
	const user = useContext(AuthContext);
	const { setModal } = useContext(ModalContext);

	const onLogin = () => {
		setModal(Modal.Login);
	};

	const onLogout = () => {
		signOut(auth);
	};

	return (
		<header className="flex justify-between bg-neutral-900 p-5 text-white">
			<h4 className="font-bold">ULTIMATE STAG GAMES</h4>

			<nav className="ml-auto flex gap-4">
				<a href="/" className="hover:underline">
					Standings
				</a>
				<a href="/players" className="hover:underline">
					Players
				</a>
				{user ? (
					<Button onClick={onLogout} className="cursor-pointer hover:underline">
						Logout
					</Button>
				) : (
					<Button onClick={onLogin} className="cursor-pointer hover:underline">
						Login
					</Button>
				)}
			</nav>
		</header>
	);
};
