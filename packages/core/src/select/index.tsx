import { useState, useRef, useEffect } from "react";
import "./index.scss";

const prefix = "lcsy-select";
const ArrowDown = () => (
  <svg
    viewBox="64 64 896 896"
    focusable="false"
    data-icon="down"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
  </svg>
);

interface Option {
  label: string;
  value: string;
  disabled?: boolean;
}

interface Props {
  defaultValue: string;
  onChange: (value: string) => void;
  style?: React.CSSProperties;
  className?: string;
  options: Option[];
  disabled?: boolean;
}

const Select = (props: Props) => {
  const { defaultValue, onChange, options, style, disabled } = props;
  const [value, setValue] = useState(defaultValue);
  const [showOption, setShowOption] = useState(false);
  const contentRef = useRef(null);
  useEffect(() => {
    if (showOption && contentRef.current) {
      contentRef.current.focus();
    }
  }, [showOption]);
  const handleShow = () => {
    if (disabled) return;
    setShowOption(!showOption);
  };

  const renderCotent = () => {
    if (!showOption) {
      return <></>;
    }
    return (
      <div tabIndex={0} ref={contentRef} onBlur={()=>{setShowOption(false)}} className={`${prefix}-content`}>
        {options.map((option) => (
          <div
            key={option.label}
            className={`${prefix}-option ${option.value === value ? `${prefix}-option-selected` : ""} ${option.disabled ? `${prefix}-option-disabled` : ""}`}
            onClick={() => {
              setValue(option.value);
              onChange(option.value);
              setShowOption(false);
            }}
          >
            {option.label}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={`${prefix}`}>
      <div
        className={`${prefix}-input ${showOption ? `${prefix}-input-highlight` : ""} ${disabled ? `${prefix}-input-disabled` : ""}`}
        onClick={handleShow}
      >
        <div>{value}</div>
        <div>
          <ArrowDown />
        </div>
      </div>
      {renderCotent()}
    </div>
  );
};
export default Select;
