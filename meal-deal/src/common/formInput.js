import React from "react";

function FormInput(props) {
  const { type, value, name, onChange } = props;
  return (
    <div>
      <input
        name={name}
        type={type}
        value={value}

        className="form-control mb-2"
        placeholder={name}
        onChange={onChange}
      />
    </div>
  );
}

export default FormInput;