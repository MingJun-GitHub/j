import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import styled from 'styled-components'

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
   background-color: rgba(42,42,42,.9);
   padding: 0 .2rem;
   .song{
       display: flex;
       justify-content: center;
       align-items: center;
       height: 1.2rem;
       &_pic{
           width: 1.0rem;
           height: 1.0rem;
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
           color: #fff;
       }
   }
   .play{
       display: flex;
       justify-content: center;
       align-items: center;
       font-size: .42rem;
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
                <div className="play_btn">播放</div>
                <div className="play_list">列表</div>
            </div>
        </MiniPlayerBox>
    )
} 

export default MiniPlayer