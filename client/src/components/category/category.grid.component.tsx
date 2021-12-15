import { ExtendedCategory } from "../../services/category.service";

/**
 * Rozhraní pro předané vlastnosti gridu.
 */
interface GridProps {
    categories: ExtendedCategory[],
    edit: (id: string) => void,
    delete: (id: string) => void
}

/**
 * Grid se všemi uloženými kategoriemi.
 */
function CategoryGrid(props: GridProps) {
    return (
        <tbody>
            {props.categories.map(category => {
                return(
                    <tr key={category._id} className="border-t-2 border-b-2">
                        <td className="w-4 my-4" style={{ backgroundColor: category.color }}></td>
                        <td className="my-4 p-2">
                            <span onClick={() => props.edit(category._id)} className="block text-blue-500 hover:text-blue-700 hover:underline cursor-pointer font-bold text-xl">{category.name}</span>
                            <p>{category.description}</p>
                        </td>
                        <td className="my-4 float-right">
                            <button onClick={() => props.delete(category._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded">Smazat</button>
                        </td>
                    </tr>
                )
            })}
        </tbody>
    )
}

export default CategoryGrid;