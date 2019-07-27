import styled from "styled-components";
import { cardShadow, radiusMed } from "./_ui";
import { transition, transitionSlow } from "./_animation";

const Card = styled.article`
  margin: 1.5rem auto;
  width: 90%;
  border-radius: ${radiusMed};
  box-shadow: ${cardShadow};
  transition: ${transition};
`;
export default Card;
