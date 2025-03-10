import { PropsWithChildren, useState } from "react";
import { ModalContext } from "common/context/ModalContext";
import { Modal } from "common/utils/enums";

export const ModalProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [modal, setModal] = useState<Modal | null>(null);

	return <ModalContext.Provider value={{ modal, setModal }}>{children}</ModalContext.Provider>;
};
