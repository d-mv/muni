import styled from "styled-components";
import { darkTrans, dark70 } from "./_colors";
import { radiusMed } from "./_ui";

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${dark70};
  z-index: 50;
`;

export const ModalContent = styled.main`
  width: 85%;
  border-radius: ${radiusMed};
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;
