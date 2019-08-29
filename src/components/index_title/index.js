import React, {memo} from 'react';
import { Title, Icon } from './style';
import {withRouter} from 'react-router-dom';
const IndexTitle = (props) => {
    console.log('props', props);
    return (
        <Title>
            {props.title}<Icon className={'iconfont icon-icon-'+ props.iconkey}></Icon>
        </Title>   
    ) 
}

IndexTitle.defaultProps = {
    title: '新歌推荐',
    iconkey: 217
}

export default withRouter(memo(IndexTitle));