import {getDatabase, ref, query, orderByKey, get, startAt, limitToFirst} from 'firebase/database'
import { useEffect, useState } from "react";

export default function useVideoList(page) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [ videos, setVideos] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        
        async function fetchVideos() {
         // database related work
         const bd = getDatabase();
         const videosRef = ref(bd, 'videos');
         const videosQuery = query(videosRef, orderByKey(), startAt("" + page), limitToFirst(8) );

         try{
            setError(false);
            setLoading(true);
            // resquest firebase database 

            const snapshot = await get(videosQuery);
            setLoading(false);
            if(snapshot.exists()) {
                setVideos((prevVideos) => {
                    return [...prevVideos, ...Object.values(snapshot.val())]
                })
            }else{
                setHasMore(false)
            }
         } catch(err) {
            console.log(err);
            setLoading(false);
            setError(true)
         }


        }

        fetchVideos();
    },[page]);

    return {
        loading,
        error, 
        videos,
        hasMore,
    }
}