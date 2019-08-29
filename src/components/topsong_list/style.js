import styled from 'styled-components';
import globalStyle from '../../assets/style/globalStyle'
export const ListWrap = styled.div`
    margin-top:.8rem;
    height: auto;
    width: 100%;
    font-size: .42rem;
`
export const List = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
    flex: 1;
    /* margin-top: .38rem; */
`
export const Item = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    width: 100%;
    box-sizing: border-box;
    padding:.2rem 0 .2rem .2rem;
    .song_pic{
        display: flex;
        justify-content: center;
        align-items:center;
        line-height: normal;
        width: 1.2rem;
        height: 1.2rem;
        
        img{
            width: 100%;
            height: auto;
            display: block;
        }
    }
    .song_desc{
        border-bottom: .01rem solid rgba(255,255,255,.8);
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-direction: column;
        font-size: .28rem;
        flex: 1;
        position: relative;
        margin-left: .2rem;
        padding-right: 1rem;
        line-height: 1;
        height: 1.2rem;
    }
    .song_name{
        font-size: .32rem;
        box-sizing: border-box;
        color: #fff;
        overflow: hidden;
        /* margin-bottom: ; */
        ${globalStyle.ellipsis(1)}
    }
    .song_singer{
        margin-bottom: .1rem;
        margin-top: .2rem;
        ${globalStyle.ellipsis(1)}
    }
    .song_play{
        position: absolute;
        top: 50%;
        transform: translate(0, -50%);
        right: .2rem;
        font-size: .62rem;
    }
`