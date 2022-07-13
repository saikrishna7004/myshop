import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { toast } from 'react-toastify'
import ReCAPTCHA from "react-google-recaptcha"
import Router from 'next/router'
import Image from 'next/image'

const Signup = ({ recaptcha, serverUrl }) => {

    const [data, setData] = useState({ email: "", password: "", username: "", cpassword: "" })
	const [captcha, setCaptcha] = useState('')

    const updateHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const recaptchaChange = (e) => {
        setCaptcha(e)
    }

    const signupHandler = async (e)=>{
        e.preventDefault()
        if(data.password!=data.cpassword){
            toast.error("Password and Confirm Password doesn't match")
			return
        }
		if(!captcha){
			return toast.error("Please Verify Captcha")
		}
        let dataFetch = await fetch("/api/signup", {
			method: "POST",
			body: `email=${data.email}&g-recaptcha-response=${captcha}&username=${data.username}&password=${data.password}`,
			headers: {
				"Content-type": "application/x-www-form-urlencoded",
			}
		})
		let result = await dataFetch.json()
        console.log(result)
		if(result.success){
			toast.success(result.msg)
            Router.push('/login')
        }
		else if(result.error=="timeout-or-duplicate"){
			toast.error("Captcha timeout")
            window.grecaptcha.reset()
		}
        else if(result.error=="Email is already taken"){
            toast.error("Email is already taken")
            window.grecaptcha.reset()
        }
        else if(result.error=="An error occurred during account creation"){
            toast.error("Username already exists")
            window.grecaptcha.reset()
        }
		else{
			toast.error("An error has occured")
            window.grecaptcha.reset()
		}
    }

    return (
        <>
		<Head>
            <title>Signup - MyShop</title>
		</Head>
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <span className='mx-auto h-12 w-auto'>
                        <Image src="/logo.svg" alt="Logo" height={60} width={450} />
                    </span>
                    <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">Create Your Account</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or
                        <Link href="/login"><a className="font-medium text-indigo-600 hover:text-indigo-500"> Sign in to Your Account </a></Link>
                        Now!
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={signupHandler}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email" className="sr-only">Email</label>
                            <input id="email" name="email" type="email" onChange={updateHandler} value={data.email} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email" />
                        </div>
                        <div>
                            <label htmlFor="username" className="sr-only">Username</label>
                            <input id="username" name="username" type="text" onChange={updateHandler} value={data.username} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Username" />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input id="password" pattern='.{6,}' title='Password must be 6 chars long' name="password" type="password" onChange={updateHandler} value={data.password} autoComplete="password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
                        </div>
                        <div>
                            <label htmlFor="cpassword" className="sr-only">Password</label>
                            <input id="cpassword" pattern='.{6,}' title='Password must be 6 chars long' name="cpassword" type="password" onChange={updateHandler} value={data.cpassword} autoComplete="password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Confirm Password" />
                        </div>
                        {data.password && data.password != data.cpassword && 
                        <div className="pt-2 text-red-500">Passwords doesn't match</div>
                        }
                    </div>
					<ReCAPTCHA sitekey={recaptcha} onChange={recaptchaChange} />
                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                            </span>
                            Create Account
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
	let recaptcha = process.env.RECAPTCHA_SITE_KEY
	let serverUrl = process.env.URL
    return {
        props: {recaptcha, serverUrl}, // will be passed to the page component as props
    }
}
export default Signup
