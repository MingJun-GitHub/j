import React, { useRef, useState, useContext} from 'react';
import Toast from '@/components/common/toast';
import Confirm from '@/components/common/confirm';

const MvContext = React.createContext(null)


const Childen = () => {
    return(
        <Content></Content>
    )
}

const Content = () => {
    const {count, setCount} =  useContext(MvContext);
    return(
        <div onClick={() => setCount(3)}>
            {count}
        </div>
    )
}



const MvPage = props => {

    console.log('props==>', props);
    const [count, setCount] = useState(1);
    const toastRef = useRef(null);   
    const confirmRef = useRef(null);
    const confirmRef1 = useRef(null);
    
    const openToast = () => {
        toastRef.current.show();
    }
    const hideToast = () => {
        toastRef.current.hide();
    }
    const closeCallBack = ()=> {
        console.log('已经结束了==》')
    }
    const changeConfirm = (isopen = true, ref = confirmRef) => {
        isopen ? ref.current.show() : ref.current.hide();
    }
    return(
        <MvContext.Provider value={{count, setCount}}>
            <div>
                <>
                    <button style={{color: '#fff'}} onClick={() => openToast()}>open</button>&nbsp; &nbsp;
                    <button style={{color: '#fff'}} onClick={() => hideToast()}>close</button>
                </>
                <br></br>
                <>
                    <button style={{color: '#fff'}} onClick={() => changeConfirm(true, confirmRef1)}>open</button>&nbsp; &nbsp;
                    <button style={{color: '#fff'}} onClick={() => changeConfirm(false, confirmRef)}>close</button>
                </>

                <Toast text="22" ref={toastRef} handleClose={() => closeCallBack()}></Toast>
                <Confirm ref={confirmRef} canMaskByClick={false} showCancelBtn={true}>
                    
                </Confirm>
                <Confirm ref={confirmRef1} canMaskByClick={false} showCancelBtn={true}>
                111
                </Confirm>
            </div>
            <Childen></Childen>
        </MvContext.Provider>
    )
} 

export default MvPage