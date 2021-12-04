import { useState } from "react";

function TextComponent(){
    const [ count, setCount ] = useState(0);

    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <div className="px-4 lg:pb-12">
                <h1>Text: {count}</h1>
                <button onClick={() => setCount(count+1)}>Increase</button>
            </div>
        </div>
    )
}

export default TextComponent;