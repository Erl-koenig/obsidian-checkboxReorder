
function reorderCheckboxesInList(inputText: string) {
  const checkboxPattern = /^- \[(x| )\] .+(\n[ \t]+-.*)*$/gm;

  const allCheckboxes = inputText.match(checkboxPattern) ?? [];

  const uncheckedCheckboxes =
    allCheckboxes
      .filter((cb) => cb.startsWith("- [ ]"));
  const checkedCheckboxes =
    allCheckboxes
      .filter((cb) => cb.startsWith("- [x]"));

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

export function reorderCheckboxesInFile(inputText: string) {
  const checkboxListPattern = /^- .+(\n[ \t]*- .*)*$/gm;
  const reorderedText = inputText.replace(
    checkboxListPattern,
    reorderCheckboxesInList
  );
  return reorderedText;
}