import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render , screen } from "@testing-library/react";
import Home from './'
import { ThemeProvider } from "../../utils/style/context";

describe('The Home Component' , () =>{

    it('should render title' , () =>{
        render(
            <MemoryRouter>
                <ThemeProvider>
                    <Home/>
                </ThemeProvider>
            </MemoryRouter>
        )

        expect(
                screen.getByRole('heading' , {
                    level:2 , 
                    text:" Repérez vos besoins, on s’occupe du reste, avec les meilleurs talents",
                }
            )
        ).toBeTruthy()
    })
})