import React, {memo} from 'react'
import {SearchBox, Icon} from './style'
const  SearchBar = (props) => {
    const goSearch = () => {
        props.history.push('/search')
    }
    return(
        <SearchBox onClick={goSearch}>
            <Icon className='iconfont icon-icon-136' />{props.keywords}
        </SearchBox>
    )
}

SearchBar.defaultProps = {
    keywords: '搜索'
}
export default memo(SearchBar)
