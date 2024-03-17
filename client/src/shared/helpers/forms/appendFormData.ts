export const appendFormData = (data: any, parentKey = "") => {
  const form = new FormData();

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key];

      const newKey = parentKey ? `${parentKey}.${key}` : key;

      // if (Array.isArray(value) && !(value instanceof File)) {
      //   for (let i = 0; i < value.length; i++) {
      //     form.append(newKey, value[i]);
      //   }
      // } else
      if (value instanceof Object && !(value instanceof File)) {
        // Рекурсивно добавляем вложенные объекты
        appendFormData(value, newKey);
      } else {
        // Добавляем поле в FormData
        form.append(newKey, value);
      }
    }
  }

  return form;
};
