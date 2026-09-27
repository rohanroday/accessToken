import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Me = () => {

    const user = useSelector(state => state.auth.user)
    const accessToken = useSelector(state => state.auth.accessToken)

    const dispatch = useDispatch()
    const api = axios.create({
        withCredentials:true,
    })
    api.interceptors.request.use(config=>{
        config.headers.Authorization = `Bearer ${accessToken}`
        return config
    })

    api.interceptors.response.use(res=>res,
        async (error) =>{
            if(error.response.status === 401){
                const response = await axios.post("http://localhost:3000/api/auth/refresh")
            }
        }
    )

  return (
    <div>Me</div>
  )
}

export default Me