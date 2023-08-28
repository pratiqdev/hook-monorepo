import React, { useEffect, useState } from 'react'

export const isClassComponent = (component: any) => {
    return (
        typeof component === 'function' && 
        !!component.prototype.isReactComponent
    )
}

export const isFunctionComponent = (component: any) => {
    return (
        typeof component === 'function' && 
        String(component).includes('return React.createElement')
    )
}

export const isReactComponent = (component: any) => {
    return (
        isClassComponent(component) || 
        isFunctionComponent(component)
    )
}

export const isElement = (element: any) => {
    return React.isValidElement(element);
}

export const DOMTypeElement = (element: any) => {
    return isElement(element) && typeof element.type === 'string';
}

export const CompositeTypeElement = (element: any) => {
    return isElement(element) && typeof element.type === 'function';
}

export const useClient = ():boolean => {
    const [browser, setBrowser] = useState(() => false)
    useEffect(() => {
        setBrowser(true)
    }, [])
    return browser
}