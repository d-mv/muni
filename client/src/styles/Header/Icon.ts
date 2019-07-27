import styled from "styled-components";

export interface IProps {
  rtl: boolean;
}

const Icon = styled.div<IProps>`
  height: 65%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transform: ${props => (props.rtl ? "none" : "rotate(180deg)")};
`;

export default Icon;
