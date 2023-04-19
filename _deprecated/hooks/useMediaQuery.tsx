import {useState, useEffect} from 'react'
//@ts-ignore
import extend from '../utils/logger'
const log = extend('local_useMediaQuery')

type T_StringMap = { [key:string]: string }
type T_BooleanMap = { [key:string]: boolean }
type T_UseMediaQueryList = string | string[] | T_StringMap
type T_UseMediaQuerySelector = string | number | any[]

type T_UseMediaQuery = (mediaQueries: T_UseMediaQueryList) => boolean | T_UseMediaQueryGetter

type T_UseMediaQueryGetter = (selector?: T_UseMediaQuerySelector) => boolean | T_BooleanMap



const useMediaQuery:T_UseMediaQuery = (mediaQueries: T_UseMediaQueryList) => {
    const [matchObj, setMatchObj] = useState<T_BooleanMap>({})

    const itemAtIndex: (selector?: T_UseMediaQuerySelector) => boolean | T_BooleanMap = (selector?: T_UseMediaQuerySelector) => {
        const getLastValidItem: (n:number) => boolean = (n:number) => {
            if(typeof selector !== 'object' || !Array.isArray(selector)) return false;
            if(selector.every(str => str === null)) return false;

            if(n > selector.length - 1){
                n = selector.length - 1
            }

            if(selector[n] === null){
                if(n > 0){
                    return getLastValidItem(n - 1)
                }
            }else{
                return selector[n]
            }
        }

        if(typeof selector === 'undefined'){
            return matchObj
        }
        
        else if(typeof selector === 'object' && Array.isArray(selector) && selector.length){
            // console.log('args is an array:', selector)
            let num:number = 0
            Object.values(matchObj).map((mq:any, idx:number) => {
                if(mq){ num = idx }
            })

            return getLastValidItem(num)

        }
        
        else if(typeof selector === 'string'){
            // console.log('args is a string:', selector)
            if(selector in matchObj){
                return matchObj[selector]
            }else{
                return false
            }
        }
        
        else if(typeof selector === 'number'){
            // console.log('args is a number:', selector)
            return Object.values(matchObj)[selector]
        }
        
        else{
            return matchObj
        }
    }

    if(typeof mediaQueries === 'object' && !Array.isArray(mediaQueries)){
        
        useEffect(()=>{
            if(!mediaQueries || !Object.entries(mediaQueries).length) return;

            // console.log('useEffect | mediaQueries - object')
            const qMap:any = {}
            const matchMap:any = {}
            
            Object.entries(mediaQueries).map((tuple:any) => {
                const list: any = window.matchMedia(tuple[1])
                qMap[tuple[0]] = list
                matchMap[tuple[0]] = list.matches
            })

            setMatchObj({...matchMap})
            
            // if(!Object.entries(qMap).length) return;

            const handler: any = (e: any, item:string) => {
                if(matchMap[item] === e.matches) return;
                // console.log('handler:', item)
                matchMap[item] = e.matches
                setMatchObj({...matchMap})
            }

            Object.entries(qMap).forEach((tuple:any) => 
                tuple[1].addEventListener('change', (e:any) => handler(e, tuple[0]))
            )

            return () => { Object.entries(qMap).forEach((tuple:any) => 
                tuple[1].removeEventListener('change', (e:any) => handler(e, tuple[0]))
            )}
        }, [])

        return itemAtIndex
    }


    else if(typeof mediaQueries === 'object' && Array.isArray(mediaQueries)){
        
        useEffect(()=>{
            if(!mediaQueries || !mediaQueries.length) return;

            // console.log('useEffect | mediaQueries - array')
            const qMap:any = {}
            const matchMap:any = {}
            
            mediaQueries.map((mqString:any, idx:number) => {
                const list: any = window.matchMedia(mqString)
                qMap[idx] = list
                matchMap[idx] = list.matches
            })

            setMatchObj({...matchMap})
            
            // if(!Object.entries(qMap).length) return;

            const handler: any = (e: any, item:string) => {
                if(matchMap[item] === e.matches) return;
                // console.log('handler:', item)
                matchMap[item] = e.matches
                // if(e.matches){}
                setMatchObj({...matchMap})
            }

            Object.entries(qMap).forEach((tuple:any) => 
                tuple[1].addEventListener('change', (e:any) => handler(e, tuple[0]))
            )

            return () => { Object.entries(qMap).forEach((tuple:any) => 
                tuple[1].removeEventListener('change', (e:any) => handler(e, tuple[0]))
            )}
        }, [])

        return itemAtIndex
    }
    
    
    else if(typeof mediaQueries === 'string'){
        const [isMatch, setIsMatch] = useState(false)
        const [mediaQueryList, setMediaQueryList] = useState<any>(undefined)
        
        useEffect(()=>{
            const list: any = window.matchMedia(mediaQueries)
            setMediaQueryList(list)
            setIsMatch(list.matches)
        }, [mediaQueries])
        
        useEffect(()=>{
            const handler: any = (e: any) => setIsMatch(e.matches)
            mediaQueryList && mediaQueryList.addEventListener('change', handler)
            return () => mediaQueryList && mediaQueryList.removeEventListener('change', handler)
            // log(`type of MQ list: ${typeof mediaQueryList} isArray:${Array.isArray(mediaQueryList)}`)
        }, [mediaQueryList])
    
        return isMatch
    }else{
        return false
    }
}


export default useMediaQuery