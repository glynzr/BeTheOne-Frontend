import React, { useState } from "react";
import Modal, { setAppElement } from "react-modal";
import { MdClose } from "react-icons/md";
const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};

Modal.setAppElement("#root");

export function useModal({
    title,
    children,
}: {
    title: string;
    children?: string | string[] | JSX.Element | JSX.Element[];
}) {
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return {
        element: (
            <Modal
                style={customStyles}
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
            >
                <div className="h-[32px] flex justify-between items-center gap-8">
                    <div className="text-base">{title}</div>
                    <div onClick={closeModal} className="cursor-pointer">
                        <MdClose />
                    </div>
                </div>
                <hr />
                {children}
            </Modal>
        ),
        openModal,
        closeModal,
    };
}
