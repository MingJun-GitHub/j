import React, {memo} from 'react'
import {Link} from 'react-router-dom'
import {MenuBar} from './style'
import {withRouter} from 'react-router-dom'
const IndexMenu = () => {
    return (
        <MenuBar>
            <ul>
                <li>
                    <Link to='/search'>
                        <i className='iconfont icon-icon-200'></i>
                        <p className='title'>今日歌单</p>
                    </Link> 
                </li>
                <li>
                    <Link to='/search'>
                        <i className='iconfont icon-icon-201'></i>
                        <p className='title'>新碟上架</p>
                    </Link> 
                </li>
                <li>
                    <Link to='/search'>
                        <i className='iconfont icon-icon-202'></i>
                        <p className='title'>排行榜</p>
                    </Link> 
                </li>
                <li>
                    <Link to='/search'>
                        <i className='iconfont icon-icon-203'></i>
                        <p className='title'>热门电台</p>
                    </Link> 
                </li>
                <li>
                    <Link to='/search'>
                        <i className='iconfont icon-icon-204'></i>
                        <p className='title'>独家放送</p>
                    </Link> 
                </li>
            </ul>
        </MenuBar>
    )
}
export default withRouter(memo(IndexMenu));