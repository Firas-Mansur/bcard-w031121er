import React, { useState } from "react";
import ButtonComp from "./ButtonComp";

const UseCallback = () => {
  const [age, setAge] = useState(1);
  const [height, setHeight] = useState(0);

  const incrementAge = () => setAge(prev => prev + 1);
  const incrementHeight = () => setHeight(prev => prev + 1);

  return (
    <>
      <p>age: {age}</p>
      <p>height: {height}</p>

      <ButtonComp onClick={incrementAge}>age</ButtonComp>
      <ButtonComp onClick={incrementHeight}>height</ButtonComp>
    </>
  );
};

export default UseCallback;
