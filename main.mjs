import tw from 'tailwindcss';
import postcss, { parse } from 'postcss';
import { writeFileSync } from 'fs';
import { mergeExtractorSelectors, PurgeCSS } from 'purgecss';
import purgeFromHTML from 'purgecss-from-html';
import clean from 'clean-css'
const baseCss = `
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
`;

const baseHTML = `
  <div class="m-0"></div>
`;
async function main() {
  const result = await postcss(tw({}))
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
  const _clean = new clean()
  writeFileSync('result.css', _clean.minify(root.toString()).styles);
  // const source = await _p.getPurgedCSS(
  //   [
  //     {
  //       raw: result,
  //       name: 'test',
  //     },
  //   ],
  //   selectors
  // );
  // writeFileSync('result.css', source[0].css);
}

main();
