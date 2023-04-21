import React, { useState, useRef, useEffect, } from 'react'
import { useKeyboard } from '@pratiq/hooks'
// @ts-nocheck



const MemoizedComponent = React.memo(({ element }) => {
  return <>{element}</>;
});



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


    const handleNext = () => {
        // currentIndex < demos.length - 1 ? setCurrentIndex(n => n + 1) : setCurrentIndex(0)
        setCurrentIndex(n => n < demos.length - 1 ? n + 1 : 0)
    }

    const handlePrev = () => {
        // currentIndex > 0 ? setCurrentIndex(n => n - 1) : setCurrentIndex(demos.length - 1)
        setCurrentIndex(n => n > 0 ? n - 1 : demos.length - 1)
    }
    const prevRef= useRef()

    useEffect(() => {
        prevRef.current = demos[currentIndex - 1];
    }, [currentIndex, demos]);

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems:'center'}}>
                <button onClick={handlePrev} className='left-chev'/>
                {currentIndex + 1} / {demos.length}
                <button onClick={handleNext} className='right-chev'/>
            </div>
            {/* {demos[currentIndex]} */}
            {/* <MemoizedComponent element={demos[currentIndex]} /> */}
            {prevRef.current && currentIndex > 0 && (
                <MemoizedComponent element={prevRef.current} />
            )}
            <MemoizedComponent element={demos[currentIndex]} />
        </div>
    )


}

export default DemoGallery