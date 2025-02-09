// src/components/ui/Input.js

const Input = ({ type, placeholder, onChange, value, className }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      className={`w-full px-4 py-2 border rounded-md text-gray-800 ${className}`}
    />
  );
};

export { Input };
