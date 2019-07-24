import styled from "styled-components";
import { textMessageSmall, textMessageMedium } from "../_typography";

export interface IProps {
  direction: string;
}

export const PostAge = styled.span<IProps>`
  display: flex;
  font: ${textMessageSmall};
  justify-content: center;
  align-items: center;
  direction: ${props => props.direction};
`;

export const PostAgeText = styled.span`
  margin: 0 0.4rem;
  font: ${textMessageMedium};
`;
