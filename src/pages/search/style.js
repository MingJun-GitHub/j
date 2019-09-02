import styled from 'styled-components'

export const SearchPage = styled.div `
    width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
    overflow-x: hidden;
    min-height:100vh;
`
export const SearchBar = styled.div `
    box-sizing: border-box;
    padding:.3rem 0rem .3rem .2rem;
    height: auto;
    display: flex;
    border-bottom: .02rem solid rgba(255,255,255, .2);
    font-size: .4rem;
    position: relative;
    align-items: center;
    .search_back{
            padding: 0 .2rem;
        }
    .search_topbox{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 1rem;
        background-color: rgba(255,255,255, .3);
        border-radius: .55rem;
        padding:0 .2rem;
        flex: 1;
        transition: all .3s ease-in-out;
        i.serach_icon {
            font-size: .5rem;
        }
        i.search_clear{
            font-size: .5rem;
            margin-right: .1rem;
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
            border-radius: 0 .42rem .42rem 0;
            font-size: .40rem;
            padding: 0 .2rem;
            background-color:rgba(0, 0, 0, .7);
            &_clear{
                height: .84rem;
                background-color: rgba(255,255,255, .5);
                padding: 0 .2rem;
                border-radius: .42rem 0 0 .42rem;
            }
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
    z-index: 100;
    max-height: 5rem;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
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
    .title{
        width: 100%;
        height: auto;
        font-size: .42rem;
        padding: 0 .2rem;
        margin-top: .5rem;
        i{
            margin-right: .05rem;
        }
    }
    .artist{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: .4rem;
        box-sizing: border-box;
        margin: .3rem .2rem 0 .2rem;
        /* margin-top: .3rem; */
        background-color: rgba(255,255,255, .05);
        &_pic{
            width: 2rem;
            height: 2rem;
            img{
                width: 100%;
                height: 100%;
                border-radius: .04rem;
            }
        }
        &_info{
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex: 1;
            padding-left: .2rem;
            padding-right: .2rem;
        }
    }
    .mv{
        margin:.3rem .2rem;
        &_pic{
            position: relative;
            border-radius: .04rem;
            overflow: hidden;
            width: 100%;
            height: auto;
            line-height: 0;
            &::after{
                position:absolute;
                background-color: rgba(0,0,0, .3);
                content: '';
                display: block;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
            }
            img{
                width: 100%;
                height: auto;
            }
            i{
               position:absolute;
               top: 50%;
               left: 50%;
               transform: translate(-50%, -50%);
               z-index: 3;
               font-size: 1.2rem;
            }
        }
        &_info{
            font-size:.42rem;
            background-color: rgba(255,255,255, .05);
            line-height: 1.4;
            padding: .1rem  .2rem;
            &_briefdesc {
                font-size: .38rem;
            }
        }
    }
    .song{        
        li{
            background-color: rgba(255,255,255, .05);
            border-radius: .04rem;
            font-size: .42rem;
            margin: .3rem .2rem 0;
            padding: .2rem;
            line-height: 1.3;
        }
        &_name{}
        &_info{
            font-size: .38rem;
            color: #999;
        }
    }
`

export const SearchMask  = styled.div`
    position: fixed;
    height: 100%;
    width:100vw;
    background-color:rgba(0,0,0,.75);
    z-index: 10;
`