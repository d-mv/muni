import styled from "styled-components";

export interface IProps {
  direction: string;
  padding?: string;
  margin?: string;
  width?: string;
}

const Section = styled.section<IProps>`
  display: flex;
  flex-direction: column;
  direction: ${props => props.direction};
  padding: ${props => (props.padding ? props.padding : "1rem")};
  margin: ${props => (props.margin ? props.margin : 0)};
  width: ${props => props.width};
`;

export default Section;
