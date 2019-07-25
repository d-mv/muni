import styled from "styled-components";
import { radiusMin, borderPost } from "../_ui";

export interface FProps {
  width?: string;
}

const Frame = styled.div<FProps>`
  width: ${props => (props.width ? props.width : "80%")};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: ${borderPost} !important;
  border-radius: ${radiusMin};
  background-color: white;
  z-index: 50;
`;

export default Frame;
