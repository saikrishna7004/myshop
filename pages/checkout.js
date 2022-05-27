import React, { useState, useEffect } from 'react'
import Head from 'next/head'

const Checkout = (props) => {
	const [total, setTotal] = useState(0)
	useEffect(() => {
		let s = 0
		props.cart.forEach(item => {
			s += item.price * item.qty
		})
		setTotal(s)
	}, [JSON.stringify(props.cart)])
	
	return (
		<>
			<Head>
				<title>Checkout - MyShop</title>
			</Head>
			{/* <div className='container md:mx-auto mx-4 mb-4 overflow-auto' style={{ color: "green", fontSize: "20px", fontWeight: "bold" }}>
				<pre><code>{JSON.stringify(props.cart, null, 4)}</code></pre>
			</div> */}
			<div className="container md:mx-auto mx-4 mb-4">
				{(props.cart.length===0)?(
					<div className='text-xl'><span>Cart Empty, </span><a className='text-blue-900 font-bold' href="/products">Add</a> a product now</div>
				):(
					<button onClick={()=>{props.clearCart()}} className="mt-4 text-white bg-indigo-600 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-700 rounded">Clear Cart</button>
				)}
				{props.cart.map((item)=>{
					return(
						<div className="py-8 md:flex flex-wrap md:flex-nowrap" key={item.item}>
							<div className="md:flex-grow">
								<h2 className="text-2xl font-medium text-gray-900 title-font mb-2">{item.name}</h2>
								<p className="leading-relaxed">Price: &#8377; {item.price}</p>
								<p className="leading-relaxed">Quantity: {item.qty}</p>
							</div>
							<div className="md:w-64 md:mb-0 mb-6 md:mt-0 mt-4 flex-shrink-0 flex md:flex-col">
							<div className="w-100 flex items-center">
								<button onClick={()=>{props.removeFromCart(item.item, 1)}} className="flex ml-auto text-white bg-indigo-600 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-700 rounded">-</button>
								<span className="flex ml-5">{item.qty}</span>
								<button onClick={()=>{props.addToCart(item.item, 1, item.price, item.name)}} className="flex ml-5 text-white bg-indigo-600 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-700 rounded">+</button>
							</div>
							</div>
						</div>
					)
				})}
				{(props.cart.length===0)?(''):(<div className='mb-8 text-2xl'><b>Total Amount: </b>₹ {total}</div>)}
			</div>
		</>
	)
}

export default Checkout