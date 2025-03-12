import { Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";

interface IForm {
	password: string;
}

const defaultFormValues: IForm = {
	password: "",
};

interface IProps {
	isOpen: boolean;
	password: string;
	handleSuccess: () => void;
	handleClose: () => void;
}

export const ModalPassword: React.FC<IProps> = ({ isOpen, password, handleSuccess, handleClose }) => {
	const [formValues, setFormValues] = useState<IForm>(defaultFormValues);
	const [error, setError] = useState<string | null>(null);

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (formValues.password !== password) {
			setError("Incorrect password");
			return;
		}

		handleSuccess();
		onClose();
	};

	const onClose = () => {
		handleClose();
		setError(null);
		setFormValues(defaultFormValues);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormValues((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<Dialog open={isOpen} onClose={onClose} className="relative z-10 focus:outline-none">
			<DialogBackdrop className="fixed inset-0 bg-black/30" />

			<div className="fixed inset-0 flex w-screen items-center justify-center p-4">
				<DialogPanel className="max-w-lg space-y-4 bg-white p-12">
					<DialogTitle className="font-bold">Password</DialogTitle>
					<p>Please enter the password below:</p>

					<form className="space-y-4" onSubmit={onSubmit}>
						<input
							id="password"
							type="password"
							name="password"
							value={formValues.password}
							onChange={handleChange}
							className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none sm:text-sm"
						/>

						{error && <p className="mt-4 text-sm text-red-500">{error}</p>}

						<div className="flex justify-center gap-4">
							<Button
								onClick={onClose}
								className="cursor-pointer rounded-md bg-gray-300 px-4 py-2 text-sm font-medium text-gray-800 focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[hover]:bg-gray-400 data-[open]:bg-gray-300"
							>
								Cancel
							</Button>
							<Button
								type="submit"
								className="cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[hover]:bg-blue-700 data-[open]:bg-blue-600"
							>
								Submit
							</Button>
						</div>
					</form>
				</DialogPanel>
			</div>
		</Dialog>
	);
};
