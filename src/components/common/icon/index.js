import React, {memo} from 'react'
import {withRouter} from 'react-router-dom'
import styled from 'styled-components'

const I = styled.i`
    display: inline-flex;
    line-height: normal;
    background-color: transparent;
    font-size: ${props => props.fontSize / 100 + 'rem'};
    color: ${props => props.color};
`

const T = styled.div`
   display: inline-flex;
   justify-content: center;
   align-items: center;
   background: transparent;
   line-height: normal;
   font-size: ${props => props.fontSize / 100 + 'rem'};
   color: ${props => props.color};
   span{
       margin-left: .05rem;
   }
`

const Icon = (props) => {
    return (
        props.children ? <T>
            <I className={"iconfont icon-icon-"+props.index} {...props}></I><span>{props.children}</span>
        </T> : <I className={"iconfont icon-icon-"+props.index} {...props}></I>
    )
}

Icon.defaultProps = {
    index: 3,          // 序列号
    color: '#ffffff',
    fontSize: 36,
    // title: ''
}

export default withRouter(memo(Icon))
