import React, { createContext, useState} from "react";

const ModalContext = createContext()

function ModalProvider({ children }){
    const [open, setOpen] = useState(false);

    return (
        <ModalContext.Provider value={{ open, setOpen }}>
            {children}
        </ModalContext.Provider>
    )
}

export {ModalContext, ModalProvider}