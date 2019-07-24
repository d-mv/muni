import styled from "styled-components";
import { borderPost, radiusMin } from "../_ui";
import { textField, textPlaceholder, textFieldMedium } from "../_typography";
import { grey } from "../_colors";

export interface IProps {
  direction: string;
  medium?: boolean;
  width?: string;
}

const Field = styled.input<IProps>`
  padding: 0.5rem 1rem;
  border: ${borderPost} !important;
  border-radius: ${radiusMin};
  font: ${props => (props.medium ? textFieldMedium : textField)};
  &::placeholder {
    color: ${grey};
    font: ${textPlaceholder};
  }
  direction: ${props => props.direction};
  width: ${props => (props.width ? props.width : "undefined")};
`;

export default Field;
