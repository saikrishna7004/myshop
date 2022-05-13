import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect } from 'react'

const Products = (props) => {

	return (
		<>
		<Head>
			<title>eCommerce - Products</title>
		</Head>
		<section className="text-gray-600 body-font">
		<div className="container px-5 py-2 mx-auto">
			<div className="flex flex-wrap w-full mb-2 md:mb-20">
			<div className="lg:w-1/2 w-full mb-6 lg:mb-0">
				<h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Products List - MyShop</h1>
				<div className="h-1 w-20 bg-indigo-500 rounded"></div>
			</div>
			</div>
			<div className="flex flex-wrap m-4">
			{props.products.data.map((item)=>{
				return (
					<div className="xl:w-1/4 md:w-1/2 p-4" key={item.id}>
						<div className="bg-gray-100 p-6 rounded-lg">
							<img className="h-40 rounded w-full object-contain object-center mb-6" src={"http://localhost:1337"+item.attributes.image.data.attributes.url} alt="content"/>
							<p className="tracking-widest text-indigo-600 text-xs font-medium title-font">Sponsored</p>
							<h2 className="text-lg text-gray-900 font-medium title-font mb-2">{item.attributes.title}</h2>
							<p className="leading-relaxed text-base">{item.attributes.description}</p>
							<Link href={`product/${item.attributes.slug}`}>
								<button className="inline-flex text-white bg-indigo-600 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-700 rounded text-sm mt-4">
									Buy Now
								</button>
							</Link>
						</div>
					</div>
				)
			})}
			</div>
		</div>
		</section>
		</>
	)
	
}

export async function getServerSideProps(context) {
	let a = await fetch("http://localhost:1337/api/products?populate=*", {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer 8aeb07d8b2b0fad0e5a88bce627ccf5248e36f708b75cf2b6feb454596f3eb8ab3da2d23718e10ab0ae42ff8e34205afc7bb63a4bfcf9feb8f40a83a59e277762f2f3382555b2e9c81456c56c1975ad29815d0d6cd9310355b763bde040e5fe56848f962dc9cc25df0f1ba322c69a69af96a00b9e68b9aeef6c6f1dacfaa481f'
		},
	})
	let products = await a.json()
	return {
		props: {products},
	}
}

export default Products