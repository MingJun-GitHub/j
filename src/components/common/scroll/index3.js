import React, { useState,useEffect, useRef} from 'react'
import BScroll from 'better-scroll'
import styled from 'styled-components'
import Bubble from './bubble'
import debounce from '@/utils/debounce'
const ScrollContainer = styled.div`
   width:100vw;
   height: 100vh;
   overflow: hidden;
`

const Scroll = (props) => {
  const [rcScroll, setRcScroll] = useState(null);

  const scrollContaninerRef = useRef(null)

  const pullDownInitTop = -50
  let scrollState = {
    isPullUpLoad: false,
    beforePullDown: true,
    pulling: false,
    pullDownStyle: {
      top: `${pullDownInitTop}px`,
    },
    bubbleY: 0,
  }
  const {onScrollEnd, onScrollStart, disabled, onPullDownFresh}  = props
  useEffect(() => {
    const bdscroll = new BScroll(scrollContaninerRef.current, {
      startX: 0,
      startY: 0,
      scrollX: false,
      scrollY: true,
      freeScroll: true,
      bounce: true,
      probeType: 3,
      scrollbar: false
    })
    setRcScroll(bdscroll)
    return () => {
      setRcScroll(null)
    }
  }, [])
  useEffect(() => {
    if (!rcScroll) return
    rcScroll.on('scroll', (pos) => { // 滚动事件  
      console.log('scroll')
    })
    // 每次开始
    onScrollStart && rcScroll.on('scrollStart', () => {
      console.log('every start')
      onScrollStart()
    })
    // 每次结束
    onScrollEnd && rcScroll.on('touchEnd', (pos) => {
      console.log('every end', pos)
      onScrollEnd(pos)
    })

    disabled && rcScroll.disable()
    // 下拉刷新的动作后
    rcScroll.on('pullingDown', async () => {
      scrollState.beforePullDown = false
      scrollState.pulling = true
      onPullDownFresh.then(() => {
        if (!rcScroll) { return}
        scrollState.pulling = false

      })
    })

    rcScroll.on('pullingUp', () => {
      console.log('ccc')
    
    })

  }, [rcScroll])
 
  // 初始化事件  
  const initEvents = () => {
    console.log('start==>')
  }

  const createScrollId = () => {
    return Math.random().toString(36).substr(3, 10);
  }

  const 

  // 下拉动作
  const renderPullUpDown = () => {
    let { pullDownRefresh } = props
    let { beforePullDown, pulling, pullDownStyle } = scrollState
    // 1. 动作分解 开启下拉刷新--> 未开始状态
    if (pullDownRefresh && beforePullDown) {
      return (
        <div className="b-pulldown-wrapper" style={pullDownStyle}>
          <div className="before-trigger">
            <Bubble y={10}></Bubble>
          </div>
        </div>
      )
    }
    // 2. 动作分解 开启下拉刷新--> 下拉中
    if (pullDownRefresh && !beforePullDown && pulling) {
      return (
        <div className="b-pulldown-wrapper" style={pullDownStyle}>
          <div className="after-trigger">
            <div className="loading">
              {/* <Loading></Loading> */}
              加载中...
            </div>
          </div>
        </div>
      )
    }
    // 3. 动作分解 开启下拉刷新--> 下拉完成后 --> 准备回收
    if (pullDownRefresh && !beforePullDown && !pulling) {
      return (
        <div className="b-pulldown-wrapper" style={pullDownStyle}>
          <div className="after-trigger">
            <div><span
              style={{ fontSize: '.42rem' }}>{typeof pullDownRefresh === 'object' ? '加载完成' : '刷新完成'}</span>
            </div>
          </div>
        </div>
      )
    }
  }

  const renderPullUpLoad = () => {

  }

  return (
     <ScrollContainer ref={scrollContaninerRef}>
       <div>{props.children}</div>
       <Bubble y={10}></Bubble>
       {renderPullUpDown()}
     </ScrollContainer>
  )
}


Scroll.defaultProps = {
  pullDownRefresh: true,
  disabled: true,
  onPullingDown: () => {},
  onScroll: () => {},
  onScrollEnd: () => {}, // 结束
  onScrollStart: () => {}, // 开始
  onPullDownFresh: () => {} // 结束
}




export default  Scroll
