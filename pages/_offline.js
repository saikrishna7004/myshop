import Head from 'next/head'

export default function Offline(props) {

	return (
		<>	
			<Head>
				<title>Offline - MyShop</title>
			</Head>
			<div className='container mx-auto'>
				You are offline. Please connect to internet to resume services.
			</div>
		</>
	)
	
}
