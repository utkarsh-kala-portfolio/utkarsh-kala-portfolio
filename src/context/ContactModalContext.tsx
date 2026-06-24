import React, { createContext, useContext, useState, type ReactNode } from "react";

type ContactType = "whatsapp" | "email" | "connect" | "cv" | null;

interface ContactModalContextProps {
  isOpen: boolean;
  contactType: ContactType;
  openModal: (type: ContactType) => void;
  closeModal: () => void;
}

const ContactModalContext = createContext<ContactModalContextProps | undefined>(undefined);

export const ContactModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [contactType, setContactType] = useState<ContactType>(null);

  const openModal = (type: ContactType) => {
    setContactType(type);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => setContactType(null), 300); // clear after animation
  };

  return (
    <ContactModalContext.Provider value={{ isOpen, contactType, openModal, closeModal }}>
      {children}
    </ContactModalContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useContactModal = () => {
  const context = useContext(ContactModalContext);
  if (!context) {
    throw new Error("useContactModal must be used within a ContactModalProvider");
  }
  return context;
};
