import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import BScroll from 'better-scroll'
import styled from 'styled-components'
// import Loading from '../loading/loading'
import Bubble from './bubble'

const ScrollContainer = styled.div`
   width:100vw;
   height: 100vh;
   overflow: hidden;
` 
// import './betterScroll.css'

let defaultPullDownRefresh = {
  threshold: 100,
  stop: 50,
  stopTime: 600,
  txt: {
    success: '刷新成功',
  },
}

let defaultPullUpLoad = {
  threshold: 0,
  txt: {
    more: '加载更多',
    nomore: '我是有底线的',
  },
}

const Scroll = (props) => {

  const [scroll, setScroll] = useState(null)
  
  const scrollRef = useRef(null)
  

  let isRebounding = false
  // let pulling = false

  let pullDownInitTop = -50
  
  let state = {
    isPullUpLoad: false,
    beforePullDown: true,
    pulling: false,
    pullDownStyle: {
      top: `${pullDownInitTop}px`,
    },
    bubbleY: 0
  }

  const [scrollState, setScrollState] = useState(state)

  let TimerA = null
  let TimerB = null


  const [options, setOptions] = useState(null)

  useEffect(() => {
    initScroll()
  }, [])

  useEffect(() => {
    scroll && options && initEvents()
  }, [scroll, options])

  useEffect(() => {
    console.log('scrollState', scrollState)
  }, [scrollState])

  function createScrollId() {
    return Math.random().toString(36).substr(3, 10);
  }

  function initScroll() {
    let { probeType, click, startY, scrollY, scrollX, freeScroll, scrollbar, pullDownRefresh, pullUpLoad, preventDefaultException, eventPassthrough, bounce,stopPropagation } = props
    let _pullDownRefresh = typeof pullDownRefresh === 'object' ? {
      ...defaultPullDownRefresh,
      ...pullDownRefresh
    } : (pullDownRefresh ? defaultPullDownRefresh : false)

    let _pullUpLoad = typeof pullUpLoad === 'object' ? {
      ...defaultPullUpLoad,
      ...pullUpLoad
    } : (pullUpLoad ? defaultPullUpLoad : false)

    var params = {
      probeType,
      click,
      startY,
      scrollY,
      freeScroll,
      scrollX,
      scrollbar,
      pullDownRefresh: _pullDownRefresh,
      pullUpLoad: _pullUpLoad,
      preventDefaultException,
      eventPassthrough,
      bounce: bounce,
      stopPropagation:stopPropagation,
    }
    
    let wrapper = scrollRef.current
    const scrollBox = new BScroll(wrapper, params)
    setScroll(scrollBox)
    setOptions(params)
    // options && initEvents()
  }

  function initEvents() {
    console.log('options', options)
    if (options.pullUpLoad) {
      _initPullUpLoad()
    }
    if (options.pullDownRefresh) {
      _initPullDownRefresh()
    }
    if (props.doScrollStart) {
      scroll.on('scrollStart', (pos) => {
        props.doScrollStart(pos)
      })
    }
    if (props.doScroll) {
      scroll.on('scroll', (pos) => {
        //console.log('sss')
        props.doScroll(pos)
      })
    }
    if (props.doScrollEnd) {
      scroll.on('scrollEnd', (pos) => {
        props.doScrollEnd(pos)
      })
    }
    if (props.disabled) {
      scroll.disable()
    }
  }


  // function getScrollObj () {
  //   return scroll
  // }

  function _initPullDownRefresh() {
    console.log('start==>')
    scroll.on('pullingDown', () => {
      state.beforePullDown = false
      state.pulling = true
      setScrollState(state)
      props.doPullDownFresh()
        .then(() => {
          if (!scroll) { return }
          state.pulling = false
          setScrollState(state)
          _reboundPullDown()
            .then(() => {
              _afterPullDown()
            })
        })
    })

    scroll.on('scroll', (pos) => {
      const { beforePullDown } = state
      if (pos.y < 0) {
        return
      }

      if (beforePullDown) {
        state.bubbleY = Math.max(0, pos.y + pullDownInitTop)
        state.pullDownStyle = {
          top: `${Math.min(pos.y + pullDownInitTop, 10)}px`,
        }
      } else {
        state.bubbleY = 0
      }
      if (isRebounding) {
        state.pullDownStyle = {
          top: `${10 - (defaultPullDownRefresh.stop - pos.y)}px`,
        }
      }
      setScrollState(state)
    })
  }

  function _reboundPullDown() {
    let { stopTime = 600 } = options.pullDownRefresh
    return new Promise((resolve) => {
      TimerA = setTimeout(() => {
        isRebounding = true
        scroll.finishPullDown()
        resolve()
      }, stopTime)
    })
  }

  function _afterPullDown() {
    TimerB = setTimeout(() => {
      state.beforePullDown = true
      state.pullDownStyle = {
        top: `${pullDownInitTop}px`,
      }
      isRebounding = false
      scroll.refresh()
    }, scroll.options.bounceTime)
  }

  function _initPullUpLoad() {
    scroll.on('pullingUp', () => {
      state.isPullUpLoad = true
      setScrollState(state)
      props.pullUpLoadMoreData().then(() => {
        if (!scroll) { return }
        state.isPullUpLoad = false
        setScrollState(state)
        scroll.finishPullUp()
        scroll.refresh()
      })
    })
  }

  function renderPullUpLoad() {
    let { pullUpLoad, isPullUpTipHide } = props

    if (pullUpLoad && isPullUpTipHide) {
      return (
        <div className="b-pullup-wrapper">
          <div className="after-trigger" style={{ lineHeight: '.32rem' }}>
            <span style={{ color: '#999999', fontSize: '.28rem' }}>{''}</span>
          </div>
        </div>
      )
    }

    if (pullUpLoad && state.isPullUpLoad) {
      return (
        <div className="b-pullup-wrapper">
          <div className="after-trigger" style={{ lineHeight: '.32rem' }}>
            <i className="loading-icon"></i>
            <span style={{ color: '#999999', fontSize: '.28rem' }}>{typeof pullUpLoad === 'object' ? pullUpLoad.txt.more : '加载中...'}</span>
          </div>
        </div>
      )
    }
    if (pullUpLoad && !state.isPullUpLoad) {
      return (
        <div className="b-pullup-wrapper">
          <div className="before-trigger">
            <span style={{ color: '#999999', fontSize: '.28rem' }}>{typeof pullUpLoad === 'object' ? pullUpLoad.txt.nomore : '加载完成'}</span>
          </div>
        </div>
      )
    }
  }

  function renderPullUpDown() {
    let { pullDownRefresh } = props
    let { beforePullDown, pulling, pullDownStyle } = scrollState
    if (pullDownRefresh && beforePullDown) {
      return (
        <div className="b-pulldown-wrapper" style={pullDownStyle} >
          <div className="before-trigger">
            <Bubble y={scrollState.bubbleY}></Bubble>
          </div>
        </div>
      )
    }

    if (pullDownRefresh && !beforePullDown && pulling) {
      return (
        <div className="b-pulldown-wrapper" style={pullDownStyle}>
          <div className="after-trigger">
            <div className="loading">
              {/* <Loading></Loading> */}
              loading
            </div>
          </div>
        </div>
      )
    }

    if (pullDownRefresh && !beforePullDown && !pulling) {
      return (
        <div className="b-pulldown-wrapper" style={pullDownStyle}>
          <div className="after-trigger">
            <div><span
              style={{ fontSize: '.18rem' }}>{typeof options.pullDownRefresh === 'object' ? options.pullDownRefresh.txt.success : '刷新完成'}</span>
            </div>
          </div>
        </div>
      )
    }
  }

  return (
    <ScrollContainer ref={scrollRef}>
        {scrollState.bubbleY}
        <div className="b-wrapper">
          {props.children}
          {renderPullUpLoad()} 
          {renderPullUpDown()}
        </div>
    </ScrollContainer>
  )

}

