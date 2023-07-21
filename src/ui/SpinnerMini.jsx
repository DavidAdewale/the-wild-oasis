// import { BiLoaderAlt } from 'react-icons/bi';

// import styled, { keyframes } from 'styled-components';
import styled from 'styled-components';

// const rotate = keyframes
//   to {
//     transform: rotate(1turn)
//   }
// `;

const Loader = styled.span`
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 50%;
  display: inline-block;
  border-top: 3px solid var(--color-grey-0);
  border-right: 3px solid transparent;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

// const SpinnerMini = styled(BiLoaderAlt)`
//   width: 2.4rem;
//   height: 2.4rem;
//   animation: ${rotate} 1.5s infinite linear;
// `;

function SpinnerMini() {
  return <Loader />;
}

export default SpinnerMini;
