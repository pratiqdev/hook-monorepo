import hookData from './hookData.js'

export const getHookDataByTitle = (title) => {
  const data = Object.values(hookData).find((x) => x.title === title)
  const err = `No hook data found for title "${title}"`
  return data || { title: err, description: err }
}

export const getHooksAlphabetized = () => Object.values(hookData).sort((a, b) => a.title > b.title ? 1 : -1)

export const getAllHooksByTags = () => {
  const map = {}
  getHooksAlphabetized().forEach((hook) => {
    if (!hook.tags || !hook.tags.length) {
      if (!('unknown' in map)) {
        map.unknown = [ hook ]
      } else {
        map.unknown.push(hook)
      }
    } else {
      hook.tags.forEach(tag => {
        if (!(tag in map)) {
          map[tag] = [ hook ]
        } else {
          map[tag].push(hook)
        }
      })
    }
  })
  return map
}
