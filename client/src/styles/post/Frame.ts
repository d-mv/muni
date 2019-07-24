import styled from 'styled-components';
import { radiusMin, borderPost } from '../_ui';

const Frame = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: ${borderPost} !important;
  border-radius:${radiusMin};
  z-index: 50
`;

export default Frame