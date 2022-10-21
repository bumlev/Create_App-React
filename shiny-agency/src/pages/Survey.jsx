import React from "react"
import { useState, useEffect} from 'react'
import { useParams , Link } from "react-router-dom"
import styled from 'styled-components'
import colors from '../utils/style/colors'
import { Loader } from '../utils/style/Atoms'
import { SurveyContext } from '../utils/style/context'
import { useContext } from "react"
//console.log(SurveyContext)
const SurveyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const QuestionTitle = styled.h2`
  text-decoration: underline;
  text-decoration-color: ${colors.primary};
`

const QuestionContent = styled.span`
  margin: 30px;
`

const LinkWrapper = styled.div`
  padding-top: 30px;
  & a {
    color: black;
  }
  & a:first-of-type {
    margin-right: 20px;
  }
`

const ReplyBox = styled.button`
  border: none;
  height: 100px;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.backgroundLight};
  border-radius: 30px;
  cursor: pointer;
  box-shadow: ${(props) =>
    props.isSelected ? `0px 0px 0px 2px ${colors.primary} inset` : 'none'};
  &:first-child {
    margin-right: 15px;
  }
  &:last-of-type {
    margin-left: 15px;
  }
`
const ReplyWrapper = styled.div`
  display: flex;
  flex-direction: row;
`
function Survey() {
    const questionNumber  = useParams()
    const questionNumberInt = parseInt(questionNumber.questionNumber)
    const prevQuestionNumber = questionNumberInt === 1 ? 1 : questionNumberInt - 1
    const nextQuestionNumber = questionNumberInt + 1
    const [surveyData, setSurveyData] = useState({})
    const [isDataLoading, setDataLoading] = useState(false)
    const { answers, saveAnswers } = useContext(SurveyContext);
    const [error , setError] = useState(null)
    
    function saveReply(answer) {
        saveAnswers({ [questionNumberInt]: answer })
    } 

    useEffect(() =>{

        async function fetchSurvey(){
            setDataLoading(true);
            try{
                const response = await fetch(`http://localhost:8000/survey`);
                const { surveyData } = await response.json();
                setSurveyData(surveyData)
            }catch(err){
                console.log(err)
                setError(true)
            }finally{
                setDataLoading(false);
            }
        }
        fetchSurvey()
    } , [])

    if (error) {
        return <span>Oups il y a eu un problème</span>
    }

    return (
        <SurveyContainer>
            <QuestionTitle> Question {questionNumber.questionNumber}</QuestionTitle>
            {isDataLoading ? (
                    <Loader />
            ) : (
                <QuestionContent>{surveyData[questionNumber.questionNumber]}</QuestionContent>
             )}
            <ReplyWrapper>
                <ReplyBox
                    onClick={() => saveReply(true)}
                    isSelected={answers[questionNumberInt] === true}
                    >
                    Oui
                </ReplyBox>
                <ReplyBox
                    onClick={() => saveReply(false)}
                    isSelected={answers[questionNumberInt] === false}
                    >
                    Non
                </ReplyBox>
            </ReplyWrapper>
            <LinkWrapper>
                <Link to={`/survey/${prevQuestionNumber}`}>Précédent</Link>
                {questionNumberInt === 10 ? (
                    <Link to="/results">Résultats</Link>
                    ) : (
                    <Link to={`/survey/${nextQuestionNumber}`}>Suivant</Link>
                )}
            </LinkWrapper>
        </SurveyContainer>
    )
}

export default Survey