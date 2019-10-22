// import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react'
import React from 'react'
import MiniPlayer from './miniPlayer'
import PlayerList from './playerList'
import MainPlayer from './mainPlayer'

const Player = (props) => {
    return(
        <div style={{display: 'none'}}>
            <MiniPlayer></MiniPlayer>
            <PlayerList></PlayerList>
            <MainPlayer></MainPlayer>
        </div>
    )
}

export default Player