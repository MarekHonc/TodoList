import { useEffect, useState } from "react";
import CategoryEditor from "./category.editor.component";
import { modalTypes } from "../../code/modal.open.states";
import CategoryGrid from "./category.grid.component";
import CategoryService from "../../services/category.service";
import CategoryDelete from "./category.delete.component";

/**
 * Komponeneta pro zobrazení všech kategorií.
 */
function CategoryList() {
    // Vlastní zpráva, informující o výsledku požadované operace.
    const [ message, setMessage ] = useState("");

    // Aktuální otevřený editor.
    const [ currentEditor, setCurrentEditor ] = useState(modalTypes.closed);

    // Selektor pro vybranou kategorii.
    const [ selectedCategory, setSelectedCategory ] = useState("");

    // Zobrazení zprávy z editorů.
    const [ showMessage, setShowMessage ] = useState(false);

    // Vypnutí zobrazené zprávy.
    const showEditorMessage = (message: string) => {
        setMessage(message);
        setShowMessage(true);
        setSelectedCategory("");

        setTimeout(() => setShowMessage(false), 3000);
    }

    // Získání všech kategorií.
    const [ categories, setCategories ] = useState([]);

    // Musím pomocí useEffect, aby se mi to nezacyklilo.
    useEffect(() => {
        CategoryService.getAll().then(data => setCategories(data));
    }, [currentEditor]);

    return(
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-xl px-4 py-4">
                    <h1 className="pb-4 border-b-2 text-2xl">Kategorie</h1>
                    {showMessage &&
                        <div className="border-2 rounded-md px-4 py-3 shadow-md my-3 absolute z-20 top-16 w-40 bg-white left-1/2 -ml-20" role="alert">
                            <div className="flex">
                                <div>
                                    <p className="text-md text-blue-600 font-bold w-40">{message}</p>
                                    <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setShowMessage(false)}>
                                        <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Zavřít</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                    }
                    {currentEditor === modalTypes.create &&
                        <CategoryEditor title="Nová kategorie" modalType={modalTypes.create} close={setCurrentEditor} onSuccess={(message) => showEditorMessage(message)} />
                    }
                    {currentEditor === modalTypes.update &&
                        <CategoryEditor title="Úprava kategorie" modalType={modalTypes.update} close={setCurrentEditor} onSuccess={(message) => showEditorMessage(message)} id={selectedCategory} />
                    }
                    {currentEditor === modalTypes.delete &&
                        <CategoryDelete title="Smazání kategorie" modalType={modalTypes.delete} close={setCurrentEditor} onSuccess={(message) => showEditorMessage(message)} id={selectedCategory} />
                    }
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-3" onClick={() => setCurrentEditor(modalTypes.create)}>
                        + Přidat kategorii
                    </button>
                    <table className="table-fixed w-full">
                        <CategoryGrid 
                            categories={categories}
                            edit={(id: string) => {
                                setSelectedCategory(id);
                                setCurrentEditor(modalTypes.update);
                            }} 
                            delete={(id: string) => {
                                setSelectedCategory(id);
                                setCurrentEditor(modalTypes.delete);
                            }}
                            />
                    </table>
                </div>
            </div>
        </div>
    );
}

export default CategoryList;