import styled from "styled-components";

interface IProps {
  space: number;
}

const Spacer = styled.div<IProps>`
  margin-top: ${props => props.space}rem;
  margin-bottom: ${props => props.space}rem;
`;

export default Spacer;