Scroll.defaultProps = {
  probeType: 3,
  click: false, // https://ustbhuangyi.github.io/better-scroll/doc/options.html#tap
  startY: 0,
  scrollY: true,
  scrollX: false,
  freeScroll: true,
  scrollbar: false,
  pullDownRefresh: true,
  pullUpLoad: false,
  bounce: true,
  preventDefaultException: {
    className: /(^|\s)originEvent(\s|$)/,
    tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|TABLE)$/,
  },
  eventPassthrough: '',
  isPullUpTipHide: true,
  disabled: false,
  stopPropagation: true,
}

Scroll.propTypes = {
  children: PropTypes.any,
  probeType: PropTypes.number,
  startY: PropTypes.number,
  click: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  scrollY: PropTypes.bool,
  scrollX: PropTypes.bool,
  freeScroll: PropTypes.bool,
  scrollbar: PropTypes.bool,
  pullDownRefresh: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  pullUpLoad: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  pullUpLoadMoreData: PropTypes.func,
  canRenderPullUpTip: PropTypes.bool,
  doPullDownFresh: PropTypes.func,
  doScroll: PropTypes.func,
  doScrollStart: PropTypes.func,
  doScrollEnd: PropTypes.func,

  preventDefaultException: PropTypes.object,
  eventPassthrough: PropTypes.string,
  isPullUpTipHide: PropTypes.bool,
  bounce: PropTypes.bool,
  disabled: PropTypes.bool,
  stopPropagation: PropTypes.bool,
}


export default Scroll