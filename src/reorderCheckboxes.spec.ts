import { describe, expect, it } from "vitest";
import { reorderCheckboxesInFile } from './reorderCheckboxes';

describe('reorderCheckboxes', () => {
  it('should reorder checkboxes', () => {
    const input = `
- [ ] first
- [x] second
- [ ] third
`;
    const expectedOutput = `
- [ ] first
- [ ] third
- [x] second
`;
    const actualOutput = reorderCheckboxesInFile(input);
    expect(actualOutput).toEqual(expectedOutput);
  });

  it('should reorder checkboxes in several Lists', () => {
    const input = `
- [ ] first
- [x] second
- [ ] third

- [ ] first
- [x] second
- [ ] third
`;
    const expectedOutput = `
- [ ] first
- [ ] third
- [x] second

- [ ] first
- [ ] third
- [x] second
`;
    const actualOutput = reorderCheckboxesInFile(input);
    expect(actualOutput).toEqual(expectedOutput);
  });

  it('should move child lists with their parents', () => {
    const input = `
- [ ] first
- [x] second
- [ ] third
  - [ ] first child of third
  - [ ] second child of third
`;
    const expectedOutput = `
- [ ] first
- [ ] third
  - [ ] first child of third
  - [ ] second child of third
- [x] second
`;
    const actualOutput = reorderCheckboxesInFile(input);
    expect(actualOutput).toEqual(expectedOutput);
  });

  it('should move indented descriptions with child tasks', () => {
    const input = `
- [x] task1
- [/] parent
  - [ ] children1
    description of child1
  - [ ] children2
- [ ] task2
`;
    const expectedOutput = `
- [ ] task2
- [/] parent
  - [ ] children1
    description of child1
  - [ ] children2
- [x] task1
`;
    const actualOutput = reorderCheckboxesInFile(input);
    expect(actualOutput).toEqual(expectedOutput);
  });

  it('should move indented descriptions with child tasks when sorting completed tasks first', () => {
    const input = `
- [ ] task1
- [/] parent
  - [ ] children1
    description of child1
  - [ ] children2
- [x] task2
`;
    const expectedOutput = `
- [x] task2
- [/] parent
  - [ ] children1
    description of child1
  - [ ] children2
- [ ] task1
`;
    const actualOutput = reorderCheckboxesInFile(input, false);
    expect(actualOutput).toEqual(expectedOutput);
  });

});
