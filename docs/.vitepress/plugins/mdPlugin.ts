import path from 'path'
import fs from 'fs'

import mdContainer from 'markdown-it-container'

const docRoot = path.resolve(__dirname, '../../')

export const mdPlugin = (md) => {
  md.use(mdContainer, 'demo', {
    validate(params) {
      return !!params.trim().match(/^demo\s*(.*)$/)
    },

    render(tokens, idx) {
      if (tokens[idx].nesting === 1 /* means the tag is opening */) {
        const sourceFileToken = tokens[idx + 2]
        let source = ''
        const sourceFile = sourceFileToken.children?.[0].content ?? ''

        if (sourceFileToken.type === 'inline') {
          source = fs.readFileSync(path.resolve(docRoot, 'examples', `${sourceFile}.vue`), 'utf-8')
        }
        if (!source) throw new Error(`Incorrect source file: ${sourceFile}`)

        return `<DocsCodeDemo  source="${encodeURIComponent(
          source,
        )}" path="${sourceFile}" raw-source="${encodeURIComponent(source)}" >`
      } else {
        return '</DocsCodeDemo>'
      }
    },
  })

  md.use(mdContainer, 'note', {
    render(tokens, idx) {
      const m = tokens[idx].info.trim().match(/^note\s+(.*)$/)
      if (tokens[idx].nesting === 1) {
        const title = m && m[1] ? m[1] : 'NOTE'
        return `<div class="note"><strong>${title}</strong>\n`
      } else {
        return '</div>\n'
      }
    },
  })
}
