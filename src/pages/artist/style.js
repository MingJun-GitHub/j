import styled from 'styled-components';
import globalStyle from '@/assets/style/globalStyle';
export const ArtistPage = styled.div `
    width: 100%;
    height: auto;
    padding-top: .7rem;
    font-size: .42rem;
    .artist{
        &_title{
            color: #999;
            font-size: .36rem;
            background-color:rgba(255,255,255,.007);
            margin-top: .5rem;
            padding: .2rem;
        }
        &_ablum{
        width: 5.2rem;
        height: 5.2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        overflow: hidden;
        margin: 0 auto;
        box-shadow: 0rem 0rem .5rem .06rem rgba(0,0,0,.2);
            img{
                max-width: 100%;
                height: auto;
                display: block;
            }
        }
        &_singer{
            text-align: center;
            padding: .3rem 0;
        }
        &_briefdesc {
            font-size: .36rem;
            padding:0 .6rem;
            ${globalStyle.ellipsis(1)};
        }
        &_play{
            width: 4.8rem;
            height: 1rem;
            background-color: rgba(250, 95, 47, 1);
            display: flex;
            justify-content: center;
            align-items: center;
            margin: .3rem auto 0rem;
            border-radius: .5rem;
            box-shadow: 0 6px 32px rgba(250, 95, 47,.5);
            i{
                font-size: .72rem;
            }
        }
        &_songlist{
            width: 100%;
            height: auto;
            color: #999;
            line-height: 1;
            .more{
                text-align: center;
                margin: .32rem auto 0;
                font-size: .36rem;
            }
            li {
                width: 100%;
                height: 1.2rem;
                background-color:rgba(255,255,255,.007);
                display: flex;
                justify-content: flex-start;
                align-items: center;
                height: 1.2rem;
                line-height: 1;
                &:last-child{
                    .song_info{
                        border: none;
                    }
                }
                .song{
                    &_index{
                        width: 1rem;
                        height: 1.2rem;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: .48rem;
                    }
                    &_info{
                        display: flex;
                        flex: 1;
                        height: 1.2rem;
                        justify-content: space-between;
                        align-items: center;
                        border-bottom: .02rem solid rgba(0,0,0,.3);
                    }
                    &_name{
                        font-size: .42rem;
                        color: #efefef;
                    }
                    &_album {
                        font-size: .36rem;
                        margin-top: .2rem;
                        ${globalStyle.ellipsis(1)};
                    }
                    &_play {
                        font-size: .5rem;
                        width: 1rem;
                        height: 1.3rem;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                }
            }
        }
        &_hotsalbum {
            width: 100%;
            height: auto;
            ul {
                width: 100%;
                height: auto;
                display: block;
                overflow-x: auto;
                overflow-y: hidden;
                -webkit-overflow-scrolling: touch;
                display: flex;
                flex-wrap: nowrap;
            }
            li {
                display: flex;
                flex-direction: column;
                width: 3.2rem;
                line-height: 1.2; 
                margin-left: .2rem; 
                margin-right: .1rem;
                background-color:rgba(255,255,255,.007);
                &:last-child{
                    margin-right: 0;
                }
            }
            .ablum_pic{
                width: 3.2rem;
                height: 3.2rem;
                border-radius: .04rem;
                display: flex;
                justify-content: center;
                align-items: center;
                overflow:hidden;
                img{
                    width: 100%;
                    height: auto;
                }
            }
            .ablum_info{
                padding: .2rem .2rem 0;
                font-size: .36rem;
                color: #999;
                p:first-child{
                    margin-bottom: .1rem;
                    color:#fff;
                    font-size: .42rem;
                    ${globalStyle.ellipsis(1)};
                }
            }
        }
        &_mv{
            width: 100%;
            height: auto;
            ul {
                width: 100%;
                height: auto;
                display: block;
                overflow-x: auto;
                overflow-y: hidden;
                -webkit-overflow-scrolling: touch;
                display: flex;
                flex-wrap: nowrap;
            }
            li{
                display: flex;
                width: 5.8rem;
                margin-left: .2rem;
                margin-right: .1rem;
                flex-direction: column;
                &:last-child{
                    margin-right: none;
                }
            } 
            .mv_pic{
                width: 5.8rem;
                height: auto;
                border-radius: .04rem;
                overflow:hidden;
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
                img{
                    width: 100%;
                    height: auto;
                }
            }
            .mv_playcount{
                position: absolute;
                bottom: 0;
                right: 0;
                font-size: .36rem;
                background-color: rgba(0,0,0,.3);
                color: #fff;
                padding: .08rem .2rem;
                border-radius: .2rem 0 0 0;
                line-height: 1;
            }
            .mv_name{
                color: #999;
                font-size: .36rem;
                width: 5.8rem;
                ${globalStyle.ellipsis(2)};
                padding: .2rem .2rem 0;
                line-height: normal;
            }
        }
    }
`