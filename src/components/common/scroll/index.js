import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import BScroll from 'better-scroll'
import styled from 'styled-components'
import Bubble from './bubble'
import Loading from '@/components/common/loading'

const ScrollContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background: transparent;
  .pullup_wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 1rem;
    line-height: normal;
  }
  .pulldown_wrapper {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all;
    pointer-events: none;
  }
  .pulldown_status, .pullup_status {
    font-size: .36rem;
    color: #999;
  }
`

const PullDowned = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999;
  font-size: .36rem;
  line-height: normal;
  height: 50px;
`

let defaultPullDownRefresh = {
  threshold: 100,
  stop: 50,
  stopTime: 600,
  txt: {
    success: '刷新成功',
  }
}

let defaultPullUpLoad = {
  threshold: 0,
  txt: {
    more: '加载更多',
    nomore: '我是有底线的',
  }
}

const Scroll = forwardRef((props, ref) => {

  const [scroll, setScroll] = useState(null)
  
  const scrollRef = useRef(null)
  
  let isRebounding = false

  let pullDownInitTop = -50
  
  let TimerA = null
  let TimerB = null

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

  const [options, setOptions] = useState(null)

  useEffect(() => {
    initScroll()
  }, [])

  useEffect(() => {
    scroll && initEvents()
  }, [scroll])
  
  /*
  function createScrollId() {
    return Math.random().toString(36).substr(3, 10);
  }
  */

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

    const params = {
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
    setOptions({...params})
  }

  function initEvents() {
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
    if (props.doScrollEnd) {
      scroll.on('scrollEnd', (pos) => {
        props.doScrollEnd(pos)
      })
    }
    scroll && scroll.on('scroll', (pos) => {
      // console.log('pos-y==>', pos.y, scroll.maxScrollY)
      props.doScroll && props.doScroll(pos)
      if (props.doScrollTop) {
        console.log('到顶')
        pos.y >= 0 && props.doScrollTop(pos) // 到顶
      }
      if (props.doScrollBottom) {
        console.log('到底')
        pos.y <= scroll.maxScrollY && props.doScrollBottom(pos) // 到底
      }
    })
  }


  // 下拉刷新 先打开 pullDownRefresh true
  function _initPullDownRefresh() {
    scroll.on('pullingDown', () => {
      state.beforePullDown = false
      state.pulling = true
      setScrollState({...state})
      scroll.disable()
      props.doPullDownFresh()
        .then(() => {
          if (!scroll) { return }
          scroll.enable()
          state.pulling = false
          setScrollState({...state})
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
          top: `${Math.min(pos.y + pullDownInitTop, 0)}px`,
        }
      } else {
        state.bubbleY = 0
        state.pullDownStyle = {
          top: `${0 - (defaultPullDownRefresh.stop - pos.y)}px`,
        }
      }
      if (isRebounding) {
        state.pullDownStyle = {
          top: `${0 - (defaultPullDownRefresh.stop - pos.y)}px`,
        }
      } 
      setScrollState({...state})
    })
  }

  function _reboundPullDown() {
    let { stopTime = 600 } = options.pullDownRefresh
    return new Promise(resolve => {
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
      setScrollState({...state})
    }, scroll.options.bounceTime)
  }

  // 上拉加载更多
  function _initPullUpLoad() {
    scroll.on('pullingUp', () => {
      if (props.pullUploadEnd) {
        return
      }
      state.isPullUpLoad = true
      setScrollState({...state})
      props.pullUpLoadMoreData().then(() => {
        if (!scroll) { return }
        state.isPullUpLoad = false
        scroll.finishPullUp()
        scroll.refresh()
        setScrollState({...state})
      })
    })
  }

  function renderPullUpLoad() {
    let { pullUpLoad, isPullUpTipHide, pullUploadEnd} = props
    const {isPullUpLoad} = scrollState
    // console.log('isPullUpLoad===>', isPullUpLoad)
    if (pullUpLoad) {
      return (
        <div className="pullup_wrapper">
          {
            isPullUpTipHide ? '' : (
              pullUploadEnd ? <div className="pullup_status">{pullUpLoad.txt.nomore || '我也是有底线的'}</div> : (isPullUpLoad ? <Loading>{typeof pullUpLoad === 'object' ? pullUpLoad.txt.more : '加载中...'}</Loading> : <div className="pullup_status">{pullUpLoad.txt.nomore || '加载完成'}</div>)
            )
          }
        </div>
      )
    }
  }


  function renderPullUpDown() {
    let { pullDownRefresh } = props
    let { beforePullDown, pulling, pullDownStyle } = scrollState
    if (pullDownRefresh) {
      return (
        <div className="pulldown_wrapper" style={pullDownStyle} >
          <div className="pulldown_status">
             {
               beforePullDown && <Bubble y={scrollState.bubbleY}></Bubble>
             }
             {
               !beforePullDown && pulling && <Loading style={1}>加载中...</Loading> 
             }
             {
               !beforePullDown && !pulling && <PullDowned>{typeof options.pullDownRefresh === 'object' ? options.pullDownRefresh.txt.success : '刷新完成'}</PullDowned>
             }
          </div>
        </div>
      )
    }
  }
  
  // 暴露给外面回调的方法 
  useImperativeHandle(ref, () => ({
    enable() {
      scroll.enable()
    },
    disable() {
      scroll.disable()
    },
    refresh() {
      scroll.refresh()
    },
    destroy() {
      scroll.destroy()
    },
    scrollTo(x, y) {
      scroll.scrollTo(x,y)
    },
    getScroll() {
      return scroll // 获取对象实例
    }
  }))

  return (
    <ScrollContainer ref={scrollRef}>
        <div className="scroll_content">
          {props.children}
          {renderPullUpLoad()} 
        </div>
        {renderPullUpDown()}
    </ScrollContainer>
  )

})

Scroll.defaultProps = {
  probeType: 3,
  click: false, // https://ustbhuangyi.github.io/better-scroll/doc/options.html#tap
  startY: 0,
  scrollY: true,
  scrollX: false,
  freeScroll: true,
  scrollbar: false,
  pullDownRefresh: true, // 是否开启下拉刷新，前提要 bounce 开启 要不然不生效
  pullUpLoad: false, // 是否开启上拉刷新
  bounce: true,
  preventDefaultException: {
    className: /(^|\s)originEvent(\s|$)/,
    tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|TABLE)$/,
  },
  eventPassthrough: '',
  isPullUpTipHide: false,
  disabled: false,
  stopPropagation: true,
  pullUploadEnd: false // 下拉结束
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
  doScroll: PropTypes.func,  // 滚动派发
  doScrollStart: PropTypes.func, // 开始滚动
  doScrollEnd: PropTypes.func, // 滚动结束
  doScrollTop: PropTypes.func, // 滚动到顶部
  doScrollBottom: PropTypes.func, // 滚动到底部
  pullUploadEnd: PropTypes.bool, // 下拉后没有更多数据时触发
  preventDefaultException: PropTypes.object,
  eventPassthrough: PropTypes.string,
  isPullUpTipHide: PropTypes.bool,
  bounce: PropTypes.bool,
  disabled: PropTypes.bool,
  stopPropagation: PropTypes.bool,
}


export default Scroll