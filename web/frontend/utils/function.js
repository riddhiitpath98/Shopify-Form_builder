import { SUBSCRIPTION_TYPES } from "../constant";

export const concat = (...fields) => fields.filter(Boolean).join("");

export const formatter = (array = []) => {
  let object = {};
  array.forEach((data) => {
    Object.assign(object, data);
  });
  return object;
};

export const reverseFormate = (obj = {}) => {
  let array = [];
  Object.keys(obj).forEach((val, index) => {
    array.push({ [val]: obj[val] });
  });
  return array;
};

export const handleAppereance = (data = []) => {
  if (!data?.length) return {};
  const obj = {};
  const cloneData = [...data];
  cloneData.forEach((val) => {
    obj[val?.name] = val.value;
  });
  return obj;
};

export const getRestrictionWithPlan = (subscription = null) => {
  if (!subscription) return false;
  return subscription?.name === SUBSCRIPTION_TYPES.PREMIUM;
};

export const capitalizeFirstLetterAndAPI = (sentence) => {
  const words = sentence.split(/\b/);

  for (let i = 0; i < words.length; i++) {
    const word = words[i].toLowerCase();

    if (i === 0) {
      words[i] = word.charAt(0).toUpperCase() + word.slice(1);
    } else if (word === "api" || word === "apis") {
      words[i] = "APIs";
    } else if (word === "html") {
      words[i] = "HTML";
    } else if (word === "csv") {
      words[i] = "CSV";
    } else if (word === "pdf") {
      words[i] = "PDF";
    } else if (word === "excel") {
      words[i] = "EXCEL";
    } else if (word === "url") {
      words[i] = "URL";
    }
  }

  return words.join("");
};

export const capitalizeFirstLetter = (str) => {
  return str
    .split(/[\s_]+/)
    .map((word, index) => {
      const lowercasedWord = word.toLowerCase();

      if (lowercasedWord === "of") {
        return lowercasedWord;
      } else if (lowercasedWord === "api") {
        return "API";
      } else if (lowercasedWord === "html") {
        return "HTML";
      } else if (lowercasedWord === "url") {
        return "URL";
      } else {
        return index === 0
          ? lowercasedWord.charAt(0).toUpperCase() + lowercasedWord.slice(1)
          : word.charAt(0).toUpperCase() + lowercasedWord.slice(1);
      }
    })
    .join(" ");
};
