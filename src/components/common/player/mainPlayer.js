import React, { useState, useEffect, useRef, memo} from 'react'
import styled, {keyframes} from 'styled-components'

import 'swiper/dist/css/swiper.min.css'
import Swiper from 'swiper';


const rotate = keyframes`
0%{
  transform: rotate(0);
}
100%{
  transform: rotate(360deg);
}
`


const MainPlayerBox = styled.div`
    display: block;
    position: fixed;
    z-index: 10;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    background: url('http://p1.music.126.net/2YIpNoCzXfYgz4zIw3s0Vg==/73667279073787.jpg?param=300x300') no-repeat center/cover;
    overflow: hidden;
    font-size: .42rem;
    &::after{
        display: block;
        content: '';
        z-index: 1;
        background: inherit;
        position: absolute;
        /* filter: blur(0px); */
        filter: blur(30px);
        /* background-color: rgba(0, 0, 0, .3); */
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transform: scale(1.25);
    }
    &::before{
        display: block;
        content: '';
        z-index: 2;
        background-color: rgba(0, 0 , 0 , .3);
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        position:absolute;
    }
    .main{
        display: flex;
        flex: 1;
        flex-direction: column;
        position: relative;
        width: 100vw;
        height: 100vh;
        z-index: 3;
        box-sizing: border-box;
        color: #fff;
        i.iconfont{
            color: rgba(255, 255, 255, .80);
        }
        .navbar{
            display: flex;
            justify-content: space-between;
            padding: 0 .42rem;
            height: 1.2rem;
            align-items: center;
            /* border-bottom: 1px solid rgba(255, 255, 255, .3); */
            font-size: .5rem;
            span{
                color: #fff;
            }
            i{
                /* color: rgba(255, 255, 255, .80); */
                font-size: .6rem; 
                &.close{
                    font-size: .78rem;
                }
            }
        }
        .content{
            display: flex;
            justify-content: flex-start;
            flex: 1;
            flex-direction: column;
            .swiper-container{
                width: 100%;
                height: 100%;
            }
            .singer{
                text-align: center;
                font-size: .38rem;
                height: .8rem;
                line-height: .8rem;
                margin-bottom: .32rem;
            }
            .tag{
                display: flex;
                justify-content: center;
                align-items: center;
                em{
                    font-style: normal;
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                    margin: 0 .2rem;
                    padding:.02rem .1rem;
                    font-size: .32rem;
                    line-height: normal;
                    border: 1px solid rgba(255, 255, 255, .3);
                    border-radius: .05rem;
                }
            }
            .cover{
                width: 8rem;
                height: 8rem;
                overflow: hidden;
                display: flex;
                justify-content: center;
                align-items: center;
                overflow: hidden;
                border-radius: 50%;
                border: .3rem solid rgba(0, 0 , 0 , .2);
                margin: 1.3rem auto 0;
                img{
                    width: 100%;
                    height: auto;
                }
                &_play{
                    animation: ${rotate} 20s linear infinite;
                }
                &_pause{
                    animation-play-state: paused;
                }
            }
            .onelyric{
                text-align: center;
                margin-top: 1.2rem;
            }
        }
        .menu{
            i {
                    font-size: .62rem;
            }
            .playebar{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 1.2rem;
            }
            .bottombar{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: .5rem 2.2rem;
            }
            .playbtn{
                width: 1.5rem;
                height: 1.5rem;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 50%;
                border: 2px solid #fff;
                line-height: normal;
                i {
                    font-size: .48rem;
                }
                &2{
                    width: 1.2rem;
                    height: 1.2rem;
                }
            }
        }
    }
`


const MainPlayer  = (props) => {
    const [sliderSwiper, setSliderSwiper] = useState(null);
    const [playing, setPlaying] = useState(false);
    const swiperRef = useRef(null);
    const options = {
        loop: false,
        autoplay: false,
        // autoplay: { 
        //     disableOnInteraction: false,
        // },
        pagination: {
            el: '.swiper-pagination'
        }
    }
    useEffect(() => {
        if (!sliderSwiper) {
            let sliderSwiper = new Swiper(swiperRef.current, options)
            setSliderSwiper(sliderSwiper)
        }
    }, [sliderSwiper])


    return (
        <MainPlayerBox>
            <div className="main">
                <div className="navbar">
                    <i className="close iconfont icon-xiangxia"></i>
                    <span>回到过去</span>
                    <i className="comment iconfont icon-pinglun"></i>
                </div>

                <div className="content">
                   <div className="swiper-container" ref={swiperRef}>
                       <div className="swiper-wrapper">
                            <div className="swiper-slide">
                                <div className="song">
                                    <div className="singer">--周杰伦--</div>
                                    <div className="tag"><em>VIP</em> <em>MV</em> <em>倍速x1</em> </div>
                                    {playing}
                                    <div className={`cover cover_play ${playing ? '': 'cover_pause'}`} onClick={() => setPlaying(!playing)}><img src="http://p1.music.126.net/2YIpNoCzXfYgz4zIw3s0Vg==/73667279073787.jpg?param=300x300" alt="cover" /></div>
                                    <div className="onelyric">查看完整歌词</div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="info"></div>
                            </div>
                            <div className="swiper-slide">
                                <div className="lyric"></div>
                            </div>
                       </div>
                       <div className="swiper-pagination"></div>
                    </div>   
                </div>

                <div className="menu">
                    <div className="playebar">
                        <i className="iconfont icon-suiji"></i>
                        <div className="playbtn playbtn2">
                            <i className="iconfont icon-shangyishou"></i>
                        </div>
                        <div className="playbtn">
                           <i className="iconfont icon-player"></i>
                        </div>
                        <div className="playbtn playbtn2">
                        <i className="iconfont icon-xiayishou"></i>
                        </div>
                        <i className="iconfont icon-music5yinle"></i> 
                    </div>
                    <div className="bottombar">
                        <i className="iconfont icon-shoucang"></i>
                        <i className="iconfont icon-fenxiang"></i>
                        <i className="iconfont icon-xiazai"></i>
                    </div>
                </div>
            </div>
        </MainPlayerBox>
    )
}

export default memo(MainPlayer)