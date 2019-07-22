import styled from "styled-components";
import {
  secondary,
  secondary30
} from "./_colors";
import { buttonShadow, borderSecondaryLight } from "./_ui";

export const Button = styled.button`
  box-shadow: ${buttonShadow(secondary30)};
  width: 6.5rem;
  height: 6.5rem;
  position: fixed;
  z-index: 50;
  bottom: 3rem;
  left: 41vw;
  border-radius: 50%;
  background-color: ${secondary};
  border: ${borderSecondaryLight} !important;
  display: flex;
  align-items: center;
  justify-content: center;
`;
