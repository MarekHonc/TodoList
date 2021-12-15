import { FC, PropsWithChildren } from "react";
import { modalTypes } from "../code/modal.open.states";

/**
 * Rozhraní, definující předané parametry modalu.
 */
export interface ModalProps extends PropsWithChildren<any> {
    close: (newModal: modalTypes) => void,
    onSuccess: (callbackData: any) => void,
    modalType: modalTypes,
    title: string,
}

/**
 * Základní komponenta pro modal.
 */
const Modal: FC<ModalProps> = (props) => {
    return(
        <div className="fixed z-50 inset-0 overflow-y-auto ease-out duration-400">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
                <div className="relative inline-block align-bottom bg-white text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                    <h1 className="text-2xl m-4 pb-4 mb-0 border-b-2">
                        {props.title}
                        <span className="absolute top-2 bottom-0 right-0 px-4 py-3" onClick={() => props.close(modalTypes.closed)}>
                            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Zavřít</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                        </span>
                    </h1>
                    <form action="" onSubmit={props.onSubmit}>
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            {props.children}
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                                {props.modalType === modalTypes.delete &&
                                    <input
                                        type="submit"
                                        value="Uložit"
                                        className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                                    />
                                }
                                {(props.modalType === modalTypes.create || props.modalType === modalTypes.update) &&
                                    <button type="submit" className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                                        Uložit
                                    </button>
                                }
                            </span>
                            <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                                <button type="button"
                                        className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                                        onClick={() => props.close(modalTypes.closed)}>
                                    Zrušit
                                </button>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Modal;