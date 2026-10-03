import { resolve } from 'path'
import pkg from 'shelljs'
import { cwd } from './build-common.js'

const { cp, mkdir } = pkg

const f1 = resolve(
  cwd,
  'src/client/statics/*'
)
const from0 = resolve(
  cwd,
  'node_modules/electerm-icons/icons'
)
const from1 = resolve(
  cwd,
  'src/app/views'
)

const t1 = resolve(
  cwd,
  'dist/assets/'
)
const to1 = resolve(
  cwd,
  'dist'
)
const to2 = resolve(
  cwd,
  'dist/assets/icons'
)
const arr = [
  {
    from: f1,
    to: t1
  },
  {
    from: from1,
    to: to1
  },
  {
    from: from0,
    to: to2
  }
]

for (const obj of arr) {
  const {
    file, from, to
  } = obj
  if (file) {
    cp(from, to)
  } else {
    cp('-r', from, to)
  }
}

// branding overlay: files from /branding override defaults
import { existsSync } from 'fs'
const brandImgs = resolve(cwd, 'branding/images')
if (existsSync(brandImgs)) {
  mkdir('-p', resolve(cwd, 'dist/assets/images'))
  cp('-r', brandImgs + '/*', resolve(cwd, 'dist/assets/images/'))
}
const brandFav = resolve(cwd, 'branding/favicon.ico')
if (existsSync(brandFav)) {
  cp(brandFav, resolve(cwd, 'dist/assets/'))
}
