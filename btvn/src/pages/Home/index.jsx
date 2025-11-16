import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "@/libs/react-redux";
import React from "react";

const Counter = ({ dispatch }) => {
  console.log("🌸 Counter rendering...");
  const count = useSelector((state) => state.count);

  const handleIncrease = () => {
    dispatch({ type: "increase", payload: 1 });
  };
  return (
    <>
      <h1>Count is {count}</h1>
      <Button onClick={handleIncrease}>Count</Button>
    </>
  );
};

const Random = ({ dispatch }) => {
  console.log("🌸 Random rendering...");
  const random = useSelector((state) => state.random);
  const handleRandom = () => {
    dispatch({ type: "random" });
  };

  return (
    <>
      <h1>Random is {random}</h1>
      <Button onClick={handleRandom}>Random</Button>
    </>
  );
};

function Home() {
  console.log("🌟 Home rendering...");
  const dispatch = useDispatch();

  return (
    <div>
      <Counter dispatch={dispatch} />
      <Random dispatch={dispatch} />
    </div>
  );
}

export default Home;
