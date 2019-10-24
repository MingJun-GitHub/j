// import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react'
import React, {useState} from 'react'
import MiniPlayer from './miniPlayer'
import PlayerList from './playerList'
import MainPlayer from './mainPlayer'


const Player = (props) => {
    const [showPlayList, setShowPlayList] = useState(false)
    
    const [showMainPlayer, setShowMainPlayer] = useState(false)

    const changePlayList = (e) => {
        console.log('e===>', showPlayList)
        setShowPlayList(!showPlayList)
    }
    
    const changeMainPlayer = (e) => {
        console.log('e--->', showMainPlayer)
        setShowMainPlayer(!showMainPlayer)
    }

    return(
        <div>
            <MiniPlayer showPlayList={showPlayList || showMainPlayer} handlePlayList={(e) => {changePlayList(e)}} handleMainPlayer={e =>changeMainPlayer()}></MiniPlayer>
            <PlayerList showPlayList={showPlayList} handlePlayList={(e) => {changePlayList(e)}} ></PlayerList>
            <MainPlayer showMainPlayer={showMainPlayer} handleMainPlayer={e => changeMainPlayer(e)} handlePlayList={(e) => {changePlayList(e)}}></MainPlayer>
        </div>
    )
}

export default Player