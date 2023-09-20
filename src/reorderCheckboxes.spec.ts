// basic spec file
import { reorderList } from './reorderCheckboxes';

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
    const actualOutput = reorderList(input);
    expect(actualOutput).toEqual(expectedOutput);
  });
});