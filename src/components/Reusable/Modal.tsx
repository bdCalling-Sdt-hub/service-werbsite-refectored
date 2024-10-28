import {
  MouseEvent,
  ReactNode,
  createContext,
  useContext,
  useRef,
} from "react";
import { createPortal } from "react-dom";

type TModal = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
};
type TModalContext = {
  onClose: () => void;
};
type TCloseButton = {
  children?: ReactNode;
};
type THeader = TCloseButton;
const ModalContext = createContext<TModalContext | null>(null);

const Modal = ({ isOpen, onClose, children, className }: TModal) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const handleOutsideClose = (e: MouseEvent) => {
    if (!containerRef.current?.contains(e.target as Node)) {
      onClose();
    }
  };
//   console.log(isOpen);
  return createPortal(
    <ModalContext.Provider value={{ onClose }}>
      <div
        onClick={handleOutsideClose}
        className={`fixed inset-0 flex justify-center items-center bg-gray-800/70 z-[999] transition-all ${
          isOpen ? "visible" : "invisible"
        }`}
      >
        <div
          ref={containerRef}
          className={className || "bg-white w-full max-w-sm rounded-md p-5"}
        >
          {children}
        </div>
      </div>
    </ModalContext.Provider>,
    document.getElementById("portal") as Element
  );
};

const CloseButton = ({ children }: TCloseButton) => {
  const { onClose } = useContext(ModalContext) as TModalContext;
  return (
    <button onClick={onClose} className="ml-auto">
      {children ? (
        children
      ) : (
        <svg
          className="size-6 bg-red-400 rounded-md p-0.5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      )}
    </button>
  );
};

const Header = ({ children }: THeader) => {
  return (
    <div className="flex justify-between items-center w-full mb-2">
      {children}
    </div>
  );
};

Modal.CloseButton = CloseButton;
Modal.Header = Header;

export default Modal;
