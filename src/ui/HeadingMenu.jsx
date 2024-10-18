import styled from 'styled-components';
import ButtonIcon from './ButtonIcon';
import { HiOutlineUser } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import Logout from '../features/authentication/Logout';
import DarkToogleButton from './DarkToogleButton';

const StyledHeadingMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;
function HeadingMenu() {
  const navigate = useNavigate();
  return (
    <StyledHeadingMenu>
      <ButtonIcon onClick={() => navigate('/account')}>
        <HiOutlineUser></HiOutlineUser>
      </ButtonIcon>
      <DarkToogleButton></DarkToogleButton>
      <Logout></Logout>
    </StyledHeadingMenu>
  );
}

export default HeadingMenu;
