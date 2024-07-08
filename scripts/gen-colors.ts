import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { gold, green, purple, red } from '@ant-design/colors'

let colors = ''
purple.forEach((color, index) => {
  colors += `  --item-color-primary-${index + 1}: ${color};\n`
})


green.forEach((color, index) => {
  colors += `  --item-color-success-${index + 1}: ${color};\n`
})

gold.forEach((color, index) => {
  colors += `  --item-color-warning-${index + 1}: ${color};\n`
})

red.forEach((color, index) => {
  colors += `  --item-color-error-${index + 1}: ${color};\n`
})

const filePath = fileURLToPath(new URL('../packages/item-ui/src/style/themes/colors.less', import.meta.url))

colors = `:root{\n${colors}\n}`

writeFileSync(filePath, colors)
