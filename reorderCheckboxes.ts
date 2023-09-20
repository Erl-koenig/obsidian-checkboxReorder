
export function reorderList(inputText: string) {
  const checkboxPattern = /^- \[(x| )\] .+$/gm;

  const uncheckedCheckboxes =
    inputText
      .match(checkboxPattern)
      ?.filter((cb) => cb.startsWith("- [ ]")) || [];
  const checkedCheckboxes =
    inputText
      .match(checkboxPattern)
      ?.filter((cb) => cb.startsWith("- [x]")) || [];

  const reorderedCheckboxes = [
    ...uncheckedCheckboxes,
    ...checkedCheckboxes,
  ];
  const reorderedText = inputText.replace(
    checkboxPattern,
    () => reorderedCheckboxes.shift() || "",
  );

  return reorderedText;
}