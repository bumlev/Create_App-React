import React from 'react'
import { useContext } from 'react'
import { ThemeContext } from './context'
import { createGlobalStyle } from 'styled-components'
console.log(ThemeContext)
const StyledGlobalStyle = createGlobalStyle`
    div {
        font-family: 'Trebuchet MS', Helvetica, sans-serif;
    }
    body {
      background-color: ${({ isDarkMode }) => (isDarkMode ? 'black' : 'white')};
      margin: 0;  
  }
`
function GlobalStyle() {

    const { theme } = useContext(ThemeContext)
    return <StyledGlobalStyle isDarkMode={theme === 'dark'} />
}

export default GlobalStyle