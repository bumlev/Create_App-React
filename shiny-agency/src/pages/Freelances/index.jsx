import Card from '../../components/Card'
import React from 'react'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { Loader } from '../../utils/style/Atoms'
import { useFetch , useTheme } from '../../utils/hooks'
const CardsContainer = styled.div`
    display: grid;
    gap: 24px;
    grid-template-rows: 350px 350px;
    grid-template-columns: repeat(2, 1fr);
`

const PageTitle = styled.h1`
  font-size: 30px;
  color: black;
  text-align: center;
  padding-bottom: 30px;
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
`
const PageSubtitle = styled.h2`
  font-size: 20px;
  color: ${colors.secondary};
  font-weight: 300;
  text-align: center;
  padding-bottom: 30px;
`
const DivLoader = styled.div`
    position:absolute;
    right:690px;
    bottom:120px;
`
function Freelances() { 
    const { theme } = useTheme()
    const { data , isLoading ,  error } = useFetch(`http://localhost:8000/freelances`);
    const freelancesData = data.freelancersList
    if (error) {
        return <span data-testid="error">Oups il y a eu un problème</span>
    }

    return (
        <div>
            <PageTitle theme={theme}>Trouvez votre prestataire</PageTitle>
            <PageSubtitle>
                Chez Shiny nous réunissons les meilleurs profils pour vous.
            </PageSubtitle>
            <CardsContainer>

            {isLoading ? (
                    <DivLoader><Loader theme={theme} data-testid="loader"/></DivLoader>
            ) : (
                freelancesData.map((profile, index) => (
                    <Card
                        key={`${profile.name}-${index}`}
                        label={profile.job}
                        picture={profile.picture}
                        title={profile.name}
                    />
                ))
                )}
            </CardsContainer>
        </div>
    )
}

export default Freelances