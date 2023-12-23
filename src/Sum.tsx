import React from "react";

interface NumberAdderProps {
  numbers: number[];
}

const NumberAdder: React.FC<NumberAdderProps> = ({ numbers }) => {
  const sum = numbers.reduce((acc, num) => acc + num, 0);

  return (
    <div>
      <p>Sum of numbers: {sum}</p>
    </div>
  );
};

export default NumberAdder;
