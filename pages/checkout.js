import React, { useState, useEffect } from 'react'
import Head from 'next/head'

const Checkout = (props) => {
	const [total, setTotal] = useState(0)
	const [step, setStep] = useState(1)
	const [checkout, setCheckout] = useState(true)
	const [s1State, setS1State] = useState("")
	const [s2State, setS2State] = useState("hidden")
	const [s3State, setS3State] = useState("hidden")
	useEffect(() => {
		let s = 0
		props.cart.forEach(item => {
			s += item.price * item.qty
		})
		setTotal(s)
	}, [JSON.stringify(props.cart)])
	const gotoStep = (i) => {
		if (i == 1) {
			setS1State("")
			setS2State("hidden")
			setS3State("hidden")
		}
		else if (i == 2) {
			setS1State("hidden")
			setS2State("")
			setS3State("hidden")
		}
		else if (i == 3) {
			setS1State("hidden")
			setS2State("hidden")
			setS3State("")
		}
	}

	return (
		<>
			<Head>
				<title>Checkout - MyShop</title>
			</Head>
			{/* <div className='container md:mx-auto mx-4 mb-4 overflow-auto' style={{ color: "green", fontSize: "20px", fontWeight: "bold" }}>
				<pre><code>{JSON.stringify(props.cart, null, 4)}</code></pre>
			</div> */}
			<div className="container md:mx-auto mx-4 mb-4">
				{(props.cart.length === 0) ? (
					<div className='text-xl'><span>Cart Empty, </span><a className='text-blue-900 font-bold' href="/products">Add</a> a product now</div>
				) : (
					<button onClick={() => { props.clearCart() }} className="mt-4 text-white bg-indigo-600 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-700 rounded">Clear Cart</button>
				)}
				{props.cart.map((item) => {
					return (
						<div className="py-8 md:flex flex-wrap md:flex-nowrap" key={item.item}>
							<div className="md:flex-grow">
								<h2 className="text-2xl font-medium text-gray-900 title-font mb-2">{item.name}</h2>
								<p className="leading-relaxed">Price: &#8377; {item.price}</p>
								<p className="leading-relaxed">Quantity: {item.qty}</p>
							</div>
							<div className="md:w-64 md:mb-0 mb-6 md:mt-0 mt-4 flex-shrink-0 flex md:flex-col">
								<div className="w-100 flex items-center">
									<button onClick={() => { props.removeFromCart(item.item, 1) }} className="flex ml-auto text-white bg-indigo-600 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-700 rounded">-</button>
									<span className="flex ml-5">{item.qty}</span>
									<button onClick={() => { props.addToCart(item.item, 1, item.price, item.name) }} className="flex ml-5 text-white bg-indigo-600 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-700 rounded">+</button>
								</div>
							</div>
						</div>
					)
				})}
				{(props.cart.length === 0) ? ('') : (<div className='mb-8 text-2xl'><b>Total Amount: </b>₹ {total}</div>)}
				{(props.cart.length === 0 || !props.getCookie('jwt')) ? ('') : (
					<button onClick={() => { setCheckout(false) }} className="text-white bg-indigo-600 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-700 rounded">Checkout</button>
				)}
			</div>
			<div className="text-gray-600 body-font fixed top-0 bottom-0 bg-white min-h-screen w-full md:py-5" onClick={() => { setCheckout(true) }} hidden={checkout} style={{ background: "rgba(0, 0, 0, 0.2)" }}>
				<div className="container relative px-5 py-10 mx-auto flex flex-wrap flex-col md:w-1/2 w-full h-full overflow-y-auto" onClick={e => e.stopPropagation()} style={{ background: "white", flexFlow: "column" }}>
					<div className="flex md:mx-auto flex-wrap mb-10 justify-center">
						<button type="button" onClick={() => { setCheckout(true) }} className="btn-close absolute top-2 right-2 box-content w-10 h-10 p-1 text-black border-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline bg-white rounded-md inline-flex items-center justify-center hover:bg-gray-100 focus:ring-2 focus:ring-inset focus:ring-neutral-300 text-lg" data-bs-dismiss="modal" aria-label="Close">
							<svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
							</svg>
						</button>
						<button onClick={() => { gotoStep(1) }}
							className={"sm:px-6 py-3 w-1/3 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center tracking-wider leading-none cursor-pointer " + `${!s1State ? "bg-gray-100 border-indigo-500 text-indigo-500 rounded-t" : "border-gray-200 hover:text-gray-900"}`}>
							<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5 mr-3" viewBox="0 0 24 24">
								<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
							</svg>Delivery Address
						</button>
						<button onClick={() => { gotoStep(2) }}
							className={"sm:px-6 py-3 w-1/3 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center tracking-wider leading-none cursor-pointer " + `${!s2State ? "bg-gray-100 border-indigo-500 text-indigo-500 rounded-t" : "border-gray-200 hover:text-gray-900"}`}>
							<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5 mr-3" viewBox="0 0 24 24">
								<path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
							</svg>Delivery Method
						</button>
						<button onClick={() => { gotoStep(3) }}
							className={"sm:px-6 py-3 w-1/3 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center tracking-wider leading-none cursor-pointer " + `${!s3State ? "bg-gray-100 border-indigo-500 text-indigo-500 rounded-t" : "border-gray-200 hover:text-gray-900"}`}>
							<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5 mr-3" viewBox="0 0 24 24">
								<circle cx="12" cy="5" r="3"></circle>
								<path d="M12 22V8M5 12H2a10 10 0 0020 0h-3"></path>
							</svg>Review and Pay
						</button>
					</div>
					<div className={"flex flex-col w-4/5 mx-auto " + `${s1State}`} id="s1">
						<h1 className="text-xl font-medium title-font mb-4 text-gray-900">Address Information</h1>
						<div className="relative mb-4">
							<label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
							<input type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
						</div>
						<div className="relative mb-4">
							<label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
							<input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
						</div>
						<div className="relative mb-4">
							<label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
							<textarea id="address" name="address" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
						</div>
						<button onClick={() => { gotoStep(2) }} className="text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 w-100 lg:w-1/4 rounded">Next</button>
					</div>
					<div className={"flex flex-col w-4/5 mx-auto " + `${s2State}`} id="s2">
						<h1 className="text-xl font-medium title-font mb-4 text-gray-900">Choose a delivery option:</h1>
						<div class="flex">
							<div>
								<div class="form-check p-1 my-1">
									<input class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:border-4 checked:border-blue-600 focus:outline-none transition duration-100 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
									<label class="form-check-label inline-block text-gray-800 cursor-pointer" htmlFor="flexRadioDefault1">
										1 Day Delivery
										<span className="text-gray-500">&nbsp;( ₹100 )</span>
									</label>
								</div>
								<div class="form-check p-1 my-1">
									<input class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:border-4 checked:border-blue-600 focus:outline-none transition duration-100 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
									<label class="form-check-label inline-block text-gray-800 cursor-pointer" htmlFor="flexRadioDefault2">
										2 Day Delivery
										<span className="text-gray-500">&nbsp;( ₹50 )</span>
									</label>
								</div>
								<div class="form-check p-1 my-1">
									<input class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:border-4 checked:border-blue-600 focus:outline-none transition duration-100 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault" id="flexRadioDefault3" />
									<label class="form-check-label inline-block text-gray-800 cursor-pointer" htmlFor="flexRadioDefault3">
										Normal Delivery
									</label>
								</div>
							</div>
						</div>
						<button onClick={() => { gotoStep(3) }} className="my-4 text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 w-100 lg:w-1/4 rounded">Next</button>
					</div>
					<div className={"flex flex-col w-4/5 mx-auto " + `${s3State}`} id="s3">
						<h1 className="text-xl font-medium title-font mb-4 text-gray-900">Confirm Payment:</h1>
						<div className="md:flex-grow flex">
							<p className="text-xl w-4/12 font-medium text-gray-900 title-font mb-2">Item</p>
							<p className="text-xl w-4/12 font-medium text-gray-900 text-center">Quantity</p>
							<p className="text-xl w-4/12 font-medium text-gray-900 text-right">Total Price</p>
						</div>
						{props.cart.map((item) => {
							return (
								<div className="py-2 md:flex flex-wrap md:flex-nowrap" key={item.item}>
									<div className="md:flex-grow flex">
										<p className="text-xl w-4/12 text-black title-font mb-2">{item.name}</p>
										<p className="leading-relaxed w-4/12 text-center">{item.qty} X ₹ {item.price}</p>
										<p className="leading-relaxed w-4/12 text-right">₹ {item.qty * item.price}</p>
									</div>
								</div>
							)
						})}
						<button onClick={() => { gotoStep(1) }} className="text-white md:ml-auto bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 w-100 lg:w-1/4 rounded">Next</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default Checkout