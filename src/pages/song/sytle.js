import styled from 'styled-components';

export const SongPage = styled.div`
    display: block;
    width: 100%;
    position: relative;
    &::after{
        position: fixed;
        content: '';
        z-index: 1;
        background-repeat: no-repeat;
        background-position: center;
        background-image: url(${props=> props.bgurl});
        display: block;
        height: 100%;
        width: 10rem;
        top: 0;
        right: 0;
        left: 0;
        margin: 0 auto;
        line-height: 0;
        filter: blur(10px);
    }
    &::before{
        position: fixed;
        content: '';
        z-index: 2;
        background-color: rgba(0,0,0,.5);
        height: 100%;
        width: 10rem;
        top: 0;
        right: 0;
        left: 0;
        margin: 0 auto;
        line-height: 0;
    }
    .song{
        &_topbox{
            width: 100%;
            height: auto;
            width: 10rem;
            z-index: 100;
            position: relative;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-direction: column;
            line-height: 1;
            /* background-color: rgba(0,0,0, .2); */
        }
        &_name{
            font-size: .42rem;
            padding-top: .8rem;
        }
        &_singer{
            color: #cfcfcf;
            font-size: .36rem;
            padding:.4rem;
        }
        &_ablum {
            width: 5.8rem;
            height: 5.8rem;
            background-color: rgba(255,255,255, .1);
            box-shadow: 0 0.05rem 0.2rem rgba(0,0,0,.2);
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            overflow: hidden;
            border-radius: .04rem;
            img{
                width: 100%;
                height: auto;
                display: block;
            }
        }
        &_lyric{
            font-size: .36rem;
            color: #cfcfcf;
            height: 1.82rem;
            overflow-x: hidden;
            overflow-y: auto;
            margin: .6rem 0;
            transition: all .3s ease;
            ul {
                transition: all .3s ease-in-out;
                transform: translateY(0px);
                -webkit-overflow-scrolling : touch;
            }
            li{
                display: flex;
                justify-content: center;
                align-items: center;
                flex-wrap: wrap;
                text-align: center;
                line-height: .6rem;
                padding: 0 .7rem;
                transition: all .3s ease;
                &.active{
                    color: #fff;
                    font-size: .42rem;
                }
            }
        }
        &_playtools{
            i {
                padding: .2rem;
                border-radius: 50%;
                font-size: 1rem;
            }
        }
        &_download{
            width: 5rem;
            height: 1rem;
            background-color: rgba(250, 95, 47, 1);
            display: flex;
            justify-content: center;
            align-items: center;
            margin: .5rem auto 0rem;
            border-radius: .5rem;
            box-shadow: 0 6px 32px rgba(250, 95, 47,.5);
            font-size: .42rem;
        }
    }
    .song_main{
        position: relative;
        z-index: 100;
    }
`

export const SongTitle = styled.div`
    font-size: .36rem;
    color: #cfcfcf;
    text-align: left;
    padding: 0 .2rem;
    margin: .6rem auto;
`

export const LikeSongList = styled.div`
    /* font-size:  */
`