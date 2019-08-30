import React, { memo } from 'react';
import {withRouter} from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import IndexTitle from '@/components/index_title';
import {ListWrap, List, Item} from './style';
import LoadingImg from '@/components/loading_img';
const SongList = (props) => {
        const { newSongList, title }  = props
        const filterCount = (item) => {
            return (item.playCount/10000).toFixed(1) + '万'
        }
        return (
            <ListWrap>   
                <IndexTitle title={title}></IndexTitle>
                {
                newSongList.length > 0 && <List>
                    {
                        newSongList.map(item => {
                            return <Item key={item.id}>
                            <div className="song_pic">
                                <LazyLoad placeholder={<LoadingImg />}><img src={item.picUrl} alt={item.name} /></LazyLoad>
                                <div className="song_count"><i className="iconfont icon-icon-206"></i>{filterCount(item)}</div>
                            </div>
                            <div className="song_desc">{item.name}</div>   
                        </Item>
                        })
                    }
                    
                </List>
                }
            </ListWrap>
        )
}
SongList.defaultProps = {
    title: '推荐歌单',
    newSongList: []
}
export default withRouter(memo(SongList))