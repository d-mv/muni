import styled from "styled-components";
import { white, primary, primary70 } from "../_colors";
import { textCategory } from "../_typography";
import { radiusMin } from "../_ui";

export interface IProps {
  back?: string;
}

const Category = styled.p<IProps>`
  width: fit-content;
  padding: 0.5rem 1rem;
  margin: 1rem;
  color: ${white};
  background-color: ${props => (props.back ? props.back : primary70)};
  font: ${textCategory};
  border-radius: ${radiusMin};
  text-transform: uppercase;
`;

export default Category;
