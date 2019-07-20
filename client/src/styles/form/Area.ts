import styled from "styled-components";
import { borderPost, radiusMin } from "../_ui";
import { textField, textPlaceholder } from "../_typography";
import { grey } from "../_colors";

export interface IProps {
  direction: string;
}

const Area = styled.textarea<IProps>`
  padding: 0.5rem 1rem;
  border: ${borderPost} !important;
  border-radius: ${radiusMin};
  font: ${textField};
  &::placeholder {
    color: ${grey};
    font: ${textPlaceholder};
  }
  direction: ${props => props.direction};
`;

export default Area;
