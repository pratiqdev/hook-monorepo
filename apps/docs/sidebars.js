const fs = require('fs')
require('./runner/index.js')
const IS_DEV = require('./utils/isDev.js')
const debug = require('debug')
const log = debug('@pq:sidebar')

IS_DEV && log('>>>> DEV ENVIRONMENT')

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

let ignoredFiles = []

if (IS_DEV) {
  //! ignore during dev
  ignoredFiles = []
} else {
  //! ignore during prod
  ignoredFiles = [
    'useAnimatour',
    'bufferedToast',
    'refaze',
    'reginald'
  ]
}

const hookFiles = []
const exampleFiles = []

fs.readdirSync('./docs/hooks').forEach(_path => {
  if (_path.includes('meta') || _path.includes('index.md') || _path.includes('.js') || ignoredFiles.some(path => _path === path)) {
    log('>>> ignoring file:', _path)
    return
  };


  fs.readdirSync('./docs/hooks/' + _path).forEach(path => {
    if (path.includes('index.md')) {
      log('>> ignoring index file:', path)
      return
    }
    if (path.includes('.mdx')) {
      hookFiles.push('hooks/' + _path.replace('.mdx', '') + '/' + path.replace('.mdx', ''))
    }
  })
})

hookFiles.sort()


// ~
if (IS_DEV) {
  hookFiles.push('hooks/meta')
}

fs.readdirSync('./docs/examples').forEach(_path => {
  // if(path.includes('meta')) return;
  if (_path.includes('.js') || _path.includes('index.md') || ignoredFiles.some(path => _path === path)) {
    log('>>> ignoring file:', _path)
    return
  };


  fs.readdirSync('./docs/examples/' + _path).forEach(path => {
    if (path.includes('index.md')) {
      log('>> ignoring index file:', path)
      return
    }
    if (path.includes('.mdx')) {
      exampleFiles.push('examples/' + _path.replace('.mdx', '') + '/' + path.replace('.mdx', ''))
    }
  })
})

exampleFiles.sort()


// let utilIntro
// fs.readdirSync('./docs/utilities').forEach(file => {
//   if(file.includes('.js')|| ignoredFiles.some(path => file === path)) {
//     log('>>> ignoring file:', _path)
//     return;
//   };

//   if(file.includes('intro')){
//     utilIntro = 'utilities/' + file.replace('.mdx','')
//     return;
//   }
//   utilFiles.push('utilities/' + file.replace('.mdx', ''))
// });

// utilFiles.sort()
// utilFiles.unshift(utilIntro)

log('sidebar | sorted hook files:', hookFiles)

log(hookFiles)
// log(utilFiles)
log(exampleFiles)

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

  // But you can create a sidebar manually
  tutorialSidebar: [
    {
      type: 'doc',
      label: 'Introduction',
      id: 'intro'
    },

    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/installation',
        'getting-started/usage'
      ]
    },
    {
      type: 'category',
      label: 'Hooks',
      items: hookFiles
    },
    // {
    //   type: 'category',
    //   label: 'Utilities',
    //   items: utilFiles
    // },
    {
      type: 'category',
      label: 'Examples',
      items: exampleFiles
    },
    // {
    //   type: 'category',
    //   label: 'Examples',
    //   items: [
    //     'examples/form',
    //   ],
    // },
    {
      type: 'doc',
      label: 'Contributing',
      id: 'contributing'
    }
    // {
    //   type: 'doc',
    //   label: 'Style Guide',
    //   id: 'style-guide'
    // },
  ]
}

module.exports = sidebars
