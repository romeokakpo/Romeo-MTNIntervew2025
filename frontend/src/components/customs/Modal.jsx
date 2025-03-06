const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 flex
                        items-center justify-center
                        bg-black/30"
    >
      <div
        className="bg-white rounded-lg
                            shadow-lg p-6 max-w-md
                            w-full relative"
      >
        <button
          className="absolute top-2 right-2
                               text-gray-500 hover:text-gray-700 cursor-pointer"
          onClick={onClose}
        >
          &#x2715; {/* Close button */}
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
