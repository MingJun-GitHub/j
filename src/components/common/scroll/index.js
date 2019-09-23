import React, { forwardRef, useState,useEffect, useRef, useImperativeHandle } from 'react'
// import PropTypes from 'prop-types'
// import BScroll from 'better-scroll'
import ScrollContainer from 'react-bscroll'
import 'react-bscroll/lib/react-scroll.css'

// import styled from 'styled-components'

const Scroll = forwardRef((props, ref) => {
  const [rcScrool, setRcScroll] = useState()

  const scrollContaninerRef = useRef(null)

  useEffect(() => {
    if(rcScrool) return;
    const scrolls = scrollContaninerRef.current.getScrollObj();
    setRcScroll(scrolls);
  }, []);
  
  useImperativeHandle(ref, () => ({
    refresh() {
      // if(bScroll) {
      //   bScroll.refresh();
      //   bScroll.scrollTo(0, 0);
      // }
      console.log('haha==>')
    }
  }));

  // const PullUpdisplayStyle = pullUpLoading ? { display: "" } : { display: "none" };
  // const PullDowndisplayStyle = pullDownLoading ? { display: "" } : { display: "none" };
  return (
    <ScrollContainer ref={scrollContaninerRef} pullDownRefresh bounce={true} scrollbar={false}>
      {props.children}
      {/* 滑到底部加载动画 */}
      {/* <PullUpLoading style={ PullUpdisplayStyle }><Loading></Loading></PullUpLoading> */}
      {/* 顶部下拉刷新动画 */}
      {/* <PullDownLoading style={ PullDowndisplayStyle }><Loading2></Loading2></PullDownLoading> */}
    </ScrollContainer>
  );
})

Scroll.defaultProps = {
  // direction: 'vertical',
  // click: true,
  // refresh: true,
  // onScroll: () => {},
  // pullUpLoading: true,
  // pullDownLoading: true,
  // pullUp: () => {},
  // pullDown: () => {},
  // bounceTop: true,
  // bounceBottom: true
};

/*
Scroll.propTypes = {
  direction: PropTypes.oneOf(['vertical', 'horizental']),
  refresh: PropTypes.bool,
  onScroll: PropTypes.func,
  pullUp: PropTypes.func,
  pullDown: PropTypes.func,
  pullUpLoading: PropTypes.bool,
  pullDownLoading: PropTypes.bool,
  bounceTop: PropTypes.bool,//是否支持向上吸顶
  bounceBottom: PropTypes.bool//是否支持向上吸顶
};
*/

export default Scroll;
