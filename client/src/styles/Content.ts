import styled from "styled-components";

export interface IProps {
  padding?: string;
}

const Content = styled.div<IProps>`
  padding: ${props => (props.padding ? props.padding : 0)};
`;

export default Content;
