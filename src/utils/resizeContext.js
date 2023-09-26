import { createContext, useContext, useState } from "react";

const ResizeContext = createContext();

export const useSideNav = () => useContext(ResizeContext);

export const SideNavProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <ResizeContext.Provider value={{ isOpen, toggleIsOpen }}>
      {children}
    </ResizeContext.Provider>
  );
};
