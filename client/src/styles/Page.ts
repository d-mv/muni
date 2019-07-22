import styled from "styled-components";
import { white } from "./_colors";
import { pageShadow, pageShadowOpp, borderPage } from "./_ui";

const pageTemplate = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  background-color: ${white};
  box-sizing: border-box;
  overflow: scroll;
`;

export const Page = styled(pageTemplate)`
  bottom: 6rem;
  top: 0;
  box-shadow: ${pageShadow};
  border-radius: 0 0 2.5rem 2.5rem;
  border-bottom: ${borderPage} !important;
`;

export const PageOpposite = styled(pageTemplate)`
  top: 6rem;
  bottom: 0;
  border-radius: 2.5rem 2.5rem 0 0;
  box-shadow: ${pageShadowOpp};
  border-top: ${borderPage} !important;
`;

export const PageDesktop = styled(pageTemplate)`
  bottom: 0;
  top: 0;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  object-fit: cover;

  @media (max-width: 749) {
    flex-direction: column;
  }

  @media (min-width: 750) {
    flex-direction: row;
  }
`;
