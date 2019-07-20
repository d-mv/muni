import styled from "styled-components";

export interface IProps {
  direction: string;
}

const Form = styled.form<IProps>`
  padding: 0.5rem 1rem;
  direction: ${props => props.direction};
`;

export default Form;
