import Link from 'next/link'
import Image from 'next/image'
import React, {useState, useEffect} from 'react'

const Navbar = (props) => {

    const [jwt, setJwt] = useState(false)
    useEffect(() => {
        setJwt(props.getCookie('jwt')!='')
    }, [])
     

    return (
        <header className="text-gray-600 body-font">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <Link href="/">
                    <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                        <Image src="/logo.svg" alt="Logo" style={{ height: "34px" }} height='34' width={34} />
                        <span className="ml-3 text-xl">My Shop</span>
                    </a>
                </Link>
                <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                    <Link href="/"><a className="mr-5 hover:text-gray-900">Home</a></Link>
                    <Link href="/about"><a className="mr-5 hover:text-gray-900">About</a></Link>
                    <Link href="/products"><a className="mr-5 hover:text-gray-900">Products</a></Link>
                    <Link href="/contact"><a className="mr-5 hover:text-gray-900">Contact Us</a></Link>
                    <Link href="/checkout"><a className="mr-5 hover:text-gray-900">Cart({props.cart.length})</a></Link>
                </nav>
                {
                    jwt?
                <Link href="/logout"><a className="inline-flex text-white bg-indigo-600 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-700 rounded text-sm mt-4 md:mt-0">Logout</a></Link>:
                <Link href="/login"><a className="inline-flex text-white bg-indigo-600 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-700 rounded text-sm mt-4 md:mt-0">Login</a></Link>
            }
            </div>
        </header>
    )

}

export default Navbar