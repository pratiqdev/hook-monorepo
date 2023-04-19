const fs = require('fs')
const { getHookDataByTitle } = require('./getHooks.js')

const makeMetaSection = (title) => {
  const data = getHookDataByTitle(title)
  return `---
title: ${data.title}
description: ${data.description}
---
import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'
import DemoComponent from './demo_${data.title}'

import { Card, MainText, RelatedTable, HeadlessTable } from '@site/src/components'

# 

<Card>
<MainText>
<h1>${data.title}</h1>
${data.description}
</MainText>
</Card>

<!--meta-section-break-->`
}

const _dir = fs.realpathSync('.')

const ignoredNames = [
  'start',
  'build'
]

const metaReplacer = (name) => {
  if (ignoredNames.includes(name)) return
  console.log('metaReplacer:', name)
  if (!name) {
    console.log('missing name')
    return
  }
  try {
    const fileName = `${_dir}/docs/hooks/${name}/${name}.mdx`
    let fileContents = fs.readFileSync(fileName, { encoding: 'utf-8' })
    if (!fileContents.includes('<!--meta-section-break-->')) {
      console.log('No "<!--meta-section-break-->" found')
      return
    }

    fileContents = makeMetaSection(name) + fileContents.split('<!--meta-section-break-->')[1]
    fs.writeFileSync(fileName, fileContents)
    console.log(`Replaced meta in file: "${name}"`)
  } catch (err) {
    console.log(err)
  }
}

metaReplacer(...process.argv.slice(2))
