import styled from "styled-components";
import { borderPost, radiusMin, borderAttention } from "../_ui";
import {
  textField,
  textPlaceholder,
  textFieldMedium,
  textPlaceholderMedium
} from "../_typography";
import { grey } from "../_colors";

export interface IProps {
  direction: string;
  medium?: boolean;
  width?: string;
  attention?: boolean;
}

const Field = styled.input<IProps>`
  padding: 0.5rem 1rem;
  border: ${props =>
    props.attention ? borderAttention : borderPost} !important;
  border-radius: ${radiusMin};
  font: ${props => (props.medium ? textFieldMedium : textField)};
  &::placeholder {
    color: ${grey};
    font: ${props => (props.medium ? textPlaceholderMedium : textPlaceholder)};
  }
  direction: ${props => props.direction};
  width: ${props => (props.width ? props.width : "undefined")};
  background-color: white;
`;

export default Field;
