import React, { useEffect, useState } from 'react'
import Icon from '@/components/common/icon'
import Swiper from '@/components/common/swiper'
// import Loading from '@/components/common/loading'
import Scroll from '@/components/common/scroll'
import { getBannerList } from '@/api'
const Test = (props) => {
    console.log('props==>', props)
    const [bannerList, setBannerList] = useState([])
    let arr1 = [1,2,4,3,2,4,6,4,2,1,4,2,1,4,22,4,5,5,2,2,4,5,2,1,5,,1,4,2]
    const [arr, setArr] = useState([1,2,4,3,2,4,6,4,2,1,4,2,1,4,22,4,5,5,2,2,4,5,2,1,5,,1,4,2])
    // const pullUpLoad = {
    //     txt: {
    //         more: '加载更多'
    //     }
    // }
    useEffect(() => {
        document.title = 'test';
        !bannerList.length && getBannerListFunc();
    }, [bannerList.length]);

    async function getBannerListFunc() {
        const res = await getBannerList()
        console.log('res', res);
        setBannerList(res.banners);
    }
    function handleScroll() {

    }
    function handlePullUp() {

    } 
    
    function handleScroll(pos) {
        console.log('post==>', pos)
    }
    function doPullDownFresh() {
        return new Promise(resolve =>{
            setTimeout(() => {
                arr1 = [4,2,1].concat(arr1)
                setArr([...arr1])
                resolve()
            }, 3000)
        })
    }
    function pullUpLoadMoreData() {
        return new Promise(resolve => {
            setTimeout(() => {
                arr1 = arr1.concat([1,2,4,2,1])
                setArr([...arr1])
                resolve()
            }, 1000)
        })
    }
    return(
        <Scroll doScroll={(pos) => {}}  doPullDownFresh={doPullDownFresh} pullUpLoadMoreData={pullUpLoadMoreData} isPullUpTipHide={false} doScrollTop={() => {console.log('top')}}>
            <div>
                <h1>Icon and IconTitle   <Icon color="#fff"></Icon></h1>
                <h1><Icon color="#fff">标题在这</Icon></h1>
                <Swiper data={bannerList}></Swiper>
                {/* <Loading></Loading> */}
                <div>
                    <ul>
                    {
                        arr.map((item,index) => {
                            return <li key={index}>{item}</li>
                        })
                    }
                    </ul>
                </div>
            </div>
            {/* <iframe src="https://h5.watsons.com.cn/" style={{border: 0, width: '100vw', height: '100vh'}}></iframe> */}
        </Scroll>
    )
}

export default Test;
