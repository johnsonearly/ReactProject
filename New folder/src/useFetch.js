import { useState, useEffect } from "react";

const useFetch = (url)=>{
    const [data, setData] = useState(null );
    const[isPending,setPending] = useState(true);
    const[error,setError] = useState(null)
    //useffect is used to perform a specific operation upon every render

   //In order to ensure it only renders once we use the emmpty braces to do it

    useEffect(()=>{
        fetch(url)
        .then(res=>{
            if(!res.ok){
                throw Error("Could not fetch the data")
            }

            return res.json();
        })
        .then(data =>{
            setTimeout(() => {
                setData(data);
                setPending(false);
            }, 3000);
        })
        .catch(err =>{
            setError(err.message);
        })
    
       },[url])
       return {data, isPending,error};
}


export default useFetch