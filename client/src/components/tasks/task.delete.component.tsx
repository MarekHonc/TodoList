import { useForm } from 'react-hook-form';
import { modalTypes } from '../../code/modal.open.states';
import TaskService from '../../services/tasks.service';
import Modal, { ModalProps } from '../modal.component';

/**
 * Interface, definující prvky předané editoru.
 */
interface DeleteProps extends ModalProps {
    id: string
}

/**
 * Komponenta pro smazání úkolu.
 */
function TaskDelete(props: DeleteProps) {
    const { handleSubmit } = useForm({ mode: "onChange" });

    // Na odeslání formuláře pouze mažu.
    const onSumbit = handleSubmit(() => {
        TaskService.delete(props.id).then(() => {
            props.onSuccess("Smazáno");
            props.close(modalTypes.closed);
        })
    });

    return (
        <Modal {...props} onSubmit={onSumbit} >
            <p>Opravdu si přejede smazat tento úkol?</p>
        </Modal>
    )
}

export default TaskDelete;