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



function extractNamespace(content = '') {
    const namespacePattern = /export namespace\s+(\w+)\s+{/;
    let match = namespacePattern.exec(content);
    if (!match) return { namespaceTitle: '<NO_NAMESPACE>', namespaceContent: '<NO_TYPES>' };
    
    const title = match[1];
    let startIndex = match.index;
    let endIndex = startIndex;
    let braceCount = 1; // We have already found the opening brace

    // Iterate through the content starting from the opening brace
    for (let i = startIndex + match[0].length; i < content.length; i++) {
        if (content[i] === '{') braceCount++;
        if (content[i] === '}') braceCount--;

        if (braceCount === 0) {
            endIndex = i;
            break;
        }
    }

    // Extract the namespace content using the start and end indices
    let namespaceContent = content.slice(startIndex, endIndex + 1);
    namespaceContent = namespaceContent
        .replace(/\n \* /g, '\n')
        .replace(/\n \*/g, '\n')
        .trim()

    return { namespaceTitle: title, namespaceContent: namespaceContent };
}

const extractExample = (content = '') => {
    let fullExample = content.split('* @example\n * ')[1] ?? '<NO_EXAMPLE>'
    // content.includes('useClamp') && console.log('fullExample:', fullExample)
    let trimmedExample = fullExample.split('*/')[0] ?? fullExample.split(' * @')[0] ?? '<BAD_EXAMPLE_DELIMITER>'
    // content.includes('useClamp') && console.log('trimmedExample:', trimmedExample)
    let uncommented = trimmedExample.replace(/\n \* /g, '\n').trim()
    return uncommented
}

// const extractParams = (content = '') => {
//     let fullExample = content.split('* @param\n * ')[1] ?? '<NO_PARAMS>'
//     // content.includes('useClamp') && console.log('fullExample:', fullExample)
//     let trimmedExample = fullExample.split('*/')[0] ?? fullExample.split(' * @')[0] ?? '<BAD_EXAMPLE_DELIMITER>'
//     // content.includes('useClamp') && console.log('trimmedExample:', trimmedExample)
//     let uncommented = trimmedExample.replace(/\n \* /g, '\n').trim()
//     return uncommented
// }

const extractReturns = (content = '') => {
    let fullExample = content.split('* @returns')[1] || '<NO_RETURNS>';
    let trimmedExample = fullExample.split('*/')[0]?.trim()
        || fullExample.split('* @')[0]?.trim()
        || fullExample.split('* ___')[0]?.trim()
        || '<BAD_RETURN_DELIMITER>';

    const lines = trimmedExample.split('\n').map(line => line.trim()).slice(2);

    // Using regex to match the table structure
    const regex = /\|\s*`?([^`|]*)`?\s*\|\s*\**?(\[?[^\]*]*\]?)\**?\s*\|\s*([^|]*)\s*\|/;

    // Array to hold the parsed items
    const parsedItems = [];
    let maxCodeDepth = 2;

    const handleNestedKeys = (keyParts, startIndex, resultArray) => {
        if (startIndex >= keyParts.length) return;

        resultArray.push('@' + keyParts[startIndex]);

        handleNestedKeys(keyParts, startIndex + 1, resultArray.concat(''));
    };

    lines.forEach(line => {
        const match = line.match(regex);
        if (match) {
            const [, key, type, description] = match;
            const keyParts = key.trim().replace(/\[|\]|\*/g, '').split('.');
            const result = [];

            if (keyParts.length === 1) {
                result.push('@' + keyParts[0]);
            } else {
                result.push('');
                handleNestedKeys(keyParts, 1, result);
            }

            let currentDepth = result.length / 2; // each key has 2 cells
            if (currentDepth > maxCodeDepth) {
                maxCodeDepth = currentDepth;
            }

            let cleanType = type.trim().replace(/`/g, '');
            result.push(cleanType, description.trim());

            parsedItems.push(result);
        } else {
            // console.log(`No match for line: ${line}`);
        }
    });

    return {
        items: parsedItems,
        code: maxCodeDepth
    };
};

// const extractReturns = (content = '') => {
//     let fullExample = content.split('* @returns')[1] || '<NO_RETURNS>';
//     let trimmedExample = fullExample.split('*/')[0]?.trim() 
//         || fullExample.split('* @')[0]?.trim()
//         || fullExample.split('* ___')[0]?.trim() 
//         || '<BAD_RETURN_DELIMITER>';

//     const lines = trimmedExample.split('\n').map(line => line.trim()).slice(2); // slicing to skip the first two lines

//     // Using regex to match the table structure
//     const regex = /\|\s*`?([^`|]*)`?\s*\|\s*\**?(\[?[^\]*]*\]?)\**?\s*\|\s*([^|]*)\s*\|/;

//     // Array to hold the parsed items
//     const parsedItems = [];
//     let maxCodeDepth = 2

 
   
//     lines.forEach(line => {
//         const match = line.match(regex);
//         if (match) {
//             const [, key, type, description] = match;
//             const keyParts = key.trim().replace(/\[|\]|\*/g, '').split('.').map(k => '@' + k);
//             const result = [];

