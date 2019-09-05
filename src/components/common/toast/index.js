import React, {useState, useImperativeHandle, forwardRef} from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';



const ToastBox = styled.div`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(255,255,255, 1);
    color: #2a2a2a;
    font-size: .36rem;
    padding: .1rem .2rem;
    border-radius: .04rem;
    max-width: 6rem;
    .text{
        font-size: .3rem;
    }
    &.fadeIn{
        &-enter{
            opacity: 0;
            &-active { 
                opacity: 1;
                transition: opacity 10s ease-in;
            }
            &-done {
                opacity: 1;
            }
        }
        &-exit{
            opacity: 1;
            &-active {
                opacity: 0;
                transition: opacity 10s ease-in;
            }
            &-done {
                opacity: 0;
            }
        }
    }
` 

const Toast = forwardRef((props, ref) => {

    const [show, setShow] = useState(false);
    const [timer, setTimer] = useState('');
    const {text, timeout, closeCallBack} = props;

    useImperativeHandle(ref, () => ({
        show() {
            if (timer) clearTimeout(timer);
            setShow(true);
            setTimer(setTimeout(() => {
                setShow(false)
                closeCallBack();
            }, timeout));
        },
        hide() {
            setShow(false);  
        }
    }))
    return (
        <CSSTransition in={show} timeout={300} classNames="fadeIn" unmountOnExit>
            <ToastBox>
                <div className="text" dangerouslySetInnerHTML={{__html: text}}></div>
            </ToastBox>
        </CSSTransition>
    )
});

Toast.defaultProps = {
    text: '',
    timeout: 3000
}

export default React.memo(Toast);