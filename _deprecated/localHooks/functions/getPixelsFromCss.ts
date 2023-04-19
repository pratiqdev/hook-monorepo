import isBrowser from '../utils/isBrowser'

const getPixelsFromCss = (value: string) => {
    if(!isBrowser()) return;

    let pixelValue = null
    let isValidCss = null
    let numberReg = /^-?\d+\.?\d*$/


    const parseCss = (cssValue: any) => {
        let style
        let parsedValue
        
        // create the element and append to document
        const tempEl = document.createElement('div')
        tempEl.style.pointerEvents = 'none'
        tempEl.style.opacity = '0'
        tempEl.style.padding = '0'
        tempEl.style.marginRight = `${cssValue}`
        document.body.appendChild(tempEl)

        if (window.getComputedStyle) { style = window.getComputedStyle(tempEl); }

        parsedValue = parseInt(tempEl.style.marginRight)
        document.body.removeChild(tempEl)
        return parsedValue;
    }

    if(numberReg.test(value)){
        pixelValue = parseInt(value)
        isValidCss = true
    }
    else if( CSS.supports('width', value) ){
        pixelValue = parseCss(value)
        isValidCss = true
    }else{
        pixelValue = 0
        isValidCss = false
    }

    return {
        pixels: pixelValue,
        isValid: isValidCss
    }

}
export default getPixelsFromCss