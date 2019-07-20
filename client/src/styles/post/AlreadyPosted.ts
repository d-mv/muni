import styled from "styled-components";

import { white, primary } from "../_colors";
import { textMessageSmall } from "../_typography";

const AlreadyPosted = styled.div`
white-space: nowrap;
padding: 0.5rem 2rem;
text-align: center;
margin: 0 auto;
background-color: white;
color: ${primary}
font: ${textMessageSmall}
`;

export default AlreadyPosted;
