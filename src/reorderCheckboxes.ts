function reorderCheckboxesInList(inputText: string, moveUp: boolean) {
	const checkboxPattern = /^- \[(x| )\] .+(\n[ \t]+-.*)*$/gm;

	const allCheckboxes = inputText.match(checkboxPattern) ?? [];

	const uncheckedCheckboxes = allCheckboxes.filter((cb) =>
		cb.startsWith("- [ ]"),
	);
	const checkedCheckboxes = allCheckboxes.filter((cb) =>
		cb.startsWith("- [x]"),
	);

	let reorderedCheckboxes: string[];
	if (moveUp) {
		reorderedCheckboxes = [...uncheckedCheckboxes, ...checkedCheckboxes];
	} else {
		reorderedCheckboxes = [...checkedCheckboxes, ...uncheckedCheckboxes];
	}

	const reorderedText = inputText.replace(
		checkboxPattern,
		() => reorderedCheckboxes.shift() || "",
	);

	return reorderedText;
}

export function reorderCheckboxesInFile(inputText: string, moveUp: boolean) {
	const checkboxListPattern = /^- .+(\n[ \t]*- .*)*$/gm;
	const reorderedText = inputText.replace(checkboxListPattern, (match) =>
		reorderCheckboxesInList(match, moveUp),
	);
	return reorderedText;
}
