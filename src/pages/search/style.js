import styled from 'styled-components'

export const SearchPage = styled.div `
    width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
    overflow-x: hidden;
    position: absolute;
`
export const SearchBar = styled.div `
    box-sizing: border-box;
    padding:.3rem 0rem .3rem .2rem;
    height: auto;
    display: flex;
    border-bottom: .02rem solid rgba(255,255,255, .2);
    font-size: .4rem;
    position: relative;
    .search_topbox{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 1rem;
        background-color: rgba(255,255,255, .3);
        border-radius: .55rem;
        padding:0 .2rem;
        flex: 1;
        
        i.serach_icon {
            font-size: .5rem;
        }
        input{
            color: #fff;
            background-color: transparent;
            font-size: .40rem;
            margin:0 .2rem;
            height: .8rem;
            line-height: normal;
            display: flex;
            flex: 1;
        }
        .search_btn {
            height: .84rem;
            color: #fff;
            border-radius: .42rem;
            width: 2rem;
            font-size: .40rem;
            background-color:rgba(0, 0, 0 ,1)
        }
    }
    .search_btn_cancel{
        color: #fff;
        width: 1.7rem;
    }
`
export const SearchHot = styled.div `
    padding: 0 .2rem;
    h4 {
        font-size: .42rem;
        font-weight: normal;
        padding:.5rem .2rem .3rem 0;
        position: relative;
        i{
            margin-right: .05rem;
        }
    }
    ul{
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
    }
    li {
        background-color: rgba(255,255,255, .4);
        color: #fff;
        display: inline-block;
        font-size: .38rem;
        padding: .02rem .2rem;
        border-radius: .03rem;
        margin-right: .3rem;
        margin-bottom: .3rem;
    }
`

export const SearchHistory = styled.div`
    padding: 0 .2rem;
    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: .42rem;
        font-weight: normal;
        padding:.5rem .2rem .3rem 0;
        position: relative;
        i{
            margin-right: .05rem;
        }
        .search_history_paging{
            display: inline-flex;
            line-height: normal;
            i {
                font-size: .5rem;
                margin-left: .2rem; 
            }
            margin-right: -.2rem;   
        }
    }
    li {
        height: 1.2rem;
        font-size: .38rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: normal;
        border-bottom:  solid;
        border-bottom: .02rem solid rgba(255,255,255, .2);
    }
`

export const SearchSuggest = styled.div`
    position:absolute;
    width: 8rem;
    top: 1.4rem;
    left: 50%;
    transform: translate(-50%, 0);
    background-color:#fff;
    border-radius: .04rem;
    height: auto;
    color: #2a2a2a;
    z-index: 10;
    max-height: 5rem;
    .keywords{
        font-size: .4rem;
        height:.8rem;
        box-sizing:border-box;
        line-height: .8rem;
        padding: 0 .2rem;
        font-weight: 500;
        span{
            color: burlywood;
        }
    }
    li {
        font-size: .36rem;
        color: #666;
        height: .8rem;
        line-height: .8rem;
        padding: 0 .2rem;
        border-bottom: .02rem solid rgba(0,0,0, .1);
        &:last-child{
            border-bottom: none;
        }
    }
`

export const SearchResult = styled.div`
    display: block;
`