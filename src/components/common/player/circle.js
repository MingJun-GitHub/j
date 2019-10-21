import React, {useState, useEffect, useRef, memo} from 'react'
import styled from 'styled-components'

const CircleBox = styled.div`
   width: 100%;
   height: 100%;
   .progress_ring{
        width: 100%;
        height: 100%;
        &_circle{
            transition: stroke-dashoffset 0.35s;
            transform: rotate(-90deg);
            transform-origin: 50% 50%;
        }
    }
`

const Circle  = (props) => {
    const circleRef = useRef(null)

    const [circumference, setCircumference] = useState(0)
    const {progress, stroke, strokeWidth} = props
    
    // console.log('progress===>', (100-progress)/100*circumference)

    useEffect(() => {
        const radius = circleRef.current.r.baseVal.value
        setCircumference(radius * 2 * Math.PI)
    }, [])
    return (
        progress && <CircleBox>
            <svg className="progress_ring" height="100%" width="100%"> 
                <circle ref={circleRef} className="progress_ring_circle" style={{strokeDashoffset: `${(100-progress)/100*circumference}`}} strokeDasharray={circumference+ ' ' +circumference} stroke={stroke} strokeWidth={strokeWidth} fill="transparent" r="50%" cx="50%" cy="50%" /> 
            </svg>
        </CircleBox>
    )
}


Circle.defaultProps = {
    stroke: 'white',
    strokeWidth: 3
}

export default Circle