# tailwind purge

node api with tailwindcss + purgecss

```js
import twp from 'tailwindcss-purge';

// sample
const baseCss = `
@tailwind base;
@tailwind components;
@tailwind utilities;
`;

const baseHTML = `
<div class="m-0"></div>
`;

const tailwindConfig = {}

const style = await twp({tailwindConfig, baseCss, baseHTML});
```