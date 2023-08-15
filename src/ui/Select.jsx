import styled from "styled-components";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

import React from "react";

/**
 * Renders a styled select element.
 *
 * @param {Array} options - An array of objects representing the options in the select element.
 * Each object should have a 'value' property representing the value of the option, and a 'label' property representing the text displayed for the option.
 * @param {string} value - The currently selected value in the select element.
 * @param {Object} props - Additional props to be passed to the select element.
 * @returns {JSX.Element} - The rendered select element.
 */
const Select = ({ options, value, onChange, ...props }) => {
  return (
    <StyledSelect value={value} onChange={onChange} {...props}>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
};

export default Select;
