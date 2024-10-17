import styled, { css } from 'styled-components';

const StyledFormRow = styled.div`
  ${(props) =>
    props.type === 'non-auth' &&
    css`
      display: grid;
      align-items: center;
      grid-template-columns: 24rem 1fr 1.2fr;
      gap: 2.4rem;

      padding: 1.2rem 0;
    `}

  ${(props) =>
    props.type === 'auth' &&
    css`
      display: flex;
      flex-direction: column;
      align-items: start;
      gap: 0.9rem;
      padding: 1.2rem 0;
    `}

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

StyledFormRow.defaultProps = {
  type: 'non-auth',
};

const Label = styled.label`
  ${(props) =>
    props.type === 'non-auth' &&
    css`
      font-weight: 500;
    `}

  ${(props) =>
    props.type === 'auth' &&
    css`
      font-weight: 700;
    `}
`;

Label.defaultProps = {
  type: 'non-auth',
};

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function FormRow({ label, error, children, type }) {
  return (
    <StyledFormRow type={type}>
      {label && (
        <Label type={type} htmlFor={children.props.id}>
          {label}
        </Label>
      )}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
