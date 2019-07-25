import styled from "styled-components";
import { radiusMed, borderPost, cardShadow } from "./_ui";

const Post = styled.article`
  width: 90%;
  margin: 0 auto;
  border-radius: ${radiusMed};
  box-shadow: ${cardShadow};
`;

export default Post;
