import styled from 'styled-components';
import { secondary, primary } from './_colors';
import { h1 } from './_typography';

export interface IProps {
muni?:boolean
}

const Title = styled.h1<IProps>`
color: ${props => props.muni ? secondary : primary}
font: ${h1}
`

export default Title