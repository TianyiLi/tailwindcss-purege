import assert from 'assert';
import { readFileSync } from 'fs';
import twinG from '../index.mjs';

const baseCss = `
@tailwind base;
@tailwind components;
@tailwind utilities;
`;

const baseHTML = `
<div class="m-0"></div>
`;

describe('base', function() {
  this.timeout(100000);
  it('minify and purge success', async () => {
    const result = await twinG({ baseCss, baseHTML });
    const testStyle = readFileSync('./result.css', 'utf8');
    assert.strictEqual(result, testStyle);
  });
});
