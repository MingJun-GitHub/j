import React, {useState, useEffect, useRef} from 'react'
import axios from '@/utils/axios';
import {SongPage, SongTitle, LikeSongList} from './sytle';
const Song = (props) => {
    const id = props.match.params.id;

    const [songDetail, setSongDetail] = useState(null);
    const [lyric, setLyric] = useState([]);
    const [songUrl, setSongUrl] = useState(null);
    const [lyricIndex, setLyricIndex] = useState(0);
    const [likeSongList, setLikeSongList] = useState([]);
    const audioDom = useRef(null);
    const lyricBox = useRef(null);

    let timer = null; // 定时器
    let topHeight = 0;
    let curIndex = 0;

    useEffect(() => {
        !songDetail && init();
        if (lyric && lyricIndex > 0) {
            document.title = lyric[lyricIndex].content;
        }
    }, [songDetail, lyricIndex, lyric]);

    async function init() {
        !songDetail && await getSongDetail();
        !lyric.length && await getLyric();
        !songUrl && await getSongUrl();
        !likeSongList.length && await getLikeSong();
    }
    async function getSongDetail() {
        const res = await axios.get('/song/detail', {
            params: {
                ids: id
            }
        })
        setSongDetail(res.songs[0])
        return () => {
            clearInterval(timer);
        }
    }

    async function getLyric() {
        const res = await axios.get('/lyric', {
            params: {
                id
            }
        })
        let lyricArr = res.lrc.lyric.split('\n').filter((val) => {
            return !(!val || val === '');
        })
        let lyricList = [];
        const timeReg = /\[\d{2}:\d{2}\.\d{2}\d?\]/ig;
        lyricArr.map(item => {
            let time = item.match(/\[\d{2}:\d{2}\.\d{2}\d?\]/ig);
            // var lyricitem = item.split(']')[1].replace(/^\s/, '') || '';
            const content = item.replace(timeReg, '').replace(/^\s/, '');
            if (time) {
                // time = time[0].replace(/(\[|\]|\:|\.)/ig, '').substring(0, 6).replace(/^0+/, '') || '0';
                time = time[0].slice(1, -1).split(':');
                time = parseInt(time[0], 10) * 60 + parseFloat(time[1]);
                content && lyricList.push({
                    time,
                    content
                })
            }
        })
        console.log('lyricList===>', lyricList)
        setLyric(lyricList);
    }

    async function getSongUrl() {
        const res = await axios.get('/song/url', {
            params: {
                id
            }
        });
        setSongUrl(res.data[0].url);
    }

    const downLoadSong = () => {
        songUrl && window.open(songUrl)
    }

    const playMusic = () => {
        let audio = audioDom.current
        if (audio.paused) {
            audio.play();
            toPlayMusic();
        } else {
            clearInterval(timer);
            audio.pause();
        }
    }
    const toPlayMusic = () => {
        timer = setInterval(() => {
            let curTime = audioDom.current.currentTime
            for (let i = 0; i < lyric.length; i++) {
                if ((curTime > lyric[i].time) && (curTime < lyric[i+1].time)) { 
                    if (curIndex!==i) {

                        topHeight += lyricBox.current.children[0].children[i].offsetHeight;
                        lyricBox.current.scrollTop = 0;
                        curIndex++;
                        lyricBox.current.children[0].style.webkitTransform=`translate(0px,${-topHeight}px)`;
                        setLyricIndex(curIndex);
                    }
                    break;
                }
            }
        }, 100)
    }

    async function getLikeSong() {
        const res = await axios.get('/simi/song', {
            params: {
                id
            }
        });
        setLikeSongList(res.songs);
        // console.log('相似歌曲===》', res);
    }

    async function getLikeAblumList() {
        const res = await axios.get('/simi/playlist', {
            params: {
                id
            }
        });
        console.log('相似歌单===》', res);
    }

    async function getLikeMV() {
        const res = await axios.get('/simi/mv', {
            params: {
                id
            }
        });
        console.log('相似MV===》', res);
    }
    async function getCommentList() {
        const res = await axios.get('/comment/music?limit=1', {
            params: {
                id
            }
        });
        console.log('res=>',res);
    }    
    return(
        songDetail && <SongPage bgurl={songDetail.al.picUrl}>
            <div className="song_topbox">
                <div className="song_name">{songDetail.name}</div>
                <div className="song_singer">{songDetail.ar[0].name}</div>
                <div className="song_ablum"><img src={songDetail.al.picUrl} alt={songDetail.name} /></div>
                {
                    lyric && lyric.length > 0 && <div className="song_lyric" ref={lyricBox}>
                        <ul>
                            {
                                lyric.length > 0 &&  lyric.map((item,index) => {
                                    return <li className={index===lyricIndex?'active':''} key={index}>{item.content}</li>
                                })   
                            }
                        </ul>
                    </div>  
                }
                <div className="song_playtools">
                    {
                        songDetail.mv > 0 && <i className="iconfont icon-icon-172" onClick={() => props.history.push(`/mv/${songDetail.mv}`)}></i>
                    }
                    <i className="iconfont icon-icon-174" onClick={() => playMusic()}></i>
                </div>
                <div className="song_download" onClick={()=> downLoadSong()}>下载歌曲</div>
                <audio ref={audioDom} style={{ display: 'none' }} src={songUrl} preload="metadata" controls />
            </div>
            <div className="song_main">
                <SongTitle>喜欢这首歌的人也听</SongTitle>
                <LikeSongList>
                    
                </LikeSongList>
                <SongTitle>包含这首歌的歌单</SongTitle>
                <SongTitle>精彩评论</SongTitle>
            </div>
        </SongPage>
    )
}

export default Song;
