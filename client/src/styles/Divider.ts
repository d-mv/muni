import styled from "styled-components";

export interface DProps {
  width: string;
  height?: string;
  color?: string;
  margin?: string;
}

const Divider = styled.div<DProps>`
  width: ${props => props.width};
  height: ${props => (props.height ? props.height : ".3rem")};
  background-color: ${props => (props.color ? props.color : "white")};
  margin: ${props => (props.margin ? props.margin : "1rem auto")};
`;

export default Divider;
