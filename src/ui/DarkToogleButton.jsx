import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi';
import ButtonIcon from './ButtonIcon';
import { useDarkMode } from '../Contexts/DarkModeContext';
function DarkToogleButton() {
  const { isDark, changeMode } = useDarkMode();
  return (
    <ButtonIcon onClick={changeMode}>
      {isDark ? <HiOutlineSun></HiOutlineSun> : <HiOutlineMoon></HiOutlineMoon>}
    </ButtonIcon>
  );
}

export default DarkToogleButton;
