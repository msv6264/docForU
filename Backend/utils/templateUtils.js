export function fillPromptTemplate(template, obj) {
  return String(template).replace(/{{(.*?)}}/g, (_, key) => {
    return obj[key.trim()] ?? "";
  });
}