import React, {useEffect, useState} from 'react';
import {SearchPage, SearchBar, SearchHot, SearchHistory, SearchSuggest, SearchResult} from './style';
import axios from '@/utils/axios';
import debounce from '@/utils/debounce';
const Search = (props) => {

    const [keywords, setKeywords] = useState(null);
    const [hotKeyList, setHotKeyList] = useState([]);
    const [historyKeyList, setHistoryKeyList] = useState([]);
    const [showSuggest, setShowSuggest] = useState(false);
    const [suggestList, setSuggestList] = useState([]);


    useEffect(() =>{
        !hotKeyList.length && getHotKeyList();
        !historyKeyList.length && getHistoryKey();
    }, [])

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

    const bySearch = async (keywords = keywords) => {
        await searchMultimatch('小幸运')
        return
        if (!keywords) {
            return
        } else {
            let arr = Array.from(new Set([keywords].concat(historyKeyList).splice(0, 5)));
            setHistoryKeyList(arr);
            localStorage.setItem('historyKey', JSON.stringify(arr)); 
             
        }
    }

    const searchMultimatch = async (keywords) => {
        const res = await axios.get(`/search/multimatch?keywords=${keywords}`)
        console.log('返回的结果===>', res.result)
    }

    const deleteHistoryKey = (index) => {
        let arr = historyKeyList.splice(index+1);
        setHistoryKeyList(arr);
        localStorage.setItem('historyKey', JSON.stringify(arr));
    }

    const getSuggestBywords = async (e) => {
        let keywords = e.target.value
        setKeywords(e.target.value)
        setShowSuggest(!!keywords);
        !!!keywords && setSuggestList([]);
        if (keywords) {
            debounce(async ()=> {
                const res = await axios.get(`/search/suggest?keywords=${keywords}&type=mobile`)
                setSuggestList(res.result.allMatch || []);
                console.log('搜索意见====》', res)
            }, 1000)();
        }
    }

    return(
        <SearchPage>
            <SearchBar>
                <div className="search_topbox">
                    <i className="serach_icon iconfont icon-icon-3"></i>
                    <input type="text" placeholder="搜索歌曲、歌手、专辑" onInput={e => getSuggestBywords(e)} onFocus={e=> getSuggestBywords(e)} onBlur={() => setShowSuggest(false)} maxLength="50"/>
                    <button className="search_btn" onClick={bySearch}>搜索</button>
                </div>
                <button className="search_btn_cancel" onClick={goBack}>取消</button>
            </SearchBar>
            {
              showSuggest && <SearchSuggest>
                    <div className="keywords">你当前搜索“<span>{keywords}</span>”</div>
                    <ul>
                        {
                            suggestList.map((item,index) => {
                                return <li key={index} onClick={() => bySearch(item.keyword)}>{item.keyword}</li>
                            })
                        }
                    </ul>
                </SearchSuggest>
            }
            { hotKeyList.length > 0 &&  <SearchHot>
                <h4><i className="iconfont icon-icon-172"></i>热门搜索</h4>
                <ul>
                    {
                        hotKeyList.map((item,index) => {
                            return <li key={index}>{item.first}</li>
                        })
                    }
                </ul>
            </SearchHot>
            }
            { historyKeyList.length > 0 && <SearchHistory>
                <div className="title">
                    <div><i className="iconfont icon-icon-33"></i>搜索历史</div>
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
                            return <li key={index}>{item} <i onClick={() => deleteHistoryKey(index)} className="iconfont icon-icon-17"></i></li>
                        })
                    }
                </ul>
            </SearchHistory>}
            <SearchResult>
                <div className="title">推荐</div>
            </SearchResult>
        </SearchPage>
       
    )
}
export default Search;
