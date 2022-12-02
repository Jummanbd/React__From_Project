import { useHistory, useParams } from 'react-router-dom';
import useAnswers from '../../hooks/useAnswers';
import Analysis from '../Analysis';
import Summary from '../Summary';
import _ from 'lodash';

export default function Result() {
    const {id} = useParams();
    const {location} = useHistory();
    const {state} = location;
    const {qna} = state;
    const {loading, error, answers} = useAnswers(id);

    function calculate() {
        let score = 0;
        answers.forEach((question, index1) => {
            let correntIndexs = [];
           let checkedIndexes = [];
            question.options.forEach((option, index2) => {
                if(option.carrect) correntIndexs.push(index2);
                if(qna[index1].options[index2].checked){
                    checkedIndexes.push(index2);
                    option.checked = true;
                }
            });
            if( _.isEqual(correntIndexs, checkedIndexes)){
                score = score + 5;
            }
        });
        return score;

    }

    const useScore = calculate();
    return(
        <>
        {loading && <div>loading... </div>}
        {error && <div>There was an error!</div>}
        {answers && answers.length > 0 && (
            <>
                <Summary score = {useScore} noq = {answers.length}/>
                <Analysis answers = {answers}/>
            </>
        )}
        </>
    )
}