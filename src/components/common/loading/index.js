import React, {memo} from 'react'
import {withRouter} from 'react-router-dom'
import styled from 'styled-components'
import loadingImg from './images/bars.svg'
import loadingImg2 from './images/oval.svg'
import loadingImg3 from './images/tail-spin.svg'
const LoadingBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #2a2a2a;
    color: #fff;
    font-size: .42rem;
    padding: .3rem;
    line-height: normal;
    img{
        height: .5rem;
        margin-right: .2rem;
    }
`

const Loading = (props) => {
    const loadingArr = [loadingImg, loadingImg2, loadingImg3]
    const {
        title,
        style
    } = props
    return (
        <LoadingBox>
            <img src={loadingArr[style]} alt="loading" />{title}
        </LoadingBox>
    )
}

Loading.defaultProps = {
    title: '加载中...',
    style: 0 // 风格1， 2
}

export default withRouter(memo(Loading))
