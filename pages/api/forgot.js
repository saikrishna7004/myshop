// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { stringify } from "postcss"

export default async function handler(req, res) {
	if(req.method==='POST'){
		console.log(req.body.email)
		let err = false
		let dataFetch = await fetch("https://www.google.com/recaptcha/api/siteverify", {
			method: "POST",
			body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${req.body['g-recaptcha-response']}`,
			headers: {
				"Content-type": "application/x-www-form-urlencoded",
			}
		})
		let result = await dataFetch.json()
		console.log(result)
		if(result.success){
			console.log("object")
			let forgotFetch = await fetch(process.env.URL+"/api/auth/forgot-password", {
				method: "POST",
				body: `email=${req.body.email}`,
				headers: {
					"Content-type": "application/x-www-form-urlencoded",
				}
			})
			result = await forgotFetch.json()
			console.log(result)
			if(result.ok){
				return res.status(200).json({success: true, error: err})
			}
		}
		if(result['error-codes']){
			err = result['error-codes'][0]
		}
		return res.json({success: false, error: err})
	}
	res.status(400).json({ error: 'Invalid method GET' })
}
