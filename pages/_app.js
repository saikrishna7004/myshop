import Navbar from '../components/Navbar'
import '../styles/globals.css'
import Head from 'next/head'
import { useState, useEffect } from 'react'

function MyApp({ Component, pageProps }) {
	const [cart, setCart] = useState([])
	const [reloadKey, setReloadKey] = useState(1)
	const addToCart = (item, qty, price)=>{
		for (let i = 0; i < qty; i++) {
			let newCart = cart
			let res = newCart.filter(o=>o.item===item)
			if(res.length!=0){
				res.map(o=>o.qty=o.qty+1)
			}
			else{
				newCart.push({item, price, qty: 1})
			}
			setCart(newCart)
			localStorage.setItem('cart', JSON.stringify(newCart)) 
			console.table(newCart)
		}
		setReloadKey(Math.random())
	}
	const removeFromCart = (item, qty)=>{
		let newCart = cart
		let res = newCart.filter(o=>o.item===item)
		console.log("res = ",res, qty)
		if(res.length!=0){
			if(res[0].qty>qty){
				res.map(o=>o.qty=o.qty-qty)
			}
			else if(res[0].qty===qty){
				newCart.splice(newCart.map(o=>o.item).indexOf(item), 1)
			}
		}
		setCart(newCart)
		localStorage.setItem('cart', JSON.stringify(newCart)) 
		console.table(newCart)
		setReloadKey(Math.random())
	}
	const clearCart = ()=>{
		setCart([])
		localStorage.setItem('cart', '') 
		setReloadKey(Math.random())
	}
	useEffect(() => {
		let myCart = localStorage.getItem('cart')
		if (myCart) {
			myCart = JSON.parse(myCart)
		}
		else{
			myCart = []
		}
		if(myCart){
			setCart(myCart)
		}
	}, [])
	
	return <>
		<Navbar key={reloadKey} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} />
		<Head>
			<meta name="description" content="Website made by Sai Krishna Karnati using Next.js, React.js and Strapi" />
		</Head>
		<Component {...pageProps} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} />
	</>
}

export default MyApp
