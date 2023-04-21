import fs from 'fs'
import {marked} from 'marked'
import TerminalRenderer from 'marked-terminal'
import chalk from 'chalk'
import matter from 'gray-matter'

marked.setOptions({
  renderer: new TerminalRenderer({
    codespan: chalk.dim.grey,
    heading: chalk.bold.underline.blue,
    firstHeading: chalk.bold.underline.blue,
    tab: 2,
  })
});

const fileContents = fs.readFileSync('SETUP.md', { encoding: 'utf-8'})
const { data, content} = matter(fileContents)

console.clear()
console.log(marked(`---`))
console.table(data)
console.log('\n')
console.log(marked(content));
