import { useState, useEffect,useContext } from "react";
import { TOKEN_NAME } from "./util/app.constant";
import { authContext } from "./components/AuthContextProvider";
import axios from "axios"

const useFetch = (url)=>{
    const token = localStorage.getItem(TOKEN_NAME)
    const [Loading, setLoading] = useState(false);
    const [blogposts, setBlogposts] = useState([])

  const fetchUser = async()=> {

    try {
      setLoading(true)
      const request = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setLoading(false)

      console.log('request', request)
      setBlogposts(request.data)
    } catch (error) {
      setLoading(false)

      console.log('error', error)
    }
  
  }

}

export default useFetch