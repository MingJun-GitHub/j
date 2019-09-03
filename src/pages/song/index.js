import React, {useState, useEffect} from 'react'
import axios from '@/utils/axios'
import {SongPage} from './sytle';
const Song = (props) => {
    const id = props.match.params.id
    console.log('props==?', props)
    //song/detail?ids=426027293
    const [songDetail, setSongDetail] = useState(null);
    
    useEffect(() => {
        !songDetail && getSongDetail();
    });

    async function getSongDetail() {
        const res = await axios.get('/song/detail', {
            params: {
                ids: id
            }
        })
        setSongDetail(res.songs[0])
    }


    return(
        songDetail && <SongPage bgurl={songDetail.al.picUrl}>
            <div className="song_topbox">
                <div className="song_name">{songDetail.name}</div>
                <div className="song_singer">{songDetail.ar[0].name}</div>
                <div className="song_ablumbox">
                    <div className="song_ablum"><img src={songDetail.al.picUrl} alt={songDetail.name} /></div>
                    <div className="song_lysrc">
                       <ul>
                           <li>haha----</li>
                       </ul>
                    </div>
                </div>
                <div className="song_lyric">查看歌词</div>
                <div className="song_playtools">

                    <i className="iconfont icon-icon-174"></i>
                </div>
                <div className="song_download">下载歌曲</div>
            </div>
        </SongPage>
    )
}

export default Song;
