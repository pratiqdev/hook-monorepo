const { isDev, isBrowser, checkCurrentDevEnv } = require('@pratiq/utils/dist/index.cjs')
const debug = require('debug')
const log = debug('@pq:sidebar')
const fs = require('fs')


const NON_PROD_READY_HOOKS = [
    'useExample', // dev only

    'useAnimator',
    'useCalculator',
    'useFetch', // abandoned in favor of useSWR

    'bufferedToast',
    'refaze',
    'reginald'
]


let ignoredFiles = []



const collectHookFiles = () => {

    if (checkCurrentDevEnv()) {
        //! ignore during dev
        ignoredFiles = []
        console.log('-'.repeat(80))
        console.log('DEVELOPEMENT ENVIRONMENT')
        console.log('-'.repeat(80))
    } else {
        console.log('PRODUCTION ENVIRONMENT')
        //! ignore during prod
        ignoredFiles = [
            ...NON_PROD_READY_HOOKS
        ]
    }

    const hookFiles = []
    const exampleFiles = []

    fs.readdirSync('./docs/hooks').forEach(path => {
        if (path.includes('meta') || path.includes('index.md') || path.includes('.js') || ignoredFiles.some(p => path === p)) {
            log('>>> ignoring file:', path)
            return
        };


        // fs.readdirSync('./docs/hooks/' + _dir).forEach(path => {
            if (path.includes('index.md')) {
                log('>> ignoring index file:', path)
                return
            }
            if (path.includes('.mdx')) {
                // hookFiles.push('hooks/' + path.replace('.mdx', '') + '/' + path.replace('.mdx', ''))
                hookFiles.push('hooks/' + path.replace('.mdx', ''))
            }
        // })
    })

    hookFiles.sort()


    // ~
    if (isDev) {
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

    log('sorted hook files:\n', hookFiles)
    log('sorted example files:\n', exampleFiles)


    return { hookFiles, exampleFiles }

}
module.exports = collectHookFiles