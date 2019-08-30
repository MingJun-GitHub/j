import React, { memo } from 'react';
import {withRouter} from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import IndexTitle from '@/components/index_title';
import {ListWrap, List, Item} from './style';
import LoadingImg from '@/components/loading_img';
const SongList = (props) => {
        const { list, title }  = props

        return (
            <ListWrap>   
                <IndexTitle title={title}></IndexTitle>
                {
                    list.length > 0 && <List>
                        {
                            list.map(item => {
                                return <Item key={item.id}>
                                    {/* <LazyLoad placeholder={<LoadingImg />}><img src={item.picUrl} alt={item.name} /></LazyLoad> */}
                                <div className="song_pic">
                                    <LazyLoad placeholder={<LoadingImg />}>
                                        <img src={item.album.blurPicUrl} alt={item.name} />
                                    </LazyLoad>
                                </div>
                                <div className="song_desc">
                                    <div className="song_name">{item.name}</div>
                                    <div className="song_singer">{item.artists[0].name}</div>
                                    <div className="iconfont icon-icon-174 song_play"></div>
                                </div>
                            </Item>
                            })
                        }
                    </List>
                }
            </ListWrap>
        )
}
SongList.defaultProps = {
    title: '新歌速递',
    list: []
}
export default withRouter(memo(SongList))