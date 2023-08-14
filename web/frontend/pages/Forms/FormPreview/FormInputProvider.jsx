import { TextField, TextStyle } from "@shopify/polaris";

export const FormInputProvider = ({
  id,
  inputId,
  title,
  attributes,
  ...props
}) => {
  const { label, placeholder, description, limit_chars, required } =
    attributes || {};
  switch (id) {
    case "text":
      return (
        <>
          <TextField
            type="text"
            label={label}
            placeholder={placeholder}
            {...props}
          />
          <TextStyle variation="subdued">{description}</TextStyle>
        </>
      );
    case "email":
      return (
        <>
          <TextField
            type="email"
            label={label}
            placeholder={placeholder}
            {...props}
          />
          <TextStyle variation="subdued">{description}</TextStyle>
        </>
      );
    default:
      return null;
  }
};
