import React from "react";
import { Modal } from "common/utils/enums";

interface ModalContextType {
	modal: Modal | null;
	setModal: React.Dispatch<React.SetStateAction<Modal | null>>;
}

export const ModalContext = React.createContext<ModalContextType>({
	modal: null,
	setModal: () => {},
});
