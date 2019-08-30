import React, {memo} from 'react';
import {SearchBox, Icon} from './style';
import {withRouter} from 'react-router-dom';
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
export default withRouter(memo(SearchBar));
