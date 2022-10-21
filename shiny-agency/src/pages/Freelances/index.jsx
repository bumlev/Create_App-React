import Card from '../../components/Card'
import React from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { Loader } from '../../utils/style/Atoms'


const freelanceProfiles = [
    {
        name: 'Jane Doe',
        jobTitle: 'Devops',
    },
    {
        name: 'John Doe',
        jobTitle: 'Developpeur frontend',
    },
    {
        name: 'Jeanne Biche',
        jobTitle: 'Développeuse Fullstack',
    },
]

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

    const [freelancesData, setfreelancesData] = useState([])
    const [isDataLoading, setDataLoading] = useState(false)
    const [error , setError] = useState(null)
    useEffect(() =>{
        async function fetchFreelances(){
            setDataLoading(true);
            try{
                const response = await fetch(`http://localhost:8000/freelances`);
                const  {freelancersList}  = await response.json();
                setfreelancesData(freelancersList)
            }catch(err){
                console.log(err)
                setError(true)
            }finally{
                setDataLoading(false);
            }
        }
        fetchFreelances()
        
    } , [])

    if (error) {
        return <span>Oups il y a eu un problème</span>
    }

    return (
        <div>
            <PageTitle>Trouvez votre prestataire</PageTitle>
            <PageSubtitle>
                Chez Shiny nous réunissons les meilleurs profils pour vous.
            </PageSubtitle>
            <CardsContainer>

            {isDataLoading ? (
                    <DivLoader><Loader/></DivLoader>
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