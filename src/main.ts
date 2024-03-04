import {
	Plugin,
	MarkdownView,
	Editor,
	WorkspaceLeaf,
	App,
	PluginSettingTab,
	Setting,
} from "obsidian";
import { reorderCheckboxesInFile } from "src/reorderCheckboxes";

interface CheckboxReorderSettings {
	sortTop: boolean;
}

const DEFAULT_SETTINGS: CheckboxReorderSettings = {
	sortTop: true,
};

export default class CheckboxReorderPlugin extends Plugin {
	settings: CheckboxReorderSettings;

	async onload() {
		await this.loadSettings();

		console.log("Checkbox Reorder Plugin loaded");

		this.addCommand({
			id: "reorder-checkboxes",
			name: "Reorder Checkboxes in List",
			editorCallback: (editor: Editor, view: MarkdownView) => {
				this.reorderCheckboxes(editor);
			},
		});

		this.addSettingTab(new CheckboxReorderSettingsTab(this.app, this));
	}

	onunload() {
		console.log("Checkbox Reorder Plugin unloaded");
	}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData(),
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	reorderCheckboxes(editor: Editor) {
		const currentText = editor.getValue();
		const reorderedText = reorderCheckboxesInFile(
			currentText,
			this.settings.sortTop,
		);
		editor.setValue(reorderedText);
	}
}

class CheckboxReorderSettingsTab extends PluginSettingTab {
	plugin: CheckboxReorderPlugin;

	constructor(app: App, plugin: CheckboxReorderPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		let { containerEl } = this;

		containerEl.empty();

		containerEl.createEl("h2", { text: "Checkbox Reorder Settings" });

		new Setting(containerEl)
			.setName("Top / Bottom")
			.setDesc(
				"On = Top, Off = Bottom. Choose whether to sort checkboxes at the top or bottom.",
			)
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.sortTop)
					.onChange(async (value) => {
						this.plugin.settings.sortTop = value;
						await this.plugin.saveSettings();
					}),
			);
	}
}
