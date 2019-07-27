import styled from "styled-components";
import { white } from "./_colors";

export interface HProps {
  direction: string;
}

const Header = styled.header<HProps>`
direction:${props => props.direction};
  width: 100%;
  height: 5rem;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${white};
  z-index: 50;
`;

export default Header;
