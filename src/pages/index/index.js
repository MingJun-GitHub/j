import React, {useEffect, useState} from 'react';
import { renderRoutes } from 'react-router-config';
import Slider from '@/components/swiper/index';
import SearchBar from '@/components/search_bar';
import IndexMenu from '@/components/index_menu';
import SongList from '@/components/song_list';
import TopSongList from '@/components/topsong_list'
import axios from '@/utils/axios'
function Index(props){
    const [bannerList, setBannerList] = useState([])
    const [newSongList, setNewSongList] = useState([])
    const [topSongList, setTopSongList] = useState([])
    const { route } = props;
    useEffect(() => {
      const getFetchData = async () => {
        const res = await axios.get('/banner?type=2')
        setBannerList(res.banners)
      }
      
      const getSongList = async ()=> {
        const res = await axios.get('http://10.66.51.134:4000/personalized?limit=8')
        setNewSongList(res.result)
      }

      const getTopSongList = async ()=> {
        const res = await axios.get('http://10.66.51.134:4000/top/song?type=0')
        setTopSongList(res.data.splice(0, 4))
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
        { renderRoutes(route.routes) }
      </div>
    );
}
 
export default Index;