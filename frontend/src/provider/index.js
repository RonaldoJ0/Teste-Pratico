import React, { createContext, useState } from "react";
import api from "../services/api";

const ModalContext = createContext();

function ModalProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [dataUser, setDataUser] = useState(null);

  async function handleGet() {
    try {
      const resp = await api.get("v1/users/?skip=0&limit=100");
      setDataUser(resp.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ModalContext.Provider
      value={{ open, setOpen, dataUser, setDataUser, handleGet }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export { ModalContext, ModalProvider };
