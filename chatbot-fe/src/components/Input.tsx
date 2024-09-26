import { TextField } from "@mui/material";

const Input = ({
  error,
  type,
  placeholder,
  required,
  color,
  style,
  name,
  handleChange,
  value,
}: any) => {
  return (
    <TextField
      value={value}
      error={error}
      helperText={error}
      id={name}
      type={type}
      name={name}
      placeholder={placeholder}
      autoFocus
      required={required}
      fullWidth
      color={color}
      sx={style}
      onChange={handleChange}
    />
  );
};

export default Input;
