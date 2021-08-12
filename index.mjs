import tw from 'tailwindcss';
import postcss from 'postcss';
import * as postcss2 from 'postcss';
import { mergeExtractorSelectors, PurgeCSS } from 'purgecss';
import purgeFromHTML from 'purgecss-from-html';
import clean from 'clean-css';
import { writeFileSync } from 'fs';
const baseCss = `
@tailwind base;
@tailwind components;
@tailwind utilities;
`;

const parse = postcss2.parse
const baseHTML = `
<div class="m-0"></div>
`;
async function main({ tailwindConfig = {}, baseCss = '', baseHTML = '' }) {
  const result = await postcss(tw(tailwindConfig))
    .process(baseCss)
    .then((result) => {
      return result.css;
    });
  const _p = new PurgeCSS();

  const selectors = mergeExtractorSelectors();
  const extractors = purgeFromHTML;

  const extractedSelectors = extractors(baseHTML);
  selectors.merge(extractedSelectors);

  const root = parse(result);

  _p.walkThroughCSS(root, selectors);
  _p.removeUnusedFontFaces();
  _p.removeUnusedKeyframes();
  _p.removeUnusedCSSVariables();
  const _clean = new clean();
  return _clean.minify(root.toString()).styles;
}

// main({ baseCss, baseHTML }).then((res) => writeFileSync('result.css', res));

export default main;
