const {User} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')


function jswtSignUser (user) {
	const ONE_WEEK = 60 * 60 * 24* 7;
	return jwt.sign(user, config.authentication.jwtSecret, {
		expiresIn : ONE_WEEK
	})
}

module.exports = {
	
	async register (req, res) {
		try{
			const user = await User.create(req.body)
			res.send({user: user.toJSON()})
		}
		catch (err)
		{
			res.status(400).send({
				error: 'Email already in use'
			})
		}
	},

	async login (req, res) {
		try{
			const {email, password} = req.body
			const user = await User.findOne({
				where: {
					email: email
				}
			})

			if(!user) {
				return res.status(403).send({
					error: 'Email is incorrect'
				})
			}

			const isPasswordValid = await user.comparePassword(password)
			//const isPasswordValid = password === user.password
			if(!isPasswordValid){
				return res.status(403).send({
					error: 'MDP is Incorrect'
				}) 
			}		

			const userJson = user.toJSON()
			res.send({
				user: userJson,
				token: jswtSignUser(userJson)
			})
		}
		catch (err)
		{
			res.status(403).send({
				error: 'Error unhandeled'
			})
		}
	}

}