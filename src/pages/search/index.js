import React, {useEffect, useState, useRef} from 'react';
import {SearchPage, SearchBar, SearchHot, SearchHistory, SearchSuggest, SearchResult, SearchMask} from './style';
import axios from '@/utils/axios';
import debounce from '@/utils/debounce';
const Search = (props) => {
    const [keywords, setKeywords] = useState('');
    const [hotKeyList, setHotKeyList] = useState([]);
    const [historyKeyList, setHistoryKeyList] = useState([]);
    const [showSuggest, setShowSuggest] = useState(false);
    const [suggestList, setSuggestList] = useState([]);
    const [searchResult, setSearchResult] = useState(null);
    const [showHotKeys, setShowHotKeys] = useState(true);
    const [songList, setSongList] = useState([]);
    const [showMask, setShowMask] = useState(false);
    const searchPage = useRef(null);
    let searchkey = ''
    let params = {
        limit: 20,
        offset: 0,
        loading: false,
        isend: false
    }
    
    useEffect(() =>{
        !hotKeyList.length && getHotKeyList();
        !historyKeyList.length && getHistoryKey();
        if (keywords==='') {
            setShowSuggest(false);
            setSearchResult(null);
            setShowHotKeys(true);
        }
        // 滚动加载
        window.addEventListener('scroll', () => {
            // params.isend
            const documentTop = document.body.scrollTop || document.documentElement.scrollTop
            const windowHeight = document.documentElement.clientHeight || document.body
                .clientHeight
            // const scrollHeight = document.body.scrollHeight || document.documentElement
            //     .scrollHeight
            if (documentTop + windowHeight >= document.body.offsetHeight - 50) {
                console.log('滚动了===>')
            }
        })
        /*
        return () => {
            window.removeEventListener('scroll')
        }
        */
    }, [keywords])

    const getHotKeyList = async () => {
        const res = await axios.get('/search/hot')
        setHotKeyList(res.result.hots)
    }

    const getHistoryKey = () => {
        let arr = localStorage.getItem('historyKey')
        arr && setHistoryKeyList(JSON.parse(arr)); 
    }

    const goBack = () => {
        document.referrer ? props.history.goBack() : props.history.push('/')
    }

    const initParams = () => {
        params = Object.assign(params, {
            offset: 0,
            loading: 0,
            isend: false
        })
    }
    
    const bySearch = async () => {
        initParams(); // 重置一下
        if (!searchkey) {
            setShowHotKeys(true);
            return
        } else {
            let arr = Array.from(new Set([searchkey].concat(historyKeyList).splice(0, 5)));
            setHistoryKeyList(arr);
            localStorage.setItem('historyKey', JSON.stringify(arr));
            searchMultimatch(searchkey);
            setShowHotKeys(false);
        }
    }
    const bySearch2 = (keyword) => {
        searchkey = keyword;
        setKeywords(keyword);
        bySearch();
        closeMask();
    }

    const searchMultimatch = async (keywords) => {
        const res = await axios.get(`/search/multimatch?keywords=${keywords}`)
        const {
            limit,
            offset
        } = params
        const song = await axios.get(`/search/keywords`, {
            params: {
                limit,
                offset,
                keywords 
            }
        })
        setSearchResult(res.result);
        setSongList(songList.concat(song.result.songs));
        params = Object.assign({offset: offset+1, isend: false, loading: false});
        // console.log('songData', params)
    }

    const deleteHistoryKey = (index, e) => {
        e.stopPropagation()
        let arr = historyKeyList.splice(index+1);
        setHistoryKeyList(arr);
        localStorage.setItem('historyKey', JSON.stringify(arr));
    }

    const getSuggestBywords = async (e) => {
        setShowMask(true);
        let keywords = searchkey = e.target.value;
        setKeywords(e.target.value)
        setShowSuggest(!!keywords);
        !!!keywords && setSuggestList([]);
        if (keywords) {
            debounce(async ()=> {
                const res = await axios.get(`/search/suggest?keywords=${keywords}&type=mobile`)
                res.result && setSuggestList(res.result.allMatch || []);
                // console.log('搜索意见====》', res)
            }, 1000)();
        }
    }

    const closeMask = () => {
        setShowMask(false);
        setShowSuggest(false);
    }

    // onBlur={() => setTimeout(()=> setShowSuggest(false), 800) }
    // ref="searchPage" onClick={setSuggestDom}
    return(
        <SearchPage ref={searchPage}>
            <SearchBar>
                <i className="iconfont icon-icon-224 search_back" onClick={goBack}></i>
                <div className="search_topbox" >
                    <i className="serach_icon iconfont icon-icon-3"></i>
                    <input type="text" defaultValue={keywords} placeholder="搜索歌曲、歌手、专辑" onInput={e => getSuggestBywords(e)} onFocus={e=> getSuggestBywords(e)}  maxLength="50"/>
                    {/* { keywords && <i className="search_clear iconfont icon-icon-189" onClick={() => setKeywords('')}></i>} */}
                    <div className="search_btnbox">
                        <button className="search_btn_clear" onClick={() => setKeywords('')}>清除</button>
                        <button className="search_btn" onClick={bySearch}>搜索</button>
                    </div> 
                </div>
                {/* {
                   !keywords && <button className="search_btn_cancel" onClick={goBack}>取消</button>
                } */}
            </SearchBar>
            {
              showSuggest && <SearchSuggest>
                    <div className="keywords" id="search_suggest">你当前搜索“<span>{keywords}</span>”</div>
                    <ul>
                        {
                            suggestList.map((item,index) => {
                                return <li key={index} onClick={()=>bySearch2(item.keyword)}>{item.keyword}</li>
                            })
                        }
                    </ul>
                </SearchSuggest>
            }
            {
                showMask && <SearchMask onClick={closeMask} />
            }
            { showHotKeys && hotKeyList.length > 0 &&  <SearchHot>
                <h4><i className="iconfont icon-icon-172"></i>热门搜索</h4>
                <ul>
                    {
                        hotKeyList.map((item,index) => {
                            return <li key={index} onClick={() => bySearch2(item.first)}>{item.first}</li>
                        })
                    }
                </ul>
            </SearchHot>
            }
            { showHotKeys && historyKeyList.length > 0 && <SearchHistory>
                <div className="title">
                    <span><i className="iconfont icon-icon-33"></i>搜索历史</span>
                    {/** 
                    <div className="search_history_paging">
                        <i className="iconfont icon-icon-167"></i>
                        <i className="iconfont icon-icon-170"></i>
                    </div>
                    */}
                </div>
                <ul>
                    {
                        historyKeyList.map((item,index) => {
                            return <li key={index} onClick={() => bySearch2(item)}>{item} <i onClick={(e) => deleteHistoryKey(index, e)} className="iconfont icon-icon-17"></i></li>
                        })
                    }
                </ul>
            </SearchHistory>}
            { searchResult && <SearchResult>
                    <div className="title"><i className="iconfont icon-icon-185"></i>匹配结果</div>
                    {
                        searchResult.artist && searchResult.artist.length > 0  &&  searchResult.artist.map((item, index)=> {
                            return <div className="artist" key={index} onClick={ () => props.history.push(`/artist/${item.id}`)}>
                                    <div className="artist_pic">
                                        <img src={item.img1v1Url || item.picUrl} alt={item.name} />
                                    </div>
                                    <div className="artist_info">
                                        <span>歌手： {item.name}</span>
                                        <i className="iconfont icon-icon-10"></i>
                                    </div>
                                </div>
                        })
                    }
                    {
                        searchResult.mv && searchResult.mv.length > 0 && searchResult.mv.map((item,index) => {
                            return  <div className="mv" key={index}>
                                <div className="mv_pic">
                                    <div className="tag">MV</div>
                                        <img src={item.cover} alt="mv_pic"/>
                                        <i className="iconfont icon-icon-174"></i>
                                    </div>
                                    <div className="mv_info">
                                        <div className="mv_info_name">MV： {item.name}-{item.artistName}</div>
                                        <div className="mv_info_briefdesc">{item.briefDesc}</div>
                                    </div>
                            </div>
                        })
                    }
                    {
                    
                        songList && songList.length > 0 &&  <div className="song">
                            <ul>
                                {
                                   songList.map((item,index) => {
                                       return  <li key={index} onClick={() => props.history.push(`/song/${item.id}`)}>
                                                <div className="song_name">{item.name}</div>
                                                <div className="song_info">{item.album.name}-{item.artists[0].name}</div>
                                            </li>
                                   }) 
                                }
                            </ul>
                        </div>
                    }
                    {/* <div className="songlist"></div> */}
                    {/* <div className="empty"></div> */}
                </SearchResult>
            }
        </SearchPage>
       
    )
}
export default Search;
