import { Button, Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { AuthContext } from "common/context/AuthContext";
import { ModalContext } from "common/context/ModalContext";
import { Modal } from "common/utils/enums";
import { auth } from "firebase";
import { signOut } from "firebase/auth";
import { useContext } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router";

const navigation = [
	{ name: "Standings", href: "/" },
	{ name: "Players", href: "/players" },
	{ name: "Schedule", href: "/schedule" },
];

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
		<Disclosure as="nav" className="bg-neutral-900 text-white">
			<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
				<div className="relative flex h-16 items-center justify-between">
					<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
						<DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
							<span className="absolute -inset-0.5" />
							<span className="sr-only">Open main menu</span>
							<Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
							<XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
						</DisclosureButton>
					</div>
					<div className="flex flex-1 items-center justify-center sm:justify-between sm:gap-4">
						<div className="flex shrink-0 items-center gap-2">
							<img alt="Ultimate Stag Games" src="/stag.svg" className="h-8 w-auto" />
							<h4 className="font-bold">ULTIMATE STAG GAMES</h4>
						</div>
						<div className="hidden items-center sm:flex sm:gap-4">
							{navigation.map((item) => (
								<NavLink
									key={item.name}
									to={item.href}
									className="hover:underline [&.active]:underline"
								>
									{item.name}
								</NavLink>
							))}
							{user ? (
								<Button onClick={onLogout} className="cursor-pointer hover:underline">
									Logout
								</Button>
							) : (
								<Button onClick={onLogin} className="cursor-pointer hover:underline">
									Login
								</Button>
							)}
						</div>
					</div>
				</div>
			</div>

			<DisclosurePanel className="sm:hidden">
				<div className="space-y-1 px-2 pt-2 pb-3">
					{navigation.map((item) => (
						<DisclosureButton
							key={item.name}
							as={NavLink}
							to={item.href}
							className="block px-3 py-2 hover:underline [&.active]:underline"
						>
							{item.name}
						</DisclosureButton>
					))}
					{user ? (
						<DisclosureButton onClick={onLogout} className="block cursor-pointer px-3 py-2 hover:underline">
							Logout
						</DisclosureButton>
					) : (
						<DisclosureButton onClick={onLogin} className="block cursor-pointer px-3 py-2 hover:underline">
							Login
						</DisclosureButton>
					)}
				</div>
			</DisclosurePanel>
		</Disclosure>
	);
};
