import { useForm } from 'react-hook-form';
import { modalTypes } from '../../code/modal.open.states';
import CategoryService from '../../services/category.service';
import Modal, { ModalProps } from '../modal.component';

/**
 * Interface, definující prvky předané editoru.
 */
interface DeleteProps extends ModalProps {
    id: string
}

/**
 * Komponenta pro smazání kategorie.
 */
function CategoryDelete(props: DeleteProps) {
    const { handleSubmit } = useForm({ mode: "onChange" });

    // Na odeslání formuláře pouze mažu.
    const onSumbit = handleSubmit(() => {
        CategoryService.delete(props.id).then(() => {
            props.onSuccess("Smazáno");
            props.close(modalTypes.closed);
        })
    });

    return (
        <Modal {...props} onSubmit={onSumbit} >
            <p>Opravdu si přejede smazat tuto kategorii?</p>
        </Modal>
    )
}

export default CategoryDelete;