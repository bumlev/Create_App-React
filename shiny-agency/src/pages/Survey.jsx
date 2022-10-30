import React ,  {useContext} from 'react'
import { useParams , Link } from "react-router-dom"
import { Loader } from '../utils/style/Atoms'
import { SurveyContext } from '../utils/style/context'
import { useFetch } from "../utils/hooks"
import { SurveyContainer , QuestionTitle , QuestionContent , LinkWrapper , ReplyBox , ReplyWrapper } from "../css/SurveyCss"

function Survey() {
    const questionNumber  = useParams()
    const questionNumberInt = parseInt(questionNumber.questionNumber)
    const prevQuestionNumber = questionNumberInt === 1 ? 1 : questionNumberInt - 1
    const nextQuestionNumber = questionNumberInt + 1
    const { data, isLoading , error } = useFetch(`http://localhost:8000/survey`)
    const { surveyData } = data
    const { answers, saveAnswers } = useContext(SurveyContext);
    
    function saveReply(answer) {
        saveAnswers({ [questionNumberInt]: answer })
    } 

    if (error) {
        return <span>Oups il y a eu un problème</span>
    }
    return (
        <SurveyContainer>
            <QuestionTitle> Question {questionNumberInt}</QuestionTitle>
            {isLoading ? (
                    <Loader />
            ) : (
                <QuestionContent>{surveyData[questionNumberInt]}</QuestionContent>
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
                {questionNumberInt === 7 ? (
                    <Link to="/results">Résultats</Link>
                    ) : (
                    <Link to={`/survey/${nextQuestionNumber}`}>Suivant</Link>
                )}
            </LinkWrapper>
        </SurveyContainer>
    )
}

export default Survey