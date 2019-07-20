import styled from "styled-components";
import { textSubtitle, textStandard } from "../_typography";

export interface IProps {
  direction: string;
}

const PlainText = styled.div<IProps>`
  padding: 0 1rem;
  font: ${textStandard};
  direction: ${props => props.direction};
`;

export default PlainText;
