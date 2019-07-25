import styled from "styled-components";
import { textMessageSmall } from "../_typography";

export interface TLprops {
  direction: string;
}

const TextLine = styled.div<TLprops>`
  padding: 0 1rem;
  font: ${textMessageSmall};
  direction: ${props => props.direction};
`;

export default TextLine;
