import { Fragment } from 'react';
import { Dialog } from '@headlessui/react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalBase: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <Fragment>
      {isOpen && (
        <Dialog open={isOpen} onClose={onClose} className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 text-center">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />

            <div className="z-10 inline-block p-4 my-8 text-left align-middle bg-[rgb(209,228,254)] rounded-lg shadow-custom border-custom">

              {children}

            </div>
          </div>
        </Dialog>
      )}
    </Fragment>
  );
};

export default ModalBase;
