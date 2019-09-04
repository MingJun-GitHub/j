import React, { memo } from 'react';
import {withRouter} from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import {ListWrap, List, Item} from './style';
import LoadingImg from '@/components/loading_img';


const LikeSongList = (props) => {
        const { list }  = props
        const filterCount = (item) => {
            return (item.playCount/10000).toFixed(1) + '万'
        }
        return (
            <ListWrap>   
                {
                    list.length > 0 && <List>
                        {
                            list.map(item => {
                                return <Item key={item.id}>
                                <div className="song_pic">
                                    <LazyLoad placeholder={<LoadingImg />}><img src={item.picUrl} alt={item.name} /></LazyLoad>
                                    <div className="song_count"><i className="iconfont icon-icon-206"></i>{filterCount(item)}</div>
                                </div>
                                <div className="song_desc">
                                 <h3>{item.name}</h3>
                                  <p></p>
                                 </div> 
                                <div className="song_play"><i></i></div>   
                            </Item>
                            })
                        }
                        
                    </List>
                }
            </ListWrap>
        )
}
LikeSongList.defaultProps = {
    list: []
}
export default withRouter(memo(LikeSongList))