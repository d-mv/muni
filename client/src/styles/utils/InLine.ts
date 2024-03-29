import styled from "styled-components";

export interface IProps {
  direction: string;
  justify: string;
  padding?: string;
  height?: string;
  align?: string;
  width?: string;
}

const InLine = styled.span<IProps>`
height: ${props => (props.height ? props.height : "unset")};
width: ${props => (props.width ? props.width : "undefined")};
display:flex;
flex-direction: row;
justify-content: ${props => props.justify};
align-items:${props => (props.align ? props.align : "center")};
direction: ${props => props.direction};
padding: ${props => (props.padding ? props.padding : 0)}
`;

export default InLine;
