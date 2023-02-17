import React from "react";

function FormInput(props) {
  const { type, value, name, onChange } = props;
  return (
    <div className="form-group">
      <input
        name={name}
        type={type}
        value={value}
<<<<<<< HEAD
        className="form-control mb-2"
=======
        className="form-control mb-0 ml-3 mr-3"
>>>>>>> main
        placeholder={name}
        onChange={onChange}
      />
    </div>
  );
}

export default FormInput;
