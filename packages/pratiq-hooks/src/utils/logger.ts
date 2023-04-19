import debug from 'debug'

export const log = debug('@pq')

const extend = (name: string) => {
    return log.extend(name)
}

export default extend