import {getDatabase, ref, query, orderByKey, get} from 'firebase/database'
import { useEffect, useState } from "react";

export default function useQuestions(videoID) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [ questions, setQuestions] = useState([]);

    useEffect(() => {
        
        async function fetchQuestions() {
         // database related work
         const bd = getDatabase();
         const quizRef = ref(bd, 'quiz/' + videoID + '/questions');
         const quizQuery = query(quizRef, orderByKey());

         try{
            setError(false);
            setLoading(true);
            // resquest firebase database 

            const snapshot = await get(quizQuery);
            setLoading(false);
            if(snapshot.exists()) {
                setQuestions((prevQuestions) => {
                    return [...prevQuestions, ...Object.values(snapshot.val())]
                })
            }
         } catch(err) {
            console.log(err);
            setLoading(false);
            setError(true)
         }


        }

        fetchQuestions();
    },[videoID]);

    return {
        loading,
        error, 
        questions,
    }
}