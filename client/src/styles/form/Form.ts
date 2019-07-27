import styled from "styled-components";
import { radiusMed, pageShadow, cardShadow } from "../_ui";
import { white } from "../_colors";

export interface IProps {
  direction: string;
  desktop?: boolean;
}

const Form = styled.form<IProps>`
  padding: ${props => (props.desktop ? "2rem 3rem 3rem 3rem" : "1rem 2rem")};
  direction: ${props => props.direction};
  border-radius: ${props => (props.desktop ? radiusMed : 0)};
  box-shadow: ${props => (props.desktop ? cardShadow : "none")};
  background-color: ${white};
  /* background-color: ${props => (props.desktop ? white : "none")}; */
`;

export default Form;
