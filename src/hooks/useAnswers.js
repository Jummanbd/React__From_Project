import {getDatabase, ref, query, orderByKey, get} from 'firebase/database'
import { useEffect, useState } from "react";

export default function useAnswers(videoID) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [ answers, setAnswers] = useState([]);

    useEffect(() => {
        
        async function fetchAnswers() {
         // database related work
         const bd = getDatabase();
         const answersRef = ref(bd, 'answers/' + videoID + '/questions');
         const answersQuery = query(answersRef, orderByKey());

         try{
            setError(false);
            setLoading(true);
            // resquest firebase database 

            const snapshot = await get(answersQuery);
            setLoading(false);
            if(snapshot.exists()) {
                setAnswers((prevAnswers) => {
                    return [...prevAnswers, ...Object.values(snapshot.val())]
                })
            }
         } catch(err) {
            console.log(err);
            setLoading(false);
            setError(true)
         }


        }

        fetchAnswers();
    },[videoID]);

    return {
        loading,
        error, 
        answers,
    }
}