// ---------- INPUT Component ----------

const Input = ({ type, placeholder, name, state, setState }) => {
  // Handle changes on inputs
  const handleChange = (event) => {
    setState(event.target.value);
  };

  return (
    <input
      value={state}
      type={type}
      placeholder={placeholder}
      name={name}
      onChange={() => {
        handleChange(event);
      }}
    />
  );
};

// Export component
export default Input;
