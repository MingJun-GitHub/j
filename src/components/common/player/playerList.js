import React, { memo } from 'react'
import styled from 'styled-components'

const PlayListBox = styled.div`
   position: fixed;
   width: 100%;
   height: auto;
   width: 100%;
   height: 100%;
   left: 0;
   right: 0;
   bottom: 0;
   z-index: 12;
   overflow: hidden;
   background-color: rgba(0, 0 , 0, .82);
   transform: translate(100%, 0);
   background-size: 100% auto;
   .playerlist {
       &_main{
            position: absolute;
            bottom: 0;
            left: 0;
            z-index: 2;
            width: 100%;
            height: 72%;
            color: #fff;
            font-size: .4rem;
            overflow: hidden;
            background: url('https://p1.music.126.net/nZfZlMV5CNW4YJWdDyk46Q==/109951164388190043.webp') no-repeat center;
            background-size: 400% auto;
            display: flex;
            flex-direction: column;
            &::after{
                content: '';
                background: inherit;
                filter: blur(40px);
                position: absolute;
                display: block;
                top: 0;
                height: 100%;
                width: 100%;
                transform: scale(3);
                z-index: 1;
            }
         }
        &_close{
            width: 100%;
            left: 0;
            /* position: absolute; */
            height: 1.40rem;
            display: flex;
            justify-content: center;
            align-items: center;
            bottom: 0;   
            border-top: 1px solid rgba(255, 255, 255, .1);
            position: relative;
            z-index: 2;
        }
        &_top{
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 1.4rem;
            line-height: normal;
            padding: 0 .5rem;
            border-bottom: 1px solid rgba(255, 255, 255, .1);
            position: relative;
            z-index: 2;
            font-size: .42rem;
            i.delall {
                font-size: .52rem;
                margin-right: -.05rem;
            }
        }
        &_content {
            /* min-height: rem; */
            display: flex;
            flex: 1;
            position: relative;
            z-index: 2;
            ul {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                overflow-x: hidden; 
                overflow-y: scroll;
                -webkit-overflow-scrolling: touch;
            }
            li {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 1.2rem;
                margin-left: .5rem;
                border-bottom: 1px solid rgba(255, 255, 255, .1);
                padding-right: .5rem;
                &:last-child{
                    border-bottom: none;
                }
                span{
                    font-size: .32rem;
                    color: #999;
                }
                /* .vip{
                    font-size: .28rem;
                    color: red;
                    border: 1px solid rgba(255, 255, 255, .4);
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                    line-height: normal;
                    font-style: normal;
                } */
                &.disabed{
                    .song{
                        opacity: .35;
                    }
                }
            }
        }
   }
`

const PlayList = (props) => {
    return(
        <PlayListBox>
            {/* <div className="playlist_mask">1</div> */}
            <div className="playerlist_main">
                <div className="playerlist_top">
                    <i className="iconfont icon-suiji"> 随机播放</i>
                    <i className="iconfont icon-shanchu1 delall"></i>
                </div>
                <div className="playerlist_content">
                <ul>
                    <li className="disabed">
                        <div className="song">
                            回到过去<span> - 宋冬野</span>
                        </div>
                        <i className="delete iconfont icon-shanchu"></i>
                    </li>
                    <li>
                        <div className="song">
                            回到过去<span> - 宋冬野</span>
                        </div>
                        <i className="delete iconfont icon-shanchu"></i>
                    </li>
                </ul>
                </div>
                <div className="playerlist_close">关闭</div>
            </div>
        </PlayListBox>
    )
}

export default memo(PlayList)
