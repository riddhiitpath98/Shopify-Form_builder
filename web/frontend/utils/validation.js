const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
const contactRegex = /^[2-9]{1}[0-9]{9}$/;
const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
const fileRegex = /^.*\.(jpg|jpeg|png|pdf|docx)$/;

export const validation = (name, value, error_messages, obj) => {
  if (Array.isArray(value)) {
    if (value?.length === 0) {
      return error_messages?.["required"];
    }
  } else {
    if (!value || typeof value === 'string' && value.trim() === "") {
      return error_messages?.["required"];
    }
  }
  switch (name) {
    case "Email":
      if (!emailRegex.test(value)) {
        return error_messages?.["invalidEmail"];
      } else return "";

    case "confirm_password":
      if (value !== obj.feildValue) {
        return error_messages?.["confirmedPasswordMatch"];
      }
      else return ""

    case "Phone":
      if (!contactRegex.test(value))
        return error_messages?.['invalidPhone'];
      else return "";

    case "Url":
      if (!urlRegex.test(value))
        return error_messages?.['invalidUrl'];
      else return "";

    default:
      return "";
  }
};

export const allFieldsAreRequired = (data = []) => {
  if (!data?.length) return true;
  const cloneData = [...data];
  const validatorArray = [];
  cloneData?.forEach((value) => {
    validatorArray?.push(!value);
  });
  return validatorArray?.some((fields) => !!fields);
};
