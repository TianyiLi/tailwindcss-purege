import twAot from 'tailwindcss'
import twJit from 'tailwindcss/lib/jit/processTailwindFeatures.js'
import postcss from 'postcss'
import cssnano from 'cssnano'
import resolveConfig from 'tailwindcss/resolveConfig.js'

async function main({ tailwindConfig = {}, baseCss = '', baseHTML = '' }) {
  const resolvedConfig = resolveConfig(tailwindConfig)

  resolvedConfig.mode = 'jit'

  const tw =
    resolvedConfig.mode === 'jit'
      ? () => ({
          postcssPlugin: 'tailwindcss',
          Once(root, { result }) {
            twJit.default(({ createContext }) => {
              return () =>
                createContext(resolvedConfig, [
                  { content: baseHTML, extension: '.html' },
                ])
            })(root, result)
          },
        })
      : () => ({
          postcssPlugin: 'tailwindcss',
          plugins: [twAot(() => resolvedConfig)],
        })

  tw.postcss = true
  const plugins = [tw, cssnano({ preset: 'default' })]
  const result = await postcss(plugins)
    .process(baseCss, { from: undefined })
    .then((result) => {
      return result.css
    })
  return result
}

export default main
