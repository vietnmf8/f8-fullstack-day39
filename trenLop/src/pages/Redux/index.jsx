import { useDispatch, useSelector } from "@/lib/react-redux";
import React from "react";

function Counter() {
    console.log('Counter rendering...');
    const count = useSelector((state) => state.count);
    return <h1>Count is {count}</h1>;
}

function Random() {
     console.log('Random rendering...');
    const random = useSelector((state) => state.random);
    return <h1>Random is {random}</h1>;
}

function Redux() {
    const dispatch = useDispatch();
    return (
        <div>
            <Counter />
            <Random />
            <button onClick={() => dispatch({ type: "increase" })}>
                Increase
            </button>

            <button onClick={() => dispatch({ type: "random" })}>Random</button>
        </div>
    );
}

export default Redux;
