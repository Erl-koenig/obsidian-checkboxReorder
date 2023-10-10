import CheckboxReorderPlugin from './main'
import { App, PluginSettingTab, Setting } from 'obsidian'

export class CheckboxReorderPluginSettingTab extends PluginSettingTab{
	plugin: CheckboxReorderPlugin 

	constructor(app: App, plugin: CheckboxReorderPlugin) {
		super(app, plugin); 
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName("Auto Reorder")
			.setDesc("If toggled, checkboxes will be reordered when file is modified.")
			.addToggle((toggle) => 
				toggle
					.setValue(this.plugin.settings.autoReorder)
					.onChange(async (value) => {
						this.plugin.settings.autoReorder = value;
						await this.plugin.saveSettings();
					})
					)
	}
}
