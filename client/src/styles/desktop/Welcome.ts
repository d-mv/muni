import styled from "styled-components";

export const Welcome = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0)
    url("https://res.cloudinary.com/dpqyiwjbs/image/upload/v1564349461/ourchange/welcome.jpg")
    no-repeat scroll center center / cover;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  object-fit: cover;
`;

export interface MProps {
  direction: string;
}

export const Main = styled.main<MProps>`
  direction: ${props => props.direction};
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  overflow: scroll;
  height: 100%;
`;
