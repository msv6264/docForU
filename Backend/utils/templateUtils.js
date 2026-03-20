export function fillPromptTemplate(template, obj) {
  return template.replace(/{{(.*?)}}/g, (_, key) => {
    return obj[key.trim()] ?? "";
  });
}