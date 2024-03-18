import React from 'react'

interface ModalProps {
    modalOpen: boolean,
    setModalOpen: (open: boolean) => boolean | void,
    children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ modalOpen, setModalOpen, children }) => {
    return (
        <dialog id="my_modal_1" className={`modal ${modalOpen ? 'modal-open' : ''}`}>
            <div className='modal-box'>
                {children}
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn" onClick={() => setModalOpen(false)}>Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default Modal