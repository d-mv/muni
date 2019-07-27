import styled from "styled-components";
import {
  primary,
  white,
  primary30,
  secondary,
  grey,
  attention,
  attention10,
  transparent,
  dark,
  dark70,
  primaryLight,
  primaryDark
} from "./_colors";
import { buttonShadow, borderPrimary, borderAttention } from "./_ui";
import { h5, h4 } from "./_typography";
import { transition } from "./_animation";

const Button = styled.button`
  user-select: none;
  letter-spacing: 0.1rem;
  background: none;
  margin: 0 1rem;
  transition: ${transition};
  &:active {
    transform: translateY(4px);
    /* transform: scale(0.95); */
  }
`;

export const PrimaryButton = styled(Button)`
  padding: 1rem 2rem;
  border-radius: 0.4rem;
  background-color: ${primary};
  border: ${borderPrimary} !important;
  color: ${white};
  box-shadow: ${buttonShadow(primary30)};
  font: ${h4};
  &:hover {
    background-color: ${primaryDark};
    border-color: ${primaryDark};
  }
`;

export const SecondaryButton = styled(Button)`
  color: ${secondary};
  font: ${h5};
  border-bottom: 1px solid ${secondary} !important;
  &:disabled {
    color: ${grey};
    border-bottom: 1px solid ${grey} !important;
  }
`;
export const AttentionButton = styled(PrimaryButton)`
  background-color: ${white};
  color: ${attention};
  font: ${h5};
  border: ${borderAttention} !important;
  box-shadow: ${buttonShadow(attention10)};
`;
export const WhiteButton = styled(PrimaryButton)`
  background-color: ${white};
  color: ${dark};
  font: ${h5};
  border: ${white} !important;
  box-shadow: ${buttonShadow(dark70)};
`;

export const FormButton = styled.button`
  background: none;
  box-shadow: none;
  &:active {
    transform: scale(0.9);
  }
`;

export const MinimalButton = styled.button`
  height: 4rem;
  width: 4rem;
  margin: 1rem;
  background-color: ${transparent};
  transition: ${transition};
  &:active {
    transform: scale(0.95);
  }
`;
