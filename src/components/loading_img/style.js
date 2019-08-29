import styled from 'styled-components'
import bgimg from '@/assets/images/loading.gif'
export const BG = styled.div`
  width:100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background: url(${(props) => props.src || bgimg}) no-repeat center;
`