import React, { useState } from 'react'
import Toast, {useBufferedToast} from './local_bufferedToast'
import { Card, DemoLayout } from '../../components' 
import useErrorBoundary from '../../hooks/useErrorBoundary'


const Inner = () => {
    const {createToast, toasts} = useBufferedToast()

    return(
        <Card>
            <div  style={{height: '10rem'}}>
                <button onClick={() => createToast({title:'hello?'})}>Create Toast</button>
                <p>{JSON.stringify(toasts, null, 2)}</p>
            </div>
        </Card>
    )

}

const Demo = () => {
    const [pos, setPos] = useState('bottom-center')
    const Boundary = useErrorBoundary({
        handleReset:  () => window?.location?.reload()
    })

    return(
        <Boundary>
            <DemoLayout title='bufferedToast' description='Manage and display toast notifications with a built-in buffer for handling large amounts of messages
            without clogging the screen or losing bread'>
            <Toast position={pos}>
                <button onClick={() => setPos('bottom-left')}>bottom-left</button>
                <Inner />
            </Toast>
            </DemoLayout>
        </Boundary>
    )

}



export default Demo