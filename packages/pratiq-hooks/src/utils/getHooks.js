const hookData = require('./hookData.js')

const getHookDataByTitle = (title) => {
    let data = Object.values(hookData).find((x) => x.title === title)
    let err = `No hook data found for title "${title}"`    
    return data ? data : { title: err, description: err}
}

const getHooksAlphabetized = () => Object.values(hookData).sort((a,b) => a.title > b.title ? 1 : -1)

const getAllHooksByTags = () => {
    let map = {}
    getHooksAlphabetized().forEach((hook) => {
        if(!hook.tags || !hook.tags.length){
            if(!('unknown' in map)){
                map['unknown'] = [hook]
            }else{
                map['unknown'].push(hook)
            }
        }else{
            hook.tags.forEach(tag => {
                if(!(tag in map)){
                    map[tag] = [hook]
                }else{
                    map[tag].push(hook)
                }
            })
        }
    })
    return map
}


module.exports = {
    getAllHooksByTags,
    getHookDataByTitle,
    getHooksAlphabetized
}