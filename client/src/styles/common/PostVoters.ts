import styled from "styled-components";
import { textMessageSmall, textMessageMedium } from "../_typography";

export interface IProps {
  direction: string;
}

export const PostVoters = styled.span<IProps>`
  height: 2.2rem;
  margin: 0 1rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  direction: ${props => props.direction};
`;
export const PostVotersIcon = styled.span`
  padding-top: 0.2rem;
  margin: 0 0.4rem;
  width: 1.7rem;
`;

export const PostVotersNumber = styled.span`
  display: flex;
  font: ${textMessageSmall};
  justify-content: center;
  align-items: center;
`;

export const PostVotersText = styled.span`
  margin: 0 0.4rem;
  font: ${textMessageMedium};
`;
