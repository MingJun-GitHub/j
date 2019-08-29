import React, { memo } from 'react';
import {BG} from './style'
const LoadingImg = (props) => {
        return (
           <BG style={{backgroundImage: props.url}}></BG> 
        )
}
export default memo(LoadingImg)