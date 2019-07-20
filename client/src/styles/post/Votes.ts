import styled from "styled-components";
import Category from "../common/Category";

export interface PIprops {
  color: string;
}

const Votes = styled(Category)<PIprops>`
  height: 2.5rem;
  margin: 0;
  background-color: white;
  color: ${props => props.color};
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: baseline;
  p{margin: 0 1rem;}
  svg {
    height: 2rem;
    width: 2rem;
  }
`;

export default Votes;
