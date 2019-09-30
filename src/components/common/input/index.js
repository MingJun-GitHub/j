import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react'
import styled from 'styled-components'
import debounce from '@/utils/debounce'

const InputBox = styled.input`
    display: flex;
    border: none;
    display: inline-flex;
    line-height: normal;
    height: .82rem;
    border-radius: .02rem;
    outline: none;
    font-size: .36rem;
    /* width: 100%; */
    max-width: 100%;
    padding: 0 .2rem;
    box-sizing: border-box;
`


const Input = forwardRef((props, ref) => {
    const [value, setValue] = useState(props.value || null)

    const inputRef = useRef(null)

    const {inputStyle, placeholder, disabled, onInput, debounceTime} = props
    
    useImperativeHandle(ref, () => ({
        getValue() {
            return value
        },
        getInputObj() {
            return inputRef
        },
        focus() {
            inputRef.current.focus()
        },
        blur() {
            inputRef.current.blur()
        }
    }))

    const inputValue = (e) => {
        const value = e.target.value
        debounce(() => {
            setValue(value)
            onInput(value)
        }, debounceTime)()
    }
    return(
        <InputBox ref={inputRef} style={inputStyle} defaultValue={value} placeholder={placeholder} onInput={(e) => inputValue(e)} disabled={disabled}></InputBox>
    )
})


Input.defaultProps = {
    inputStyle: {},
    placeholder: '请输内容',
    value: '',
    disabled: false,
    debounceTime: 200,
    onInput: () => {}
}

export default Input