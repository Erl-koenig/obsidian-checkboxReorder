import { Plugin, MarkdownView, Editor } from "obsidian";
import { reorderCheckboxesInFile } from "src/reorderCheckboxes";

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
		const reorderedText = reorderCheckboxesInFile(currentText);
		editor.setValue(reorderedText);
	}
}
