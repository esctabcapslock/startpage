function drow_rectangle(x,y,w,h){
    const ele = document.createElementNS(xmlns, "g");

    const rect  = document.createElementNS(xmlns,'rect')
    rect .setAttribute('x',x)
    rect .setAttribute('y',y)
    rect .setAttribute('width',w)
    rect .setAttribute('height',h)
    rect .setAttribute('style',`fill: ${'red'}; stroke: black; stroke-width: 1px;`)
    // ele.append(rect)
    return rect
}