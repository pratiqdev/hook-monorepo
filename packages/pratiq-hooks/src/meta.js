import fs from 'fs'
import path from 'path'

const extractDescriptionFromComment = (content = '') => {
    const regex = /\/\*\*\s*\*\s*\[[^\]]+\]\([^\)]+\)\s*\*\s*([\s\S]*?)\*\/\s*/g;

    const matches = content.match(regex);
    let description = ''

    if (matches) {
        matches.forEach((match) => {
            // Extract the description part, and remove the leading '*'
            description = match.replace(regex, '$1')
            .replace(/^\s*\*/gm, '')
            .replace(/\n+/g, ' ') // Replaces consecutive newline characters with a single space
            .replace(/_+/g, '@@') // Replaces consecutive underscore characters with nothing
            .split('@@')[0]
            .trim();
            console.log('Extracted description:', description);
            
        });
    } else {
        console.log('No descriptions found');
    }
    return description
}

const accumulateMeta = () => {
    const meta = {}
    const hookDirPath = './src/hooks/'
    const resolvedHookDirPath = path.resolve(hookDirPath)


    const hookPaths = fs.readdirSync(resolvedHookDirPath)

    hookPaths.forEach(filePath => {
        if(!filePath.includes('useClickOutside')) return;

        let hookName = filePath.replace('.tsx', '')

        let errors = []
        let doc = ''
        let description = '??'

        const fileContent = fs.readFileSync(path.resolve(hookDirPath, filePath), { encoding: 'utf8'})
        const jsdocRegex = /\/\*\*([\s\S]+?)\*\//g;
        const matches = fileContent.match(jsdocRegex);

        if (matches) {
            matches.forEach((match) => {
                if(match.includes(`[${hookName}]`)){
                    console.log('FOUND MAIN JSDOC:\n', match)
                    doc = match
                    description = extractDescriptionFromComment(match)
                }else{
                    // console.log('No main JSDoc comment found');
                    errors.push('No main JSDoc comment found')
                }
            });
        } else {
            errors.push('No JSDoc found')
            // console.log('No JSDoc comments found');
        }

        meta[filePath] = {
            title: filePath.replace('.tsx', ''),
            description,
            doc,
            content: fileContent.replace(jsdocRegex, '').replace(/\n+/g, '\n')
        }
        console.log('|| >>> ', filePath)
    })

    fs.writeFileSync('./meta.json', JSON.stringify(meta, null, 2))
}
const meta = accumulateMeta()

export default meta