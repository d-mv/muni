import styled from "styled-components";
import { white } from "./_colors";

export interface IProps {
  padding?: string;
}

const Content = styled.div<IProps>`
  background-color: ${white};
  padding: ${props => (props.padding ? props.padding : 0)};
`;

export default Content;
