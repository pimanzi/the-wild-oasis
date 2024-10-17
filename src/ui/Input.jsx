import styled, { css } from 'styled-components';

const Input = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);

  ${(props) =>
    props.wide === 'auth' &&
    css`
      width: 100%;
      padding: 0.7rem 1.2rem;
    `}
`;

export default Input;
