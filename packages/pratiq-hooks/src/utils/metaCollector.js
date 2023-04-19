const fs = require('fs')
const log = require('debug')('@pq:meta')

const PRODUCTION_MATE_PAGE_CONTENT = `
# &nbsp;

<div style={{display:'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center', height: '90vh', width: '100vw'}}>
<h4>Hooks are a great way to organize logic into reusable building blocks for applications.</h4>
<small>Have any ideas for hooks or react-centric utilities? Check out the contributing page!</small>
</div>

a link to the contrib page or something...

`


const createMeta = () => {
const hookDocFiles = fs.readdirSync('./docs/hooks')

const requiredHeadings = [
    '## Usage',
    '## Demo',
    '## API',
    '### Interfaces',
    '### Config Example',
    '### Return Values',
    // '## Hook Methods',
    '## Internal',
    '## Related Hooks',
]

const requiredComponents = [
    '<RelatedTable',
    '<DemoComponent',
]

const deprecatedHeadings = [
    '## Configuration'
]

const results = {}

const createReqComment = (req) => {
    return 'ignore' + req
        .trim()
        .toLowerCase()
        .replace(/ /g,'-')
        .replace(/#/g, '')
}

hookDocFiles.forEach((file, index) => {
    if(file === 'meta.mdx' || file.includes('intro') || file.includes('.js')) return;
    // if(index > 1) return;
    log(`Testing meta for file: "${file}"`)

    // <!-- ignore-file -->
    // <!-- ignore-file -->
    
    const fileContents = fs.readFileSync('./docs/hooks/' + file + '/' + file + '.mdx', {encoding: 'utf-8'})
    // log(fileContents)
    // log('typeof file contents:', typeof fileContents)
    
    // log('regexp results:', new RegExp(createReqComment('file'),'gi').test(fileContents))
    // log('match results:', fileContents.includes(createReqComment('file')))
    // log('match comment:', fileContents.includes('ignore-file'))
    // log('match text:', 'ignore-file' === createReqComment('file'))
    // log('exact req:', createReqComment('-file'))
    // return

    
    // check if this file should be ignored
    if(new RegExp(createReqComment('-file'),'g').test(fileContents)) {
        // log(`FILE: ${file} | Found ${createReqComment('-file')}`)
        return;
    }


    const res = results[file] = {
        pass: false,
        length: fileContents.length,
        missingHeadings: [],
        missingComponents: [],
        deprecatedHeadings: [],
        notEnoughContent: [],
    }

    
    requiredHeadings.forEach((rh, i) => {
        
        // check if this heading is ignored
        // log(`Checking file ${file} for ${createReqComment(rh)}`)
        if(new RegExp(createReqComment(rh),'g').test(fileContents)) {
            // log(`FILE: ${file} | Found ${createReqComment(rh)}`)
            return;
        }

        if(!new RegExp(rh).test(fileContents)){
            // add missing heading if not found
            res.missingHeadings.push(rh)
        }else{
            // find the character length between two headings 
            // and test for min content length
            var match1 = new RegExp(requiredHeadings[i]).exec(fileContents).index
            var match2

            let m = new RegExp(requiredHeadings[i + 1]).exec(fileContents)
            match2 = m?.index || fileContents.length

            if (match2 - match1 < 250) {
                // log("match found at " + match2);
                res.notEnoughContent.push(`${rh} (${match2 - match1})`)
            }
        }

    })

    // let numRulers = (fileContents.match(/<hr\s*\/>/g) ?? []).length
    // let numMainHeadings = (fileContents.match(/^#{2}\s*.*$/g) ?? []).length

    // if(numMainHeadings === 0 || numRulers !== numMainHeadings){
    //     res.notEnoughContent.push(`Found incorrect number of rulers (${numRulers}) vs main headings (${numMainHeadings})`)
    // }

    requiredComponents.forEach(rc => {
        if(!new RegExp(rc).test(fileContents)){
            res.missingComponents.push(rc)
        }
    })

    deprecatedHeadings.forEach(dh => {
        if(new RegExp(dh).test(fileContents)){
            res.deprecatedHeadings.push(dh)
        }
    })



    if(
        res.missingHeadings.length === 0 
        && res.missingComponents.length === 0
        && res.deprecatedHeadings.length === 0
        && res.length > 1500
    ){
        res.pass = true
    }


    
    
    
})

let contentString = 
`# File Meta 

Last Check: 
<== ${Date.now()} ==>

<b>${Date().split('GMT')[0]}</b>



`

const todoContent = fs.readFileSync('./_notes/TODO.md', {encoding: 'utf-8'})
const notesContent = fs.readFileSync('./_notes/NOTES.md', {encoding: 'utf-8'})

contentString += `${todoContent}

---

${notesContent}


## DOCS`

Object.entries(results).forEach(res => {
    if(res[1].pass) return;

    let filename = res[0]
    let content = res[1]

    contentString += 
`
---

### ${filename}

`

if(content.length < 2000){
    contentString +=
`##### Length

${content.length}


`
}


if(content.missingHeadings.length > 0){
    contentString += 
`#### Missing Headings

- ${content.missingHeadings.join('\n- ').replace(/#/g, '')}

`
}

if(content.deprecatedHeadings.length > 0){
    contentString += 
`#### Deprecated Headings

- ${content.deprecatedHeadings.join('\n- ').replace(/#/g, '')}

`
}

if(content.missingComponents.length > 0){
    contentString += 
`#### Missing Components

- ${content.missingComponents.join('\n- ').replace(/</g, '')}

`
}

if(content.notEnoughContent.length > 0){
    contentString += 
`#### Not Enough Content

- ${content.notEnoughContent.join('\n- ').replace(/#/g, '')}


`

}


})

fs.writeFileSync('./docs/hooks/meta.mdx', contentString)

// log(results)
}


const checkLastMetaTime = () => {

    let metaContent
    try{
        metaContent = fs.readFileSync('./docs/hooks/meta.mdx', {encoding: 'utf8'})
    }catch(err){}

    if(typeof metaContent !== 'string' || !metaContent.includes('<==')){
        log('No meta content found - creating meta content')
        createMeta()
        return
    }
    
    let trimmed = metaContent.split('==>')[0].split('<==')[1]
    const lastTime = parseInt(trimmed) 
    log('lastTime:', lastTime)

    const waitTime = 10_000
    const now = Date.now()

    if(now - lastTime >= waitTime){
        log('Creating new meta...')
        createMeta()
    };

}

module.exports = checkLastMetaTime