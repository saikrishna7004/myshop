import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect } from 'react'

export default function Home(props) {

	return (
		<>	
			<Head>
				<title>Home - MyShop</title>
			</Head>
			<div className='container mx-auto'>
				This is Home Page of this eCommerce Website
			</div>
		</>
	)
	
}
