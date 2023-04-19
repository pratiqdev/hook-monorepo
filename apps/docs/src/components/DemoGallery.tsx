import React, { useState } from 'react'
import { useKeyboard } from '@pratiq/hooks'
// @ts-nocheck

interface I_DemoGalleryProps{
    demos: any[];
    defaultIndex: number;
    random: boolean;
}
const DemoGallery = (props: I_DemoGalleryProps) => {
    const { demos, defaultIndex, random } = props
    if(!demos || demos.length < 1) return null;
    const [open, setOpen] = useState(true)

    const [currentIndex, setCurrentIndex] = useState(0)
    useKeyboard({ combos: { 
        'shift-down': () => handleNext(),
        'shift-up': () => handlePrev(),
    }})

    const handlePrevPage = () => {
        console.log('prev page')
        if(typeof document !== 'undefined'){
            let el = document.querySelector('pagination-nav__link--next')
            if(el){
                // el.click()
            }
        }
    }

    const handleNextPage = () => {}


    const handleNext = () => {
        // currentIndex < demos.length - 1 ? setCurrentIndex(n => n + 1) : setCurrentIndex(0)
        setCurrentIndex(n => n < demos.length - 1 ? n + 1 : 0)
    }

    const handlePrev = () => {
        // currentIndex > 0 ? setCurrentIndex(n => n - 1) : setCurrentIndex(demos.length - 1)
        setCurrentIndex(n => n > 0 ? n - 1 : demos.length - 1)
    }

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems:'center'}}>
                <button onClick={handlePrev} className='left-chev'/>
                {currentIndex + 1} / {demos.length}
                <button onClick={handleNext} className='right-chev'/>
            </div>
            {demos[currentIndex]}
        </div>
    )


}

export default DemoGallery