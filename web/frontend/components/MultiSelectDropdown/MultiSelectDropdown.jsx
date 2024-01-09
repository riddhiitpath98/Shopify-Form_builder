import React from "react";
import Select from "react-select";
import "./MultiSelectDropdown.css"

const MultiSelectDropdown = ({
  options,
  selectedOptions,
  handleOptionSelect,
  title,
}) => {
  const customStyles = {
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
      padding: "0.3rem"
    }),
  };
  return (
    <>
      <label htmlFor="multi-select">{title}</label>
      <Select
        id="multi-select"
        name="multi-select"
        value={selectedOptions}
        onChange={handleOptionSelect}
        options={options}
        styles={customStyles}
        isMulti
        closeMenuOnSelect={false}
        components={{
          Option: OptionComponent,
          MultiValueRemove: RemoveComponent,
        }}
      />
    </>
  );
};

const OptionComponent = (props) => 
  (
  <div >
    {/* {console.log('first', props)} */}
    <input
      id={props?.innerProps?.id} // Unique ID for each checkbox
      name="file_options"
      type="checkbox"
      checked={props.isSelected}
      onChange={() => props.selectOption(props.data)}
      style={{ marginRight: "5px" }}
    />
    <label htmlFor={props?.innerProps?.id}>{props.label}</label>
  </div>
);

const RemoveComponent = (props) => (
  <button
    {...props.innerProps}
    onClick={(e) => {
      props.innerProps.onClick(e);
      e.stopPropagation();
    }}
  >
    &times;
  </button>
);

export default React.memo(MultiSelectDropdown);
