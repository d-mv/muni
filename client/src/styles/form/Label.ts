import styled from "styled-components";
import { textField } from "../_typography";

export interface IProps {
  direction: string;
}

const Label = styled.div<IProps>`
  padding: 0.5rem 0rem;
  font: ${textField};
  direction: ${props => props.direction};
`;

export default Label;
