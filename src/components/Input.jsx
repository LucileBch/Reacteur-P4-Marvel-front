// ---------- INPUT Component ----------
const Input = ({ type, placeholder, name, state, setState }) => {
  // For css className
  const logInput = name !== "search" && "input__log";

  // Handle changes on inputs
  const handleChange = (event) => {
    setState(event.target.value);
  };

  return (
    <input
      className={`input ${logInput}`}
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
