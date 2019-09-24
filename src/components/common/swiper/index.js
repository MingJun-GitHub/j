import React, {useState, useEffect, useRef, memo} from 'react';
import {withRouter} from 'react-router-dom';
import 'swiper/dist/css/swiper.min.css';
import Swiper from 'swiper';
import styled from 'styled-components'; 

export const SwiperPagination = styled.div`
   bottom: .18rem !important;
   .swiper-pagination-bullet{
       width: .4rem;
       height:.1rem;
       border-radius: 0;
       line-height: normal;
       &-active {
           background: #000;
       }
   }
`

const Slider = (props) => {
    const [sliderSwiper, setSliderSwiper] = useState(null);
    const swiperRef = useRef();
    const { children, paginaTion, data, options} = props;
    
    //  buttonPrev, buttonNext, scrollBar,
    useEffect(() => { 
        if(data.length && !sliderSwiper){ 
           let sliderSwiper = new Swiper(swiperRef.current, options);
           setSliderSwiper(sliderSwiper);
        }
    }, [data.length, sliderSwiper]);

    return (
        <div className='swiper-container' ref={swiperRef}>
                {data.length > 0 && <div className='swiper-wrapper'>
                    {
                        data.map(item => {
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
    options: {
        loop: true,
        autoplay: { 
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination'
        }
    },
    paginaTion: true,
    // buttonPrev: false,
    // buttonNext: false,
    // scrollBar: false,
    data: []
}

export default withRouter(memo(Slider))
