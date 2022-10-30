import React from "react"
import { StyledLink } from '../../utils/style/Atoms'
import HomeIllustration from '../../assets/home-illustration.svg'
import {HomeWrapper , HomerContainer , LeftCol , StyledTitle , Illustration} from '../../css/HomeCss'

function Home() {
    return (
        <HomeWrapper>
          <HomerContainer>
            <LeftCol>
              <StyledTitle>
                Repérez vos besoins, on s’occupe du reste, avec les meilleurs
                talents
              </StyledTitle>
              <StyledLink to="/survey/1" $isFullLink>
                Faire le test
              </StyledLink>
            </LeftCol>
            <Illustration src={HomeIllustration} />
          </HomerContainer>
        </HomeWrapper>
    )
}
  
export default Home