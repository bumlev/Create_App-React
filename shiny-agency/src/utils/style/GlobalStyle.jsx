import React ,  { useContext } from 'react'
import { ThemeContext } from './context'
import { StyledGlobalStyle } from '../../css/GlobalStyleCss'

function GlobalStyle() {
    const { theme } = useContext(ThemeContext)
    return <StyledGlobalStyle isDarkMode={theme === 'dark'} />
}

export default GlobalStyle