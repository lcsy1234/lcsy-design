import { useState } from "react";
interface Option {
  label: string;
  value: string;
}
interface Props {
  defaultValue: string;
  onChange: (value: string) => void;
  style?: React.CSSProperties;
  className?: string;
  options: Option[];
  disabled?: boolean;
}
const prefix = 'lcsy-design-select';
const Select = (props) => {
  const { defaultValue, onChange, options,style,disabled } = props;
  const [value, setValue] = useState(defaultValue);
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };
  //为什么option中的onClick不生效
//   return (
//     <div className={`${prefix}-container`}>
//         <div className={`${prefix}`}></div>
//         <div  className={`${prefix}-down`}></div>
//     </div>
//   )
  return (
    <div>
      <select value={value} onChange={handleChange} style={style} disabled={disabled}>
        {options.map((option) => (
          <option key={option.label} value={option.value}>
            {option.value}
          </option>
        ))}
      </select>
    </div>
  );
};
export default Select;
