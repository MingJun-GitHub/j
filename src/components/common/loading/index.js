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
    background-color: transparent;
    color: #fff;
    font-size: .36rem;
    padding: .3rem;
    line-height: normal;
    color: #999;
    img{
        height: .5rem;
        margin-right: .2rem;
    }
`

const Loading = (props) => {
    const loadingArr = [loadingImg, loadingImg2, loadingImg3]
    const {
        style
    } = props
    return (
        <LoadingBox>
            <img src={loadingArr[style]} alt="loading" />{props.children}
        </LoadingBox>
    )
}

Loading.defaultProps = {
    style: 0 // 风格1， 2
}

export default withRouter(memo(Loading))
