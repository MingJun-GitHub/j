import React, { useState,useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const BubbleBox = styled.div`
   position: absolute;
   left: 50%;
   transform: translateX(-50%);
`

const Bubble = (props) => {
    const bubbleRef = useRef(null)
    const [style, setStyle] = useState({})
    const { y } = props
    let width = 50
    let height = 80

    let ratio = window.devicePixelRatio
    width *= ratio
    height *= ratio
    let initRadius = 18 * ratio
    let minHeadRadius = 12 * ratio
    let minTailRadius = 5 * ratio
    let initArrowRadius = 10 * ratio
    let minArrowRadius = 6 * ratio
    let arrowWidth = 3 * ratio
    let maxDistance = 40 * ratio
    let initCenterX = 25 * ratio
    let initCenterY = 25 * ratio
    let headCenter = {
      x: initCenterX,
      y: initCenterY
    }

    useEffect(() => {
        setStyle({
            width: `${width / ratio}px`,
            height: `${height / ratio}px`,
        })
        drawInit()
    }, [y])

    const drawInit = () => {
        let ctx = bubbleRef.current.getContext('2d')
        ctx.clearRect(0, 0, bubbleRef.current.width, bubbleRef.current.height)
        drawBubble(ctx)
        drawArrow(ctx)
    }

    const drawBubble = (ctx) => {
        ctx.save()
        ctx.beginPath()
    
        const distance = getDistance()
    
        const rate = distance / maxDistance
    
        const headRadius = initRadius - (initRadius - minHeadRadius) * rate
    
        headCenter.y = initCenterY - (initRadius - minHeadRadius) * rate
    
        // 画上半弧线
        ctx.arc(headCenter.x, headCenter.y, headRadius, 0, Math.PI, true)
    
        // 画左侧贝塞尔
        const tailRadius = initRadius - (initRadius - minTailRadius) * rate
        const tailCenter = {
          x: headCenter.x,
          y: headCenter.y + distance
        }
    
        const tailPointL = {
          x: tailCenter.x - tailRadius,
          y: tailCenter.y
        }
        const controlPointL = {
          x: tailPointL.x,
          y: tailPointL.y - distance / 2
        }
    
        ctx.quadraticCurveTo(controlPointL.x, controlPointL.y, tailPointL.x, tailPointL.y)
    
        // 画下半弧线
        ctx.arc(tailCenter.x, tailCenter.y, tailRadius, Math.PI, 0, true)
    
        // 画右侧贝塞尔
        const headPointR = {
          x: headCenter.x + headRadius,
          y: headCenter.y
        }
        const controlPointR = {
          x: tailCenter.x + tailRadius,
          y: headPointR.y + distance / 2
        }
        ctx.quadraticCurveTo(controlPointR.x, controlPointR.y, headPointR.x, headPointR.y)
    
        ctx.fillStyle = 'rgb(170,170,170)'
        ctx.fill()
        ctx.strokeStyle = 'rgb(153,153,153)'
        ctx.stroke()
        ctx.restore()
    }

    //  画圆
    const drawArrow = (ctx) => {
        ctx.save()
        ctx.beginPath()

        const distance = getDistance()
        const rate = distance / maxDistance
        const arrowRadius = initArrowRadius - (initArrowRadius - minArrowRadius) * rate
        // 画内圆
        ctx.arc(headCenter.x, headCenter.y, arrowRadius - (arrowWidth - rate), -Math.PI / 2, 0, true)
        // 画外圆
        ctx.arc(headCenter.x, headCenter.y, arrowRadius, 0, Math.PI * 3 / 2, false)
        ctx.lineTo(headCenter.x, headCenter.y - arrowRadius - arrowWidth / 2 + rate)
        ctx.lineTo(headCenter.x + arrowWidth * 2 - rate * 2, headCenter.y - arrowRadius + arrowWidth / 2)
        ctx.lineTo(headCenter.x, headCenter.y - arrowRadius + arrowWidth * 3 / 2 - rate)
        ctx.fillStyle = 'rgb(255,255,255)'
        ctx.fill()
        ctx.strokeStyle = 'rgb(170,170,170)'
        ctx.stroke()
        ctx.restore()
    }

    const getDistance = () => {
        return Math.max(0, Math.min(y * ratio, maxDistance))
    }
    return(
        <BubbleBox>
          <canvas ref={bubbleRef} id='bubble' width={width} height={height} style={style}></canvas>
        </BubbleBox>
    )
}


Bubble.propTypes = {
    y: PropTypes.number
}

Bubble.defaultProps = {
    y: 0
}

export default Bubble;
