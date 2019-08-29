import styled from 'styled-components'

export const MenuBar = styled.div`
    display:flex;
    width: 100%;
    height: auto;
    font-size:.42rem;
    margin-top: .12rem;
    ul {
        display:flex;
        justify-content:space-between;
        align-items:center;
        margin: 0 .5rem;
        flex:1;
        i {
            font-size: .7rem;
            height: 1.3rem;
            width:1.3rem;
            display:flex;
            justify-content:center;
            align-items:center;
            color:#fff;
            background:#2a2a2a;
            /* border: 1px solid; */
            border-radius: 50%;
        }
        p.title{
            font-size: .32rem;
            margin-top: .2rem;
            color:#fff;
        }
        a {
            display:flex;
            justify-content:center;
            align-items:center;
            flex-direction: column;
            height: auto;
            color: #2a2a2a;
        }
    }
`