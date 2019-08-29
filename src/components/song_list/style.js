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
    margin-top: .38rem;
`
export const Item = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 3.2rem;
    margin-right: .2rem;
    margin-bottom: .2rem;
    &:nth-child(3n) {
        margin-right: 0;
    }
    .song_pic{
        display: flex;
        justify-content: center;
        align-items:center;
        line-height: normal;
        width: 3.2rem;
        height: 3.2rem;
        position: relative;
        img{
            width: 100%;
            height: auto;
            display: block;
        }
    }
    .song_desc{
        font-size: .32rem;
        line-height: 1.5;
        box-sizing: border-box;
        padding: .1rem;
        color: #fff;
        overflow: hidden;
        ${globalStyle.ellipsis(2)}
    }
    .song_count{
        display: inline-flex;
        align-items:center;
        line-height:normal;
        font-size: .28rem;
        color: #fff;
        position:absolute;
        bottom: .1rem;
        right:.1rem;
        i{
            margin-right: .01rem;
        }
    }
`