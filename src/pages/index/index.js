import React, {useEffect, useState} from 'react';
import { renderRoutes } from 'react-router-config';
import Slider from '@/components/swiper/index';
import SearchBar from '@/components/search_bar';
import IndexMenu from '@/components/index_menu';
import SongList from '@/components/song_list';
import TopSongList from '@/components/topsong_list'
import Axios from 'axios'
function Index(props){
    const [bannerList, setBannerList] = useState([])
    const [newSongList, setNewSongList] = useState([])
    const [topSongList, setTopSongList] = useState([])
    const { route } = props;
    useEffect(() => {
      const getFetchData = async () => {
        const res = await Axios.get('http://10.66.51.134:4000/banner?type=2')
        setBannerList(res.data.banners)
      }
      
      const getSongList = async ()=> {
        const res = await Axios.get('http://10.66.51.134:4000/personalized?limit=8')
        setNewSongList(res.data.result)
      }

      const getTopSongList = async ()=> {
        const res = await Axios.get('http://10.66.51.134:4000/top/song?type=0')
        setTopSongList(res.data.data.splice(0, 4))
      }

      !bannerList.length && getFetchData()
      !newSongList.length && getSongList()
      !topSongList.length && getTopSongList()
    }, [])
    return (
      <div>
        <Slider bannerList={bannerList}></Slider>
        <SearchBar keywords="搜索"></SearchBar>
        <IndexMenu></IndexMenu>
        <SongList newSongList={newSongList}></SongList>
        <TopSongList list={topSongList}></TopSongList>
        {/* <div>
          <span className="iconfont menu" onClick={() => alert('用户中心正在开发中，敬请期待:)')}>&#xe65c;</span>
          <span className="title">云音悦</span>
          <span className="iconfont search" onClick={() => props.history.push('/search')}>&#xe62b;</span>
        </div>
        <div>
          <NavLink to="/recommend" activeClassName="selected"><span>推荐</span><i className="iconfont icon-icon-9"></i></NavLink>
          <NavLink to="/singers" activeClassName="selected"><span>歌手</span>&#xe65a;</NavLink>
          <NavLink to="/rank" activeClassName="selected"><span className="iconfont icon-icon-5">排行榜</span></NavLink>
        </div> */}
        { renderRoutes(route.routes) }
      </div>
    );
}
 
export default Index;