import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

const Signup = () => {

    const [data, setData] = useState({ email: "", password: "", username: "", cpassword: "" })
    const [checked, setChecked] = useState(false)

    const updateHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const checkedHandler = (e)=>{
        setChecked(e.target.checked)
    }

    return (
        <>
		<Head>
            <title>Signup - MyShop</title>
		</Head>
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create Your Account</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or
                        <Link href="/login"><a className="font-medium text-indigo-600 hover:text-indigo-500"> Sign in to Your Account </a></Link>
                        Now!
                    </p>
                </div>
                <form className="mt-8 space-y-6" method='post' action=''>
                    <input type="hidden" name="remember" value="true" />
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
                            <input id="password" name="password" type="password" onChange={updateHandler} value={data.password} autoComplete="password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
                        </div>
                        <div>
                            <label htmlFor="cpassword" className="sr-only">Password</label>
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
                            Create Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )

}

export default Signup
