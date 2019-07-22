import styled from "styled-components";
import { primary, white, primary30, secondary, grey } from "./_colors";
import { buttonShadow, borderPrimary } from "./_ui";
import { h5, h4 } from "./_typography";

const Button = styled.button`
  letter-spacing: 0.1rem;
  background: none;
`;

export const PrimaryButton = styled(Button)`
  padding: 1rem 2rem;
  border-radius: 0.4rem;
  background-color: ${primary};
  border: ${borderPrimary};
  color: ${white};
  box-shadow: ${buttonShadow(primary30)};
  font: ${h4};
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

export const FormButton = styled.button`
  background: none;
  box-shadow: none;
  &:active {
    transform: scale(0.9);
  }
`;
