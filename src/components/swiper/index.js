import React, {useState, useEffect, useRef, memo} from 'react';
import 'swiper/dist/css/swiper.min.css';
import Swiper from 'swiper';
import { SwiperPagination } from './style';
const Slider = (props) => {
    const [sliderSwiper, setSliderSwiper] = useState(null);
    const swiperRef = useRef();
    const { children, paginaTion, bannerList} = props;
    //  buttonPrev, buttonNext, scrollBar,
    useEffect(() => { 
        if(bannerList.length && !sliderSwiper){ 
           let sliderSwiper = new Swiper(swiperRef.current, props);
           setSliderSwiper(sliderSwiper);
        }
    }, [bannerList.length, sliderSwiper, props]);
    return (
        <div className='swiper-container' ref={swiperRef}>
                {bannerList.length > 0 && <div className='swiper-wrapper'>
                    {
                        bannerList.map(item => {
                          return <div className='swiper-slide' style={{lineHeight: '0'}} key={item.bannerId}>
                              <img src={item.pic} alt='图片加载中...' style={{width: '100%', height: 'auto' }} />
                            </div>
                        })
                    }
                    </div>
                }
                {paginaTion && <SwiperPagination className='swiper-pagination'></SwiperPagination>}
                {/* {buttonPrev && <div className='swiper-button-prev'></div>} */}
                {/* {buttonNext && <div className='swiper-button-next'></div>} */}
                {/* {scrollBar && <div className='swiper-scrollbar'></div>} */}
                {children}
        </div>
    )
}

Slider.defaultProps = {
    loop: true,
    autoplay: { 
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination'
    },
    paginaTion: true,
    // buttonPrev: false,
    // buttonNext: false,
    // scrollBar: false,
    bannerList: []
}


export default memo(Slider)
