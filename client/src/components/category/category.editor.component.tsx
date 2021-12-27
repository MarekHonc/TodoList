import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { modalTypes } from '../../code/modal.open.states';
import CategoryService, { Category } from '../../services/category.service';
import Modal, { ModalProps } from '../modal.component';

/**
 * Interface, definující prvky předané editoru.
 */
interface EditorProps extends ModalProps {
    id?: string
}

/**
 * Komponenta pro editor kategorie.
 */
function CategoryEditor(props: EditorProps) {
    // Deklarace hook form pro práci s formulářem.
    const { register, handleSubmit, setValue, formState: {errors}} = useForm<Category>({ mode: "onChange" });

    // Natáhnu údaje o potencionální kategorii.
    useEffect(() => {
        if(props.id){
            CategoryService.get(props.id || "").then(response => {
                setValue("name", response.name);
                setValue("description", response.description);
                setValue("color", response.color);
            });
        }
    }, [props.id]);

    // Handler pro submit formuláře.
    const onSubmit = handleSubmit(({name, description, color}) => {
        let promise;

        // Podle typu modelu.
        // Buď vytvářím.
        if(props.modalType === modalTypes.create) {
            promise = CategoryService.create({name, description, color});
        }
        // Nebo edituji
        else {
            promise = CategoryService.update({id: props.id || "", name, description, color});
        }

        promise?.then(() => {
            props.onSuccess("Uloženo");
            props.close(modalTypes.closed);
        });
    });

    return(
        <Modal {...props} onSubmit={onSubmit} >
            <div className="mb-4">
                <label htmlFor="name" className="text-sm font-bold text-gray-600 block">Název</label>
                <input 
                    {...register("name", {
                        required: true
                    })}
                    name="name"
                    id="name"
                    style={{ borderColor: errors.name ? "red" : "" }}
                    type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1"
                />
                <span className="text-sm text-red-500 mt-2 block">
                    {errors.name && errors.name.type === "required" && "Název je povinný"}
                </span>
            </div>
            <div className="mb-4">
                <label htmlFor="name" className="text-sm font-bold text-gray-600 block">Barva</label>
                <input 
                    {...register("color", {
                        required: true,
                        pattern: /^#(?:[0-9a-fA-F]{3}){1,2}$/
                    })}
                    name="color"
                    id="color"
                    style={{ borderColor: errors.name ? "red" : "" }}
                    type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1"
                    placeholder="#000000"
                />
                <span className="text-sm text-red-500 mt-2 block">
                    {errors.color && errors.color.type === "required" && "Barva je povinná"}
                    {errors.color && errors.color.type === "pattern" && "Barva nemá správný tvar"}
                </span>
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="text-sm font-bold text-gray-600 block">Popisek</label>
                <textarea
                    {...register("description", {})}
                    id="description"
                    name="description"
                    className="shadow appearance-none border mt-1 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                </textarea>
            </div>
        </Modal>
    );
}

export default CategoryEditor;