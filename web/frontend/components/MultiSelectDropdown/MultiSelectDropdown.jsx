import React from "react";
import Select from "react-select";

const MultiSelectDropdown = ({
  options,
  selectedOptions,
  handleOptionSelect,
  title,
}) => {
  return (
    <>
      <label htmlFor="multi-select">{title}</label>
      <Select
        id="multi-select"
        name="multi-select"
        value={selectedOptions}
        onChange={handleOptionSelect}
        options={options}
        styles={{ menu: (provided) => ({ ...provided, zIndex: 9999 }) }}
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

const OptionComponent = (props) => (
  <div>
    <input
      id="file_options"
      name="file_options"
      type="checkbox"
      checked={props.isSelected}
      onChange={() => props.selectOption(props.data)}
      style={{ marginRight: "5px" }}
    />
    <label htmlFor="file_options">{props.label}</label>
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

export default MultiSelectDropdown;