//             if (keyParts.length === 1) {
//                 // Add the key as-is if it's not a nested key
//                 result.push(keyParts[0]);
//                 result.push('');
//             } else {
//                 // Add an empty cell under '@clamp' if it's a nested key
//                 result.push('');
//                 result.push(...keyParts.slice(1));
//                 if(keyParts.length > maxCodeDepth){
//                     maxCodeDepth = keyParts.length + 1
//                 }
//             }

//             let cleanType = type.trim().replace(/`/g, '')
//             // Add the type and description
//             result.push(cleanType, description.trim());

//             parsedItems.push(result);
//         } else {
//             console.log(`No match for line: ${line}`);
//         }
//     });



//     // parsedItems.pop()
//     console.log('parsedItems:\n', parsedItems, maxCodeDepth)


    

//     return {
//         items: parsedItems,
//         code: maxCodeDepth
//     };
// };




const extractParams = (content = '') => {
    let fullExample = content.split('* @param')[1] || '<NO_PARAM>';

    const endPattern = /\s*\*\s*(@param|@returns|@interface|@example|\_{3,})\s*/;

    const match = fullExample.match(endPattern);
    let text = ''

    if (match) {
        text = fullExample.substring(0, match.index);
    }

    let trimmedExample = text?.trim()
        || '<BAD_PARAM_DELIMITER>';

    const lines = trimmedExample.split('\n').map(line => line.trim()).slice(2); // slicing to skip the first two lines

    // Using regex to match the table structure
    const regex = /\|\s*`?([^`|]*)`?\s*\|\s*\**?(\[?[^\]*]*\]?)\**?\s*\|\s*([^|]*)\s*\|/;

    // Array to hold the parsed items
    const parsedItems = [];
    let maxCodeDepth = 2

    lines.forEach(line => {
        const match = line.match(regex);
        if (match) {
            const [, key, type, description] = match;
            const optionalFlag = key.includes(']') ? '?' : '' 
            // const keyParts = key.trim().split('.').map(part => {
            //     if (part.startsWith('[') && part.endsWith(']')) {
            //         return '@' + part; // Keep brackets as-is
            //     }
            //     return '@' + part.trim();
            // });
            const keyParts = key.trim()
                .replace(/\[|\]|\*/g, '')
                .split('.')
                .map(k => '@' + k);


            const result = [];

            if (keyParts.length === 1) {
                // Add the key as-is if it's not a nested key
                result.push(keyParts[0]);
                // result.push('');
            } else {
                // Add an empty cell under '@clamp' if it's a nested key
                result.push('');
                result.push(...keyParts.slice(1));
                if (keyParts.length > maxCodeDepth) {
                    maxCodeDepth = keyParts.length + 1
                }
            }

            // Add the type and description
            let fullType = type.trim().replace(/`/g,'') + optionalFlag
            result.push(fullType);
            result.push(description.trim());

            parsedItems.push(result);
        } else {
            // console.log(`No match for line: ${line}`);
        }
    });



    // parsedItems.pop()
    content.includes('[useClamp]') && console.log('parsedItems:\n', parsedItems, maxCodeDepth)

    return {
        items: parsedItems,
        code: maxCodeDepth
    };
};







const accumulateMeta = () => {
    try{
    console.log('Accumulating metadata for "@pratiq/utils"')
    const meta = {}
    const hookDirPath = './src/'


    const hookPaths = [
        ...fs.readdirSync(path.resolve(hookDirPath)),
    ]

    hookPaths.forEach(filePath => {
        // if(!filePath.includes('useClickOutside')) return;

        let hookName = filePath.replace(/\.[^/.]+$/, '');

        let errors = []
        let jsdoc = '<NO_JSDOC>'
        let description = '<NO_DESCRIPTION>'

        const fileContent = fs.readFileSync(path.resolve(hookDirPath, filePath), { encoding: 'utf8'})
        const jsdocRegex = /\/\*\*([\s\S]+?)\*\//g;
        const matches = fileContent.match(jsdocRegex);

        if (matches) {
            matches.forEach((match) => {
                if(match.includes(`[${hookName}]`)){
                    // console.log('FOUND MAIN JSDOC:\n', match)
                    jsdoc = match
                    description = extractDescriptionFromComment(match)
                }else{
                    // console.log('No main JSDoc comment found');
                    // errors.push('No main JSDoc comment found')
                }
            });
        } else {
            errors.push('No JSDoc found')
            // console.log('No JSDoc comments found');
        }

        let { namespaceContent, namespaceTitle } = extractNamespace(fileContent)
        let example = extractExample(fileContent)
        let params = extractParams(fileContent)
        let returns = extractReturns(fileContent)



        meta[hookName] = {
            description,
            jsdoc,
            namespaceTitle,
            namespaceContent,
            example,
            params,
            returns
        }
        // console.log('|| >>> ', filePath)
    })



    fs.writeFileSync('./meta.json', JSON.stringify(meta, null, 2))
}catch(err){
    console.error('ERROR ACCUMULATING METADATA FOR "@pratiq/utils":', err)
}
}
const meta = accumulateMeta()

export default meta