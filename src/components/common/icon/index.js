import React, {memo} from 'react'
import {withRouter} from 'react-router-dom'
import styled from 'styled-components'

const I = styled.i`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    line-height: normal;
    background-color: transparent;
    font-size: ${props => props.fontSize / 100 + 'rem'};
    color: ${props => props.color};
    &::before{
        margin-right: .05rem;
    }
`


const Icon = (props) => {
    return (
        <I className={"iconfont icon-icon-"+props.index} {...props}></I>
    )
}

Icon.defaultProps = {
    index: 3,          // 序列号
    color: '#ffffff',
    fontSize: 42,
    // title: ''
}

export default withRouter(memo(Icon))
