import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { modalTypes } from '../../code/modal.open.states';
import TaskService, { Task } from '../../services/tasks.service';
import ReactDatePicker, { registerLocale }  from "react-datepicker";
import Modal, { ModalProps } from '../modal.component';
import el from "date-fns/locale/cs";
import CategoryService from '../../services/category.service';
import { priority, status } from '../../code/constants';

/**
 * Interface, definující prvky předané editoru.
 */
interface EditorProps extends ModalProps {
    id?: string
}

/**
 * Komponenta pro editor kategorie.
 */
function TaskEditor(props: EditorProps) {
    const dateFormat = "dd. MM. yyyy";

    // Deklarace hook form pro práci s formulářem.
    const { register, handleSubmit, setValue, formState: {errors}, control} = useForm<Task>({ mode: "onChange" });
    const [ availableCategories, setAvailableCategories ] = useState([]);

    registerLocale("cs", el);

    if(props.modalType === modalTypes.create){
        setValue("priority", priority.normal);
    }

    // Natáhnu údaje o potencionální kategorii.
    useEffect(() => {
        CategoryService.getAll().then(data => {
            setAvailableCategories(data)
            
            if(data.length > 0 && props.modalType === modalTypes.create){
                setValue("category", data[0]._id);    
            }
        }).then(() => {
            if(props.id){
                TaskService.get(props.id || "").then(response => {
                    setValue("name", response.name);
                    setValue("description", response.description);
                    setValue("deadline", new Date(response.deadline));
                    setValue("status", response.status);
                    setValue("priority", response.priority);
                    setValue("category", response.category);
                });
            }    
        });
    }, [props.id, setValue, props.modalType]);

    // Handler pro submit formuláře.
    const onSubmit = handleSubmit(({name, description, deadline, status, priority, category}) => {
        let promise;

        // Podle typu modelu.
        // Buď vytvářím.
        if(props.modalType === modalTypes.create) {
            promise = TaskService.create({name, description, deadline, status, priority, category});
        }
        // Nebo edituji
        else {
            promise = TaskService.update({id: props.id || "", name, description, deadline, status, priority, category});
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
                <label htmlFor="deadline" className="text-sm font-bold text-gray-600 block">Termín</label>
                <Controller
                    control={control}
                    name="deadline"
                    render={({ field }) => (
                        <ReactDatePicker
                            {...register("deadline", {
                                required: true
                            })}
                            dateFormat={dateFormat}
                            locale="cs"
                            id="deadline"
                            minDate={new Date()}
                            className={(errors.deadline ? "border-red-400 " : "") + "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1"}
                            onChange={(date) => field.onChange(date)}
                            selected={field.value}
                        />
                    )}
                />
                <span className="text-sm text-red-500 mt-2 block">
                    {errors.deadline && errors.deadline.type === "required" && "Termín je povinný"}
                </span>
            </div>
            <div className="mb-4">
                <label htmlFor="category" className="text-sm font-bold text-gray-600 block">Kategorie</label>
                <select
                    {...register("category", {
                        required: true
                    })}
                    id="category"
                    name="category"
                    style={{ borderColor: errors.category ? "red" : "" }}
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 mt-1"
                >
                    {availableCategories.map((category : any) => {
                        return <option key={category._id} value={category._id} >{category.name}</option>
                    })}
                </select>
                <span className="text-sm text-red-500 mt-2 block">
                    {errors.category && errors.category.type === "required" && "Kategorie je povinná"}
                </span>
            </div>
            <div className="mb-4">
                <label htmlFor="priority" className="text-sm font-bold text-gray-600 block">Priorita</label>
                <select
                    {...register("priority", {
                        required: true
                    })}
                    id="priority"
                    name="priority"
                    style={{ borderColor: errors.priority ? "red" : "" }}
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 mt-1"
                >
                    <option value={priority.minor}>Malá</option>
                    <option value={priority.normal}>Normální</option>
                    <option value={priority.major}>Velká</option>
                    <option value={priority.critical}>Kritická</option>
                </select>
                <span className="text-sm text-red-500 mt-2 block">
                    {errors.priority && errors.priority.type === "required" && "Priorita je povinná"}
                </span>
            </div>
            <div className="mb-4">
                <label htmlFor="status" className="text-sm font-bold text-gray-600 block">Stav</label>
                <select
                    {...register("status", {
                        required: true
                    })}
                    id="status"
                    name="status"
                    style={{ borderColor: errors.status ? "red" : "" }}
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 mt-1"
                >
                    <option value={status.open}>Otevřeno</option>
                    <option value={status.in_progress}>Zpracováváno</option>
                    <option value={status.done}>Hotovo</option>
                </select>
                <span className="text-sm text-red-500 mt-2 block">
                    {errors.status && errors.status.type === "required" && "Status je povinná"}
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

export default TaskEditor;