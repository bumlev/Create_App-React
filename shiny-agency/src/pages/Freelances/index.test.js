import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import {screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import { render as renderFreelances } from '../../utils/test'
import Freelances from './'
 
const freelancersMockedData = [
    {
        name: 'Harry Potter',
        job: 'Magicien frontend',
        picture: '',
    },
    {
        name: 'Hermione Granger',
        job: 'Magicienne fullstack',
        picture: '',
    },
]

const server = setupServer(
    // On précise ici l'url qu'il faudra "intercepter"
    rest.get('http://localhost:8000/freelances', (req, res, ctx) => {

        // Là on va pouvoir passer les datas mockées dans ce qui est retourné en json
        return res(ctx.json({ freelancersList: freelancersMockedData }))

    })
)


it('Should display freelancers names', async () => {
    renderFreelances(<Freelances/>)
    await waitForElementToBeRemoved(() =>screen.getByTestId('loader'))
    await waitFor(() => {
        expect(screen.getByText('Harry Potter')).toBeTruthy()
        expect(screen.getByText('Hermione Granger')).toBeTruthy()
    })
})


/// snapshot
/*it('should display error content' ,async () => {
    server.use(
        rest.get('http://localhost:8000/freelances' , (req , res , ctx) =>{
            return res.once(
                ctx.status(500),
                ctx.json({
                    errorMessage : `Oups il y a eu une erreur dans l"Api`,
                    freelancersList: freelancersMockedData
                })
            )
        })
    )

   renderFreelances(<Freelances/>)
    await waitForElementToBeRemoved(() =>screen.getByTestId('loader'))
    const err = screen.getByTestId('error');
    expect(err).toMatchInLineSnapshot();
   
})*/
 
// Active la simulation d'API avant les tests depuis server
beforeAll(() => server.listen())

// Réinitialise tout ce qu'on aurait pu ajouter en termes de durée pour nos tests avant chaque test
afterEach(() => server.resetHandlers())

// Ferme la simulation d'API une fois que les tests sont finis
afterAll(() => server.close())