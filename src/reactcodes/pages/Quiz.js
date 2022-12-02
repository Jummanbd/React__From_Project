
import Answers from '../Answers.js';
import ProgressBar from '../ProgressBar.js';
import MiniPlayer from '../MiniPlayer.js';
import { useParams, useHistory } from 'react-router-dom';
import useQestions from '../../hooks/useQuestions.js'
import { useEffect, useReducer, useState } from 'react';
import _ from 'lodash';
import { useAuth } from '../../contexts/AuthContext.js';
import { getDatabase, ref, set } from 'firebase/database';

const initialState = null;

const reducer = (state, action) => {
  switch(action.type){
    case "questions": 
    action.value.forEach(question => {
      question.options.forEach(option => {
        option.checked = false;
      })
    });
    return action.value;

    case "answer": 
    const questions = _.cloneDeep(state);
    questions[action.questionID].options[action.optionIndex].checked = action.value;

    return questions;
    default:
      return state;
  }
}

export default function Quiz() {
  const {id} = useParams();
  const {loading, error, questions} = useQestions(id);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [qna, dispatch] = useReducer(reducer, initialState);
  const {currentUser} = useAuth();
  const history = useHistory();
  const {location} = history;
  const {state} = location;
  const {videoTitle} = state;



  useEffect(() => {
    dispatch({
      type: 'questions',
      value: questions,
    })
  }, [questions]);

  function handleAnswerChange(e, index) {
    dispatch({
      type:'answer',
      questionID: currentQuestion,
      optionIndex: index,
      value: e.target.checked,
    })
  }


  function nextQuestion() {
    if(currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prevCurrent) => prevCurrent + 1);
    }
  }


  function prevQuestion() {
    if(currentQuestion>=1 && currentQuestion <= questions.length) {
      setCurrentQuestion((prevCurrent) => prevCurrent - 1);
    }
  }

  async function submit() {
    const {uid} = currentUser;
    const bd = getDatabase();
    const resultRef = ref(bd, `result/${uid}`);
    await set(resultRef,{
      [id]: qna
    });
    history.push({
      pathname: `/result/${id}`,
      state: {
        qna,

      }
    })
  }

  const percentage = questions.length > 0 ? ((currentQuestion + 1 ) / questions.length) * 100 : 0;

    return(
      <>
      {loading &&  <div>Loading ...</div>}
      {error &&  <div>There was an error!</div>}
      {!loading && !error && qna && qna.length > 0 && (
        <>
        <h1>{qna[currentQuestion].title}</h1>
        <h4>Question can have multiple answers</h4>
        <Answers input options = {qna[currentQuestion].options} handleChange = {handleAnswerChange} />
        <ProgressBar  next = {nextQuestion} prev = {prevQuestion}  submit = {submit} progress ={percentage}/>
        <MiniPlayer id = {id} title = {videoTitle} />
        </>
      )}
        
      </>
    )
}