import styled from "styled-components";
import { textField } from "../_typography";

export interface IProps {
  direction: string;
}

export const Select = styled.div<IProps>`
  background-color: "white";
  option {
    padding: 0.5rem 0rem;
    font: ${textField};
    direction: ${props => props.direction};
  }
`;

export const Option = styled.div<IProps>`
  padding: 0.5rem 0rem;
  font: ${textField};
  direction: ${props => props.direction};
`;
