import styled from "styled-components";
import { primary, white, primary30 } from "./_colors";
import { buttonShadow, borderPrimaryLight } from "./_ui";
import { textButtonVote } from "./_typography";
import { beatAnimation, transition } from "./_animation";

export const Button = styled.button`
  box-shadow: ${buttonShadow(primary30)};
  width: 6.5rem;
  height: 6.5rem;
  border-radius: 50%;
  background-color: ${primary};
  border: ${borderPrimaryLight} !important;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${beatAnimation};
  transition: ${transition};
  &:active {
    transform: scale(0.95);
  }
`;

export const Title = styled.div`
  width: 100%;
  text-align: center;
  user-select: none;
  font: ${textButtonVote};
  color: ${white};
`;
