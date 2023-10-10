import { Plugin, MarkdownView, Editor } from "obsidian";
import {CheckboxReorderPluginSettingTab} from './settings'
import { reorderCheckboxesInFile } from "src/reorderCheckboxes";

interface CheckboxReorderPluginSettings {
	autoReorder: boolean;
}

const DEFAULT_SETTINGS: Partial<CheckboxReorderPluginSettings> = {
	autoReorder: false
}

export default class CheckboxReorderPlugin extends Plugin {
	settings: CheckboxReorderPluginSettings;

	async onload() {
		await this.loadSettings();

		console.log("Checkbox Reorder Plugin loaded");
		

		this.addSettingTab(new CheckboxReorderPluginSettingTab(this.app, this))

		this.registerEvent(this.app.vault.on("modify", () => {
			if(this.settings.autoReorder){
				const view = this.app.workspace.getActiveViewOfType(MarkdownView);
				view?.editor && this.reorderCheckboxes(view?.editor);
			}
		}))

		this.addCommand({
			id: "reorder-checkboxes",
			name: "Reorder Checkboxes in List",
			editorCallback: (editor: Editor, view: MarkdownView) => {
				this.reorderCheckboxes(editor);
			},
		});
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	reorderCheckboxes(editor: Editor) {
		const currentText = editor.getValue();
		const reorderedText = reorderCheckboxesInFile(currentText);
		editor.setValue(reorderedText);
	}
}
