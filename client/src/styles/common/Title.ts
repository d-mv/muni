import styled from "styled-components";
import { h2 } from "../_typography";

export interface IProps {
  card?: boolean;
  direction: string;
  padding?: string;
}

const Title = styled.h2<IProps>`
  font: ${h2};
  padding: ${props => (props.padding ? props.padding : " 1rem")};
  margin: 0;
  direction: ${props => props.direction};
  width: ${props => (props.card ? "76%" : undefined)};
  padding-inline-start: ${props => (props.card ? "1rem" : undefined)};
`;

export default Title;
