import { Plugin, MarkdownView, Editor } from 'obsidian';

export default class CheckboxReorderPlugin extends Plugin {
  async onload() {
    console.log('Checkbox Reorder Plugin loaded');
    
    this.addCommand({
      id: 'reorder-checkboxes',
      name: 'Reorder Checkboxes',
      editorCallback: (editor: Editor, view: MarkdownView) => {
        this.reorderCheckboxes(editor);
      }
    });
  }

  reorderCheckboxes(editor: Editor) {
    const currentText = editor.getValue();
    
    // Regular expression to match checkboxes including nested ones
    const checkboxPattern = /^(\s*)- \[(x| )\] .+$/gm;
    
    // Extract all checkboxes from the text
    const checkboxes = Array.from(currentText.matchAll(checkboxPattern), match => ({
      indent: match[1].length, // Indentation level
      text: match[0] // Full match text
    }));
    
    // Separate checked and unchecked checkboxes
    const uncheckedCheckboxes = checkboxes.filter(cb => cb.text.includes('[ ]'));
    const checkedCheckboxes = checkboxes.filter(cb => cb.text.includes('[x]'));

    // Filter and sort checked checkboxes
    const sortedCheckboxes = this.sortCheckedCheckboxes(checkedCheckboxes);
    
    // Reconstruct the reordered text
    const reorderedText = [
      ...uncheckedCheckboxes.map(cb => cb.text),
      ...sortedCheckboxes.map(cb => cb.text)
    ].join('\n');
  
    // Replace the content in the editor
    editor.setValue(reorderedText);
  }

  sortCheckedCheckboxes(checkedCheckboxes) {
    const sortedCheckboxes = [];
    const toMove = [];

    for (const checkbox of checkedCheckboxes) {
      const indent = checkbox.indent;
      let hasIncompleteNested = false;

      for (const nextCheckbox of checkedCheckboxes) {
        if (nextCheckbox.indent <= indent) break;

        if (nextCheckbox.text.includes('[ ]')) {
          hasIncompleteNested = true;
          break;
        }
      }

      if (!hasIncompleteNested) {
        sortedCheckboxes.push(checkbox);
      } else {
        toMove.push(checkbox);
      }
    }

    return sortedCheckboxes.concat(toMove);
  }
}
