import { Plugin, MarkdownView, Editor } from "obsidian";

export default class CheckboxReorderPlugin extends Plugin {
	async onload() {
		console.log("Checkbox Reorder Plugin loaded");

		this.addCommand({
			id: "reorder-checkboxes",
			name: "Reorder Checkboxes in List",
			editorCallback: (editor: Editor, view: MarkdownView) => {
				this.reorderCheckboxes(editor);
			},
		});
	}

	reorderCheckboxes(editor: Editor) {
		const currentText = editor.getValue();

		const checkboxPattern = /^- \[(x| )\] .+$/gm;

		const uncheckedCheckboxes =
			currentText
				.match(checkboxPattern)
				?.filter((cb) => cb.startsWith("- [ ]")) || [];
		const checkedCheckboxes =
			currentText
				.match(checkboxPattern)
				?.filter((cb) => cb.startsWith("- [x]")) || [];

		const reorderedCheckboxes = [
			...uncheckedCheckboxes,
			...checkedCheckboxes,
		];
		const reorderedText = currentText.replace(
			checkboxPattern,
			() => reorderedCheckboxes.shift() || "",
		);

		editor.setValue(reorderedText);
	}
}
