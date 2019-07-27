import styled from "styled-components";

export interface IProps {
  direction: string;
}

const DownIcon = styled.div<IProps>`
  position: relative;
  bottom: 3.3rem;
  height: 2rem;
  width: 2rem;
  z-index: 2;
  padding: 0.5rem;
  direction: ${props => props.direction};
`;

export default DownIcon;
