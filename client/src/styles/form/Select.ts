import styled from "styled-components";
import {
  textPlaceholderMedium,
  textPlaceholder,
  textFieldMedium,
  textField
} from "../_typography";
import { radiusMin, borderPost } from "../_ui";
import { grey } from "../_colors";

export interface SProps {
  direction: string;
  medium?: boolean;
  width?: string;
}

const Select = styled.select<SProps>`
  padding: 0.5rem 3rem 0.5rem 1rem;
  border: ${borderPost} !important;
  border-radius: ${radiusMin};
  font: ${props => (props.medium ? textFieldMedium : textField)};
  &::placeholder {
    color: ${grey};
    font: ${props => (props.medium ? textPlaceholderMedium : textPlaceholder)};
  }
  direction: ${props => props.direction};
  width: ${props => (props.width ? props.width : "undefined")};
  background-color: white;
  z-index: auto;
`;

export default Select;
