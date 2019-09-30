import React, { useEffect, useState, useRef } from 'react'
import Icon from '@/components/common/icon'
import Swiper from '@/components/common/swiper'
import Input from '@/components/common/input'
// import Loading from '@/components/common/loading'
import Scroll from '@/components/common/scroll'
import Player from '@/components/common/player'
import { getBannerList } from '@/api'
const Test = (props) => {
    console.log('props==>', props)
    const [bannerList, setBannerList] = useState([])
    const inputRef = useRef(null)
    let arr1 = [1,2,4,3,2,4,6,4,2,1,4,2,1,4,22,4,5,5,2,2,4,5,2,1,5,,1,4,2]
    const [arr, setArr] = useState([1,2,4,3,2,4,6,4,2,1,4,2,1,4,22,4,5,5,2,2,4,5,2,1,5,,1,4,2])
    useEffect(() => {
        document.title = 'test';
        !bannerList.length && getBannerListFunc();
    }, [bannerList.length]);

    async function getBannerListFunc() {
        const res = await getBannerList()
        console.log('res', res);
        setBannerList(res.banners);
    }
    function getValue() {
        console.log('value==>', inputRef.current.getValue())
        inputRef.current.focus()
    }
    return(
        // <Scroll doScroll={(pos) => {}}>
            <div>
                <h1>Icon and IconTitle   <Icon color="#fff"></Icon></h1>
                <h1><Icon color="#fff">标题在这</Icon></h1>
                <Swiper data={bannerList}></Swiper>
                <Input ref={inputRef} onInput={(value) => {console.log('value==>', value)}}></Input>
                <button onClick={() => getValue()}>获取value</button>
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
                <Player></Player>
            </div>
        // </Scroll>
    )
}

export default Test;
