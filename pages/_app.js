import Navbar from '../components/Navbar'
import '../styles/globals.css'
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
	const [cart, setCart] = useState([])
	const [reloadKey, setReloadKey] = useState(1)
	useEffect(() => {
		let jwt = getCookie('jwt')
		if (jwt) {
			fetch(process.env.URL + '/api/users/me', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + jwt
				},
			}).then(data => data.json()).then((user) => {
				fetch(process.env.URL + '/api/carts/?filters[username]=' + user.username, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': 'Bearer ' + jwt
					},
				}).then(data => data.json()).then((data) => {
					setCart(data.data[0].attributes.products)
				})
			})
		}
	}, [])

	const uploadCart = (newCart) => {
		let jwt = getCookie('jwt')
		if (!jwt) { return }
		fetch(process.env.URL + '/api/users/me', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + jwt
			},
		}).then(data => data.json()).then((user) => {
			fetch(process.env.URL + '/api/carts/?filters[username]=' + user.username, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + jwt
				},
			}).then(data=>data.json()).then((data) => {
				console.log(data.data[0].id)
				fetch(process.env.URL + '/api/carts/' + data.data[0].id, {
					method: 'PUT',
					body: JSON.stringify({
						"data": { "products": newCart }
					}),
					headers: {
						'Content-Type': 'application/json',
						'Authorization': 'Bearer ' + jwt
					},
				})
			})
		})
	}
	const addToCart = (item, qty, price, name) => {
		let newCart = cart
		for (let i = 0; i < qty; i++) {
			let res = newCart.filter(o => o.item === item)
			if (res.length != 0) {
				res.map(o => o.qty = o.qty + 1)
			}
			else {
				newCart.push({ item, price, name, qty: 1 })
			}
		}
		setCart(newCart)
		localStorage.setItem('cart', JSON.stringify(newCart))
		uploadCart(newCart)
		setReloadKey(Math.random())
	}
	const removeFromCart = (item, qty) => {
		let newCart = cart
		let res = newCart.filter(o => o.item === item)
		if (res.length != 0) {
			if (res[0].qty > qty) {
				res.map(o => o.qty = o.qty - qty)
			}
			else if (res[0].qty === qty) {
				newCart.splice(newCart.map(o => o.item).indexOf(item), 1)
			}
		}
		setCart(newCart)
		localStorage.setItem('cart', JSON.stringify(newCart))
		uploadCart(newCart)
		setReloadKey(Math.random())
	}
	const clearCart = () => {
		setCart([])
		localStorage.setItem('cart', '')
		uploadCart([])
		setReloadKey(Math.random())
	}
	const setCookie = (cname, cvalue, exdays) => {
		const d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		let expires = "expires=" + d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
		setReloadKey(Math.random())
	}
	const getCookie = (cname) => {
		let name = cname + "=";
		let decodedCookie = decodeURIComponent(document.cookie);
		let ca = decodedCookie.split(';');
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}
	useEffect(() => {
		let myCart = localStorage.getItem('cart')
		if (myCart) {
			myCart = JSON.parse(myCart)
		}
		else {
			myCart = []
		}
		if (myCart) {
			setCart(myCart)
		}
	}, [])

	return <>
		<Navbar key={reloadKey} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} setCookie={setCookie} getCookie={getCookie} />
		<Component {...pageProps} cart={cart} setCart={setCart} setReloadKey={setReloadKey} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} setCookie={setCookie} getCookie={getCookie} />
		<ToastContainer />
	</>
}

export default MyApp
