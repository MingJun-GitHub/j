// import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react'
import React from 'react'
import MiniPlayer from './miniPlayer'
import PlayerList from './playerList'

const Player = (props) => {
    return(
        <div>
            <MiniPlayer></MiniPlayer>
            <PlayerList></PlayerList>
        </div>
    )
}

export default Player