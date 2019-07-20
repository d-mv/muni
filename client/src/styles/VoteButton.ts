import styled from "styled-components";
import { primary, white, primary30 } from "./_colors";
import { buttonShadow, borderPrimaryLight } from "./_ui";
import { textButtonVote } from "./_typography";

export const Button = styled.button`
  box-shadow: ${buttonShadow(primary30)};
  width: 6.5rem;
  height: 6.5rem;
  border-radius: 50%;
  background-color: ${primary};
  border: ${borderPrimaryLight};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.div`
  width: 100%;
  text-align: center;
  user-select: none;
  font: ${textButtonVote};
  color: ${white};
`;
