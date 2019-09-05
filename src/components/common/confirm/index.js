import React, {forwardRef, useImperativeHandle, useState, memo} from 'react';
import { CSSTransition } from 'react-transition-group';
import styled, {keyframes} from 'styled-components';


const FadeIn = keyframes`
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
`;
const Zoom = keyframes`
  0%{
    transform: scale(0);
  }
  50%{
    transform: scale(1.1);
  }
  100%{
    transform: scale(1);
  }
`

const ConfrmBox = styled.div`
   position: fixed;
   top: 0;
   right: 0;
   bottom: 0;
   width: 100%;
   height: 100%;
   z-index: 1000;
   background-color: rgba(0, 0, 0, ${props=>props.maskOpacity});
   color: ${props => props.confirmBtnBgColor};
   &.fadeIn-enter-active{
        animation: ${FadeIn} 0.3s;
        .main{
            animation: ${Zoom} 0.3s
        }
    }
    .dialog{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        z-index: 100;
        background: transparent;
    }
   .main{
       width: 7rem;
       z-index: 1000;
       font-size: .36rem;
       background: #fff;
       border-radius: .1rem;
       .title {
           font-size: .42rem;
           color: #2a2a2a;
           height: 1.2rem;
           line-height: 1.2rem;
           text-align: center;
           border-bottom: .01rem solid #efefef;
       }
       .content {
           font-size: .36rem;
           color: #333;
           display: flex;
           justify-content: ${props => props.contentAlign};
           align-items: flex-start;
           padding:.4rem;
           -webkit-overflow-scrolling: touch;
           overflow-x: hidden;
           overflow-y: auto;
           max-height: ${props=> props.autoContentScroll > 0 ? `${props.autoContentScroll}rem`:'' };
       }
       .operate{
           display: flex;
           height: 1.2rem;
           justify-content: center;
           align-items: center;
           flex: 1;
           
           >div{
               display: flex;
               justify-content: center;
               align-items: center;
               border-top: .01rem solid #efefef;
               height: 100%;
               line-height: normal;
               flex: 1;
               color: #2a2a2a;
               &:first-child{
                   border-right: .01rem solid #efefef;
                   margin-right: -.01rem;
               }
               &:active{
                   opacity: .8;
               }
           }
           .cancel_btn{
                color: ${props => props.cancelBtnTextColor};
                background-color: ${props=> props.cancelBtnBgColor};
            }
            .confirm_btn{
                color: ${props => props.confirmBtnTextColor};
                background-color: ${props=> props.confirmBtnBgColor};
            }
       }
   }
`

const Confirm = forwardRef((props, ref) => {
  
    const [show, setShow] = useState(false);

  const { title, content, cancelBtnText,showCancelBtn,handleCancel,confirmBtnText,showConfirmBtn,handleConfirm,showBtn, canMaskByClick} = props;

  useImperativeHandle(ref, () => ({
    show() {
      setShow(true);
    },
    hide(){
        setShow(false);
    }
  }));

  return (
    <CSSTransition in={show} classNames="fadeIn" timeout={300} appear={true}>
      <ConfrmBox style={{display: show ?"block": "none"}} onClick={e=>{e.stopPropagation();canMaskByClick&&setShow(false);}} {...props}>
           <div className="dialog">
                <div className="main">
                    { title && <div className="title">{title}</div>}
                    <div className="content">{content || props.children}</div>
                    {
                        showBtn && <div className="operate">
                        { 
                            showCancelBtn && cancelBtnText && <div className="cancel_btn" onClick={e=>{e.stopPropagation();setShow(false);handleCancel();}}>{cancelBtnText}</div>
                        }
                        {
                            showConfirmBtn && confirmBtnText && <div className="confirm_btn" onClick={e=>{e.stopPropagation();setShow(false);handleConfirm();}}>{confirmBtnText}</div>
                        }
                    </div>
                    }
                </div>
            </div>
      </ConfrmBox>
    </CSSTransition>
  )
})

Confirm.defaultProps = {
    title: '温馨提示',
    content: '',
    cancelBtnText: '取消',
    cancelBtnTextColor: '#2a2a2a',
    cancelBtnBgColor: '#fff',
    showCancelBtn: true,
    handleCancel: () => {},
    confirmBtnText: '确定',
    confirmBtnTextColor: '#2a2a2a',
    confirmBtnBgColor: '#fff',
    showConfirmBtn: true,
    handleConfirm: () => {},
    showBtn: true, // 显示两个按钮
    canMaskByClick: false,
    maskOpacity: 0,
    contentAlign: 'center',
    autoContentScroll: 0
}

export default memo(Confirm);