import React, { useState } from 'react';
import InputTextMulti from '../Common/InputTextMulti/InputTextMulti';

const TestComponent = () => {
  const [values, setValues] = useState([]);
  console.log(values)
  return (
    <div>
      {/* Render the InputTextMulti for user-defined values */}
      <InputTextMulti
        values={values}
        setValues={setValues}
      />
    </div>
  );
};

export default TestComponent;
