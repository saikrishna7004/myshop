import React, {useEffect} from 'react'
import Router from 'next/router'
import { toast } from 'react-toastify';

const Logout = ({getCookie, setCookie}) => {
    useEffect(() => {
        let jwt = getCookie('jwt')
        if(jwt){
            setCookie('jwt', '')
            Router.push('/').then(()=>{
                toast.success("Logout Successful")
            })
        }
        else{
            Router.push('/')
        }
    }, [])
    
}

export default Logout