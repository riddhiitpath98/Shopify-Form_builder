export const concat = (...fields) => fields.filter(Boolean).join('');

export const formatter = (array = []) => {
    let object = {}
    array.forEach((data) => {
      Object.assign(object, data)
    })
    return object
  }
  
  export const reverseFormate = (obj = {}) => {
    let array = []
    Object.keys(obj).forEach((val, index) => {
      array.push({[val]: obj[val]})
    })
    return array
  }

  export const handleAppereance = (data = []) => {
    if (!data?.length) return {};
    const obj = {};
    const cloneData = [...data];
    cloneData.forEach((val) => {
      obj[val?.name] = val.value;
    });
    return obj;
  };