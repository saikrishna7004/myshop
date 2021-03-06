import React from 'react'
import { useState } from 'react'
import Router from 'next/router'
import jwtDecode from 'jwt-decode'
import { toast } from 'react-toastify';
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

const Login = ({ setCookie, setCart, setReloadKey }) => {

    const [data, setData] = useState({ identifier: "", password: "" })
    const [checked, setChecked] = useState(false)

    const updateHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const checkedHandler = (e)=>{
        setChecked(e.target.checked)
    }

    const loginHandler = async (e) => {
        e.preventDefault()
        try {
            let dataFetch = await fetch(process.env.URL+"/api/auth/local", {
                method: "POST",
                body: JSON.stringify({
                    ...data
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            })
            let res = await dataFetch.json()
            console.log(res)
            if(res.error){
                if(res.error.name==="ValidationError"){
                    toast.error(res.error.message)
                }
            }
            if(res.user){
                if(!res.user.confirmed){
                    toast.error("Please Confirm your account with Email sent")
                    return
                }
            }
            if (res.jwt) {
                let expiry = checked?3:1
                setCookie('jwt', res.jwt, expiry)
                fetch(process.env.URL + '/api/users/me', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + res.jwt
                    },
                }).then(data => data.json()).then((user) => {
                    fetch(process.env.URL + '/api/carts/?filters[username]=' + user.username, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + res.jwt
                        },
                    }).then(data=>data.json()).then((data)=>{
                        setCart(data.data[0].attributes.products)
                    })
                })
                Router.push("/").then(()=>{
                    toast.success('Login Successful')
                })
            }
        } catch (err) {
            toast.error("Internal Server Error")
        }
    }

    return (
        <>
		<Head>
            <title>Login - MyShop</title>
		</Head>
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <span className='mx-auto h-12 w-auto'>
                        <Image src="/logo.svg" alt="Logo" height={60} width={450} />
                    </span>
                    <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">Sign in to Your Account</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or
                        <Link href="/signup"><a className="font-medium text-indigo-600 hover:text-indigo-500"> Create Your Account </a></Link>
                        Now!
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={loginHandler}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="identifier" className="sr-only">Username or Email</label>
                            <input id="identifier" name="identifier" type="text" onChange={updateHandler} value={data.identifier} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Username or Email" />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input id="password" name="password" type="password" onChange={updateHandler} value={data.password} autoComplete="password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input id="remember-me" checked={checked} onChange={checkedHandler} name="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer" />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 cursor-pointer"> Remember me </label>
                        </div>

                        <div className="text-sm">
                            <Link href="/forgot"><a className="font-medium text-indigo-600 hover:text-indigo-500"> Forgot your password? </a></Link>
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                            </span>
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

export async function getServerSideProps(context) {
    if (context.req.cookies.jwt) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return {
        props: {}, // will be passed to the page component as props
    }
}

export default Login
