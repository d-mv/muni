import styled from "styled-components";

interface IProps {
  image: string;
  width?: string;
}

const Photo = styled.div<IProps>`
  background: rgba(0, 0, 0, 0) url(${props => props.image}) no-repeat scroll
    center center / cover;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  object-fit: cover;
  height: 15rem;
  width: ${props => (props.width ? props.width : "100%")};
`;

export default Photo;
