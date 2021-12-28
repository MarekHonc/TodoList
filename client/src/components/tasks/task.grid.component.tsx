import { ExtendedTask } from "../../services/tasks.service";
import { priority, status } from '../../code/constants';
import moment from "moment";

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
    const prioritySwitch = (pr: priority) => {
        switch(pr) {
            case priority.minor:
                return "Nízká";
            case priority.normal:
                return "Normální";
            case priority.major:
                return "Vysoká";
            case priority.critical:
                return "Kritická";
        }
    }

    const statusSwitch = (st: status) => {
        switch(st) {
            case status.done:
                return "Hotovo";
            case status.in_progress:
                return "Rozpracováno";
            case status.open:
                return "Otevřeno"
        }
    }
    
    let now = new Date();

    return (
        <>
            <thead>
                <tr>
                    <th className="w-4 my-4"></th>
                    <th className="my-4 p-2 text-left">Úkol</th>
                    <th className="my-4 p-2 text-left">Termín</th>
                    <th className="my-4 p-2 text-left">Priorita</th>
                    <th className="my-4 p-2 text-left">Stav</th>
                    <th className="my-4 p-2 text-left"></th>
                </tr>
            </thead>
            <tbody>
                {props.tasks.map(task => {
                    return(
                        <tr key={task._id} className={(now > new Date(task.deadline) ? "bg-red-100 " : "") + "border-t-2 border-b-2"}>
                            <td className="w-4 my-4" style={{ backgroundColor: props.categories[task.category].color }}></td>
                            <td className="my-4 p-2">
                                <span onClick={() => props.edit(task._id)} className="block text-blue-500 hover:text-blue-700 hover:underline cursor-pointer font-bold text-xl">{task.name}</span>
                                <p>{task.description}</p>
                            </td>
                            <td className="my-4 p-2">
                                <span>{moment(new Date(task.deadline)).format("DD. MM. yyyy")}</span>
                            </td>
                            <td className="my-4 p-2">
                                <span>{prioritySwitch(task.priority)}</span>
                            </td>
                            <td className="my-4 p-2">
                                <span>{statusSwitch(task.status)}</span>
                            </td>
                            <td className="my-4 float-right">
                                <button onClick={() => props.delete(task._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 mx-4 rounded">Smazat</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </> 
    )
}

export default TaskGrid;