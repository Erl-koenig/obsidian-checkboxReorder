// basic spec file
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

});
