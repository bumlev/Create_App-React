import { createGlobalStyle } from 'styled-components'

const StyledGlobalStyle = createGlobalStyle`
    div {
        font-family: 'Trebuchet MS', Helvetica, sans-serif;
    }
    body {
      background-color: ${({ isDarkMode }) => (isDarkMode ? 'black' : 'white')};
      margin: 0;  
  }
`
export {StyledGlobalStyle}