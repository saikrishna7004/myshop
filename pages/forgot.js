import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Router from 'next/router'
import jwtDecode from 'jwt-decode'
import { toast } from 'react-toastify';
import Head from 'next/head';
import ReCAPTCHA from "react-google-recaptcha"

const Forgot = ({ recaptcha, serverUrl }) => {

    const [email, setEmail] = useState('')
	const [captcha, setCaptcha] = useState('')
	const [data, setData] = useState({email: '', password: '', cpassword: ''})

    const updateHandlerEmail = (e) => {
        setEmail(e.target.value)
    }

    const updateHandler = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }

    const recaptchaChange = (e) => {
        setCaptcha(e)
    }

	let router = useRouter()

	const resetPass = async ()=>{
		let dataFetch = await fetch(serverUrl+"/api/auth/reset-password", {
			method: "POST",
			body: JSON.stringify({
				code: router.query.code,
				password: password,
				passwordConfirmation: cpassword
			}),
			headers: {
				"Content-type": "application/x-www-form-urlencoded",
			}
		})
		let result = await dataFetch.json()
		console.log(result)
		if(result.error){
			toast.error(result.error.message)
		}
		else{
			toast.success("Password Reset Successful")
			Router.push('/login')
		}
	}

	if(router.query.code){
		return (
			<>
			<Head>
				<title>Reset Password - MyShop</title>
			</Head>
			<div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-md w-full space-y-8">
					<div>
						<img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
						<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Reset your Password</h2>
						<p className="mt-2 text-center text-sm text-gray-600">
							Click here to
							<a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500"> Sign in to Your Account </a>
						</p>
					</div>
					<form className="mt-8 space-y-6" onSubmit={resetPass}>
						<div className="rounded-md shadow-sm -space-y-px">
							<div>
								<label htmlFor="password" className="sr-only">Password</label>
								<input id="password" name="password" type="password" onChange={updateHandler} value={data.password} autoComplete="password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
							</div>
							<div>
								<label htmlFor="cpassword" className="sr-only">Confirm Password</label>
								<input id="cpassword" name="cpassword" type="password" onChange={updateHandler} value={data.cpassword} autoComplete="password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Confirm Password" />
							</div>
							{data.password && data.password != data.cpassword && 
							<div className="pt-2 text-red-500">Passwords doesn't match</div>
							}
						</div>

						<div>
							<button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
								<span className="absolute left-0 inset-y-0 flex items-center pl-3">
									<svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
									</svg>
								</span>
								Reset Password
							</button>
						</div>
					</form>
				</div>
			</div>
			</>
		)
	}

	const forgotHandler = async (e)=>{
		e.preventDefault()
		console.log(e)
		if(!captcha){
			return toast.error("Please Verify Captcha")
		}
		let dataFetch = await fetch("/api/forgot", {
			method: "POST",
			body: `email=${email}&g-recaptcha-response=${captcha}`,
			headers: {
				"Content-type": "application/x-www-form-urlencoded",
			}
		})
		let result = await dataFetch.json()
		if(result.success)(
			toast.success("Reset link has been sent to your Email")
		)
		else if(result.error=="timeout-or-duplicate"){
			toast.error("Captcha timeout")
		}
		else{
			toast.error("An error has occured")
		}
	}

    return (
        <>
		<Head>
            <title>Forgot Password - MyShop</title>
		</Head>
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Forgot Password</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Enter your email to send activtion link to your email
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={forgotHandler}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className='mb-2'>
                            <label htmlFor="email" className="sr-only">Email</label>
                            <input id="email" name="email" type="text" onChange={updateHandlerEmail} value={email} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email" />
                        </div>
						<div className='text-sm text-gray-600'>Don't worry, we don't share your email with anyone</div>
                    </div>
					<ReCAPTCHA sitekey={recaptcha} onChange={recaptchaChange} />
                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                            </span>
                            Send Password Reset Link
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

export default Forgot
