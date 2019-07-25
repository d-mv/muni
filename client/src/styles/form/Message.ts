import styled from "styled-components";
import { attention } from "../_colors";
import { h4 } from "../_typography";

export interface IProps {
  direction: string;
}

const Message = styled.div<IProps>`
  height: 4rem;
  font: ${h4};
  color: ${attention};
  text-align: center;
  direction: ${props => props.direction};
`;

export default Message;
