import {useState, useRef, useEffect, useMemo} from 'react'
import io from 'socket.io-client'

type TEvent = { [key: string]: Function }

interface I_UseSocketIOConfig {
    url?: string;
    events?: TEvent
}

const useSocketIO = (config: I_UseSocketIOConfig = {}) => {
    const [isConnected, setIsConnected] = useState<boolean>(false)
    const [lastConnectionTimestamp, setLastConnectionTimestamp] = useState<number>(0)
    const socketRef = useRef<any>(null)

    const settings = useMemo(()=> ({
        url: config.url                 ?? null,
        events: config.events           ?? {},
    }),[config])



    useEffect(()=>{
        // !socketRef.current && (socketRef.current = io())
        if(!socketRef.current){
            socketRef.current = io(settings.url)
            console.log('>  created new socket connection')
        }

        socketRef.current.on('connect', () => {
            setLastConnectionTimestamp(Date.now())
            setIsConnected(true)
            console.log('connected event')

        })

        socketRef.current.on('disconnect', () => {
            setLastConnectionTimestamp(Date.now())
            setIsConnected(false)
            console.log('disconnected event')

        })

        Object.entries(settings.events).forEach((eventTuple:any) => {
            socketRef.current.on(eventTuple.name, eventTuple.callback)
        })

        return () => {
            socketRef.current.off('connect')
            socketRef.current.off('disconnect')
            Object.entries(settings.events).forEach((eventTuple: any) => {
                socketRef.current.off(eventTuple.name)
            })
        }

    },[])




    return {
        isConnected,
        lastConnectionTimestamp,
        socket: socketRef.current
    }
}

export default useSocketIO