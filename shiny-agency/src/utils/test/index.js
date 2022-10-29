import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { ThemeProvider , SurveyProvider} from '../../utils/style/context'
import { MemoryRouter } from 'react-router-dom'
function Wrapper({ children }) {
    return (
        <MemoryRouter>
            <ThemeProvider>
                <SurveyProvider> {children} </SurveyProvider>   
            </ThemeProvider>
        </MemoryRouter>
    )
}
 
export function render(ui) {
    rtlRender(ui, { wrapper: Wrapper })
}