"use client";

import {useEffect, useState} from "react";
import {createPortal} from "react-dom";

interface ModalTopAlertProps {
    children: React.ReactNode | React.ReactNode[];
    onClose: () => void;
    duration?: number;
    open: boolean;
}

export default function ModalTopAlert({
                                          children,
                                          onClose,
                                           open
                                          // duration = 100000,
                                      }: ModalTopAlertProps) {
    const [isVisible, setIsVisible] = useState(open);
    const modalRoot = document.getElementById("modal-root");

    useEffect(() => {
        setIsVisible(true);
        //
        // const timer = setTimeout(() => {
        //     setIsVisible(false);
        //     setTimeout(onClose, 300);
        // }, duration);

        document.body.style.overflow = "hidden";

        return () => {
            // clearTimeout(timer);
            document.body.style.overflow = "auto";
        };
    }, [ onClose]);

    if (!modalRoot) return null;

    return createPortal(
        <>
            <div
                className="fixed inset-0 bg-gray-200 z-40"
                onClick={onClose}
            ></div>


            <div
                className={`fixed top-0 left-0 w-full flex justify-center transition-transform duration-300 z-50 ${
                    isVisible ? "translate-y-0" : "-translate-y-full"
                }`}
            >
                <div
                    className="bg-gray-100 shadow-md px-6 py-3 rounded-b-md text-black font-medium border border-gray-200"
                    onClick={(e) => e.stopPropagation()} // чтобы клик внутри не закрыл модалку
                >
                    {children}
                </div>
            </div>
        </>,
        modalRoot
    );
}