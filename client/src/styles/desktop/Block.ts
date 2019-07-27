import styled from "styled-components";
import { string } from "prop-types";
import { transitionSlow } from "../_animation";

export interface BProps {
  width?: string;
  minWidth?: string;
  height?: string;
  margin?: string;
  padding?: string;
}

const Block = styled.section<BProps>`
  width: ${props => (props.width ? props.width : "45vw")};
  min-width: ${props => (props.minWidth ? props.minWidth : "300px")};
  margin: ${props => (props.margin ? props.margin : "0 2rem")};
  height: ${props => (props.height ? props.height : "undefined")};
  padding: ${props => (props.padding ? props.padding : "undefined")};
  transition: ${transitionSlow};
`;

export default Block;
