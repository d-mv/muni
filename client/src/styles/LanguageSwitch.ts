import styled from "styled-components";
import { borderPost, radiusMin, borderPrimary, borderWhite } from "./_ui";
import { textFieldMedium } from "./_typography";
import { dark, white } from "./_colors";

export interface LSprops {
  short?: boolean;
  white?: boolean;
}

const LanguageSwitch = styled.select<LSprops>`
  border: ${props => (props.white ? borderWhite : borderPost)} !important;
  color: ${props => (props.white ? white : dark)};
  border-radius: ${radiusMin};
  background: none;
  font: ${textFieldMedium};
  padding-inline-start: ${props => (props.short ? "1rem" : ".5rem")};
  padding-inline-end: ${props => (props.short ? "undefined" : ".5rem")};
  padding-bottom: ${props => (props.short ? ".5rem" : "undefined")};
  width: fit-content;
  height: 4rem;
  z-index: 10;
  user-select: none;
  &:focus {
    border: ${props => (props.white ? borderWhite : borderPrimary)} !important;
  }
`;

export default LanguageSwitch;
