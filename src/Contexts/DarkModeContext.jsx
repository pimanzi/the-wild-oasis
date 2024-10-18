import { createContext, useContext, useEffect } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

const DarkMode = createContext();

function DarkModeContext({ children }) {
  const [isDark, setIsDark] = useLocalStorageState(false, 'isDark');

  useEffect(
    function () {
      if (isDark) {
        document.documentElement.classList.add('dark-mode');
        document.documentElement.classList.remove('light-mode');
      } else {
        document.documentElement.classList.add('light-mode');
        document.documentElement.classList.remove('dark-mode');
      }
    },
    [isDark]
  );

  function changeMode() {
    setIsDark((isDark) => !isDark);
  }
  return (
    <DarkMode.Provider
      value={{
        isDark,
        changeMode,
      }}
    >
      {children}
    </DarkMode.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkMode);
  if (context === 'undefined') {
    return 'Context was utilised outside of DarkModeContext';
  }

  return context;
}

export { useDarkMode, DarkModeContext };
