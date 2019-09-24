import React, { useEffect, useState } from 'react'
import Icon from '@/components/common/icon'
import Swiper from '@/components/common/swiper'
import Loading from '@/components/common/loading'
import Scroll from '@/components/common/scroll'
import { getBannerList } from '@/api'
const Test = (props) => {
    console.log('props==>', props)
    const [bannerList, setBannerList] = useState([])

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
    return(
        <Scroll doScroll={(pos) => {}} doPullDownFresh={() => {}} doPullDownFresh={()=> {return Promise.resolve('dd')}}>
            <div>
                <h1>Icon and IconTitle<Icon color="#fff"></Icon></h1>
                <Swiper data={bannerList}></Swiper>
                <Loading></Loading>
                <div>
                    <ul>
                    {
                        [1,2,4,3,2,4,6,4,2,1,4,2,1,4,22,4,5,5,2,2,4,5,2,1,5,,1,4,2].map((item,index) => {
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
