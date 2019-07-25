import styled from "styled-components";
import { textSubtitle } from "../_typography";
import Card from "../Card";

export interface IProps {
  color?: string;
}

const Reply = styled(Card)<IProps>`
  background-color: ${props => (props.color ? props.color : "white")};
  width:90%;
  margin: 0 auto;
`;

export default Reply;
