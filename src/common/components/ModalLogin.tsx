import { Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from "react";
import { auth } from "firebase";
import { ModalContext } from "common/context/ModalContext";
import { Modal } from "common/utils/enums";

interface IForm {
	email: string;
	password: string;
}

const defaultFormValues: IForm = {
	email: "",
	password: "",
};

export const ModalLogin: React.FC = () => {
	const { modal, setModal } = useContext(ModalContext);
	const isOpen = modal === Modal.Login;
	const [formValues, setFormValues] = useState<IForm>(defaultFormValues);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const submit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		signInWithEmailAndPassword(auth, formValues.email, formValues.password)
			.then(handleClose)
			.catch((error) => {
				setError(error.message);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const handleClose = () => {
		setModal(null);
		setError(null);
		setFormValues(defaultFormValues);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormValues((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<Dialog open={isOpen} onClose={handleClose} className="relative z-10 focus:outline-none">
			<DialogBackdrop className="fixed inset-0 bg-black/30" />

			<div className="fixed inset-0 flex w-screen items-center justify-center p-4">
				<DialogPanel className="max-w-lg space-y-4 bg-white p-12">
					<DialogTitle className="font-bold">Login</DialogTitle>
					<p>Please enter your credentials below:</p>

					<form className="space-y-4" onSubmit={submit}>
						<div>
							<label htmlFor="email" className="block text-sm font-medium text-gray-700">
								Email
							</label>
							<input
								id="email"
								type="email"
								name="email"
								value={formValues.email}
								onChange={handleChange}
								className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none sm:text-sm"
							/>
						</div>
						<div>
							<label htmlFor="password" className="block text-sm font-medium text-gray-700">
								Password
							</label>
							<input
								id="password"
								type="password"
								name="password"
								value={formValues.password}
								onChange={handleChange}
								className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none sm:text-sm"
							/>
						</div>

						{error && <p className="mt-4 text-sm text-red-500">{error}</p>}

						<div className="flex justify-center gap-4">
							<Button
								onClick={handleClose}
								className="cursor-pointer rounded-md bg-gray-300 px-4 py-2 text-sm font-medium text-gray-800 focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[hover]:bg-gray-400 data-[open]:bg-gray-300"
							>
								Cancel
							</Button>
							<Button
								type="submit"
								className="cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[hover]:bg-blue-700 data-[open]:bg-blue-600"
								disabled={isLoading}
							>
								Login
							</Button>
						</div>
					</form>
				</DialogPanel>
			</div>
		</Dialog>
	);
};
