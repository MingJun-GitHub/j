import React, {useEffect, useState} from 'react';
import axios from '@/utils/axios';
import {ArtistPage} from './style'
const Artist = (props) => {
    // console.log('props==>', props)
    const id = props.match.params.id || ''

    const [artistData, setArtistData] = useState(null);
    const [lookMore, setLookMore] = useState(true);
    const [hotSongs, setHotSongs] = useState([]);
    const [albumList, setAlbumList] = useState([]);
    const [mvList, setMvList] = useState([]);

    useEffect(() => {
        (!artistData && id) && getArtistDetails();
        (!albumList.length && id) && getArtistAlbum();
        (!mvList.length && id) && getMvList();
        if (hotSongs.length) {
            setHotSongs(lookMore?artistData.hotSongs.slice(0, 5):artistData.hotSongs);
        }
        // eslint-disable-next-line
    }, [lookMore]);

    const getArtistDetails = async () => {
        const res = await axios.get('/artists', {
            params: {
                id
            }
        });
        setArtistData(res);
        setHotSongs(res.hotSongs.slice(0, 5));
    }

    const getArtistAlbum = async () => {
        const res = await axios.get('/artist/album', {
            params: {
                id,
                limit: 5
            }
        });
        setAlbumList(res.hotAlbums)
    }

    const getMvList = async () => {
        const res = await axios.get('/artist/mv', {
            params: {
                id,
                limit: 5
            }
        })
        setMvList(res.mvs)
        console.log('MV-->List', res)
    }
    return(
        artistData && <ArtistPage>
            <div className="artist_ablum">
                <img src={artistData.artist.img1v1Url || artistData.artist.picUrl} alt="加载中..."/>
            </div>
            <div className="artist_singer">{artistData.artist.name}</div>
            <div className="artist_briefdesc">{artistData.artist.briefDesc}</div>
            <div className="artist_play"><i className="iconfont icon-icon-174"></i></div>
            <div className="artist_title">热门单曲</div>
            <div className="artist_songlist">    
                <ul>
                    {
                       hotSongs && hotSongs.length > 0 && hotSongs.map((item,index) =>　{
                           return <li key={index} onClick={() => props.history.push(`/song/${item.id}`)}>
                                <div className="song_index">{index+1}</div>
                                <div className="song_info">
                                    <div className="song_info_left">
                                        <div className="song_name">{item.name}</div>
                                        <div className="song_album">{item.ar[0].name || item.ar[0].alia[0]}-{item.al.name}</div>
                                    </div>
                                    <div className="song_play">
                                        <i className="iconfont icon-icon-174"></i>
                                    </div>
                                </div>
                            </li>
                       })
                    }
                </ul>
                <div className="more" onClick={() => setLookMore(!lookMore)}>{lookMore?'查看更多': '收起'}</div>
            </div>
            <div className="artist_title">最新专辑</div>
            <div className="artist_hotsalbum">
                <ul>
                    {
                        albumList && albumList.length > 0 && albumList.map((item, index) => {
                            return <li key={index}>
                                <div className="ablum_pic">
                                    <img src={item.picUrl || item.blurPicUrl} alt={item.name} />
                                </div>
                                <div className="ablum_info">
                                    <p>{item.name}</p>
                                    <p>{new Date(item.publishTime).toLocaleDateString()}</p>
                                </div>
                            </li>
                        })
                    }
                </ul>
            </div>
            <div className="artist_title">最新MV</div>
            <div className="artist_mv">
                <ul>
                    {
                        mvList && mvList.length > 0 && mvList.map((item, index) => {
                            return <li key={index}>
                                <div className="mv_pic">
                                    <img src={item.imgurl || item.imgurl16v9} alt={item.name} />
                                    <div className="mv_playcount"><i className="iconfont icon-icon-174"></i>{(item.playCount / 10000).toFixed(1)}万</div>
                                </div>
                                <div className="mv_name">
                                   {item.name}
                                </div>
                            </li>
                        })
                    }
                </ul>
            </div>
        </ArtistPage>
    )
}

export default Artist;

