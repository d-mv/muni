import styled from "styled-components";
import { cardShadow, radiusMed } from "./_ui";

const Card = styled.article`
  margin: 1.5rem auto;
  width: 90%;
  border-radius: ${radiusMed};
  box-shadow: ${cardShadow};
`;
export default Card;
