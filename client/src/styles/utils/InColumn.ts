import styled from "styled-components";

export interface IProps {
  justify: string;
  direction: string;
  width?: string;
  height?: string;
}

const InColumn = styled.span<IProps>`
width: ${props => (props.width ? props.width : "100%")};
height: ${props => (props.height ? props.height : "100%")};
padding: 1rem;
display:flex;
flex-direction: column;
justify-content: ${props => props.justify};
align-items:center;
direction:${props => props.direction}
`;

export default InColumn;
