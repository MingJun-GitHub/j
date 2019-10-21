import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import styled from 'styled-components'
import Circle from './circle'
const MiniPlayerBox = styled.div`
   position: fixed;
   bottom: 0;
   right: 0;
   left: 0;
   z-index: 10;
   margin: 0 auto;
   width: 100%;
   height: auto;
   /* background-color: rgba(0, 0, 0, .3); */
   display: flex;
   justify-content: space-between;
   align-items: center;
   /* background-color: rgba(42,42,42,.9); */
   background: #fff;
   padding: 0 .2rem;
   
   .song{
       display: flex;
       justify-content: center;
       align-items: center;
       height: 1.3rem;
       &_pic{
           transform: translateY(-.12rem);
           width: 1.3rem;
           height: 1.3rem;
           display: flex;
           justify-content: center;
           align-items: center;
           border-radius: 50%;
           overflow: hidden;
           img{
               width: 100%;
               height: auto;
           }
       }
       &_name{
           margin-left: .2rem;
           font-size: .42rem;
           color: #2a2a2a;
       }
   }
   .play{
       display: flex;
       justify-content: center;
       align-items: center;
       font-size: .40rem;
       color: #2a2a2a;
       &_btn{
            width: .8rem;
            height: .8rem;
            background-color: transparent;
            border: 2px solid black;
            overflow: hidden;
            border-radius: 50%;
            position: relative;
            .circle{
                width: 100%;
                height: 100%;
            }
            i {
                font-size: .38rem;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                display: block;
            }
       }
       &_list{
           margin-left: .35rem;
          i{font-size: .8rem;} 
       }
   }
`

const MiniPlayer = (props) => {
    return(
        <MiniPlayerBox>
            <div className="song">
                <div className="song_pic">
                    <img src="http://p2.music.126.net/pYP1qp9KqOb1jlVSG8FUqA==/18188121346723724.jpg" alt="songimg"/>
                </div>
                <div className="song_name">
                    周杰伦-回到过去
                </div>
            </div>
            <div className="play">
                <div className="play_btn">
                    <div className="circle">
                        <Circle progress="20" stroke="black"/>
                    </div>
                    <i className="iconfont icon-zanting"></i>
                    {/* play */}
                </div>
                <div className="play_list">
                    <i className="iconfont icon-music5yinle"></i>
                </div>
            </div>
        </MiniPlayerBox>
    )
} 

export default MiniPlayer