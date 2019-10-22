import React, {useEffect, useRef, useState } from 'react'
import styled from 'styled-components' 

const ProgressBarBox = styled.div`
  height: .8rem;
  width: 60%;
  margin: 0 auto;
  .progress-inner{
    position: relative;
    top: .34rem;
    height: .12rem;
    border-radius: .06rem;
    background-color: rgba(255, 255, 255, .3);
    .progress{
      position: absolute;
      height: 100%;
      background: #fff;
      border-radius: .06rem;
    }
    .progress-btn-wrapper{
      position: absolute;
      left: -.25rem;
      width: .5rem;
      height: .5rem;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      justify-content: center;
      align-content: center;
      .progress-btn{
        position: relative;
        left: .25rem;
        box-sizing: border-box;
        width: .5rem;
        height: .5rem;
        border: 3px solid red;
        border-radius: 50%;
        background-color: #fff;
      }
    }
  }
`

function ProgressBar(props){
  const progressBar = useRef()
  const progress = useRef()
  const progressBtn = useRef()
  const [touch, setTouch] = useState({})
  const [progressBtnWidth, setProgressBtnWidth] = useState(16)
  const [barWidth, setBarWidth] = useState(0)
  const { percent } = props

  const transform = 'transform' //prefixStyle('transform');
  
  useEffect(() => {
    if(percent >= 0 && percent <= 1 && !touch.initiated) {
      const offsetWidth = percent * barWidth;
      progress.current.style.width = `${offsetWidth}px`;
      progressBtn.current.style[transform] = `translate3d(${offsetWidth}px, -50%, 0)`;
    }
    // eslint-disable-next-line
  }, [percent])

  useEffect(() => {
    setProgressBtnWidth(progressBtn.current.getBoundingClientRect().width)
    setBarWidth(progressBar.current.clientWidth - progressBtnWidth)
  }, [])

  const setOffset = (offsetWidth) => {
    progress.current.style.width = `${offsetWidth}px`;
    progressBtn.current.style.transform = `translate3d(${offsetWidth}px, -50%, 0)`
  }

  const changePercent = () => {
    const curPercent = progress.current.clientWidth / barWidth;
    props.percentChange(curPercent)
  }

  const progressClick = (e) => {
    const rect = progressBar.current.getBoundingClientRect()
    const offsetWidth = Math.min(e.pageX - rect.left, barWidth)
    setOffset(offsetWidth)
    changePercent()
  }

  const progressTouchStart = (e) => {
    const startTouch = {}
    startTouch.initiated = true;
    startTouch.startX = e.touches[0].pageX
    startTouch.left = progress.current.clientWidth
    setTouch(startTouch)
  }

  const progressTouchMove = (e) => {
    if(!touch.initiated) return
    const deltaX = e.touches[0].pageX - touch.startX
    const offsetWidth = Math.min(Math.max(0, touch.left + deltaX), barWidth)
    setOffset(offsetWidth)
  }

  const progressTouchEnd = (e) => {
    const endTouch = JSON.parse(JSON.stringify(touch));
    endTouch.initiated = false;
    setTouch(endTouch)
    changePercent()
  }

  return (
    <ProgressBarBox>
      <div className="progress-inner" ref={progressBar} onClick={progressClick}>
        <div className="progress" ref={progress}></div>
        <div className="progress-btn-wrapper" ref={progressBtn} onTouchStart={progressTouchStart} onTouchMove={progressTouchMove} onTouchEnd={progressTouchEnd}>
          <div className="progress-btn"></div>
        </div>
      </div>
    </ProgressBarBox>
  )
}


ProgressBar.defaultProps = {
    percent: 0
}


export default React.memo(ProgressBar);