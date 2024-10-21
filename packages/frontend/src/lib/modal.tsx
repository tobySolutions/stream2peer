import { ReactNode } from "react";
import { GrClose } from "react-icons/gr";


const Modal = ({ isOpen, onClose, title, children }: {isOpen: boolean, onClose: () => void, title?: string, children: ReactNode}) => {
  if (!isOpen) return null; // If modal is not open, don't render anything

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 md:max-w-[550px] rounded-lg shadow-lg max-w-sm w-full relative">
        {/* Modal Close Button */}
        <button
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <GrClose size={22}/>
        </button>

        {/* Modal Title */}
        {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}

        {/* Modal Content */}
        <div className="mb-4">{children}</div>

        {/* Close Modal Button */}
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
