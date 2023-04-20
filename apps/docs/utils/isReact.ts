import React from 'react'

export const ClassComponent = (component: any) => {
    return (
        typeof component === 'function' && 
        !!component.prototype.isReactComponent
    )
}

export const FunctionComponent = (component: any) => {
    return (
        typeof component === 'function' && 
        String(component).includes('return React.createElement')
    )
}

export const ReactComponent = (component: any) => {
    return (
        ClassComponent(component) || 
        FunctionComponent(component)
    )
}

export const Element = (element: any) => {
    return React.isValidElement(element);
}

export const DOMTypeElement = (element: any) => {
    return Element(element) && typeof element.type === 'string';
}

export const CompositeTypeElement = (element: any) => {
    return Element(element) && typeof element.type === 'function';
}