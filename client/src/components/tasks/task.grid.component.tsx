import { ExtendedTask } from "../../services/tasks.service";

/**
 * Rozhraní pro předané vlastnosti gridu.
 */
interface GridProps {
    tasks: ExtendedTask[],
    categories: any
    edit: (id: string) => void,
    delete: (id: string) => void
}

/**
 * Grid se všemi uloženými kategoriemi.
 */
function TaskGrid(props: GridProps) {
    return (
        <tbody>
            {props.tasks.map(task => {
                return(
                    <tr key={task._id} className="border-t-2 border-b-2">
                        <td className="w-4 my-4" style={{ backgroundColor: props.categories[task.category].color }}></td>
                        <td className="my-4 p-2">
                            <span onClick={() => props.edit(task._id)} className="block text-blue-500 hover:text-blue-700 hover:underline cursor-pointer font-bold text-xl">{task.name}</span>
                            <p>{task.description}</p>
                        </td>
                        <td className="my-4 float-right">
                            <button onClick={() => props.delete(task._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded">Smazat</button>
                        </td>
                    </tr>
                )
            })}
        </tbody>
    )
}

export default TaskGrid;