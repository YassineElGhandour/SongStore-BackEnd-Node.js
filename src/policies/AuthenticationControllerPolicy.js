const Joi = require('joi')


module.exports = {
	register (req, res, next){
		const schema = {
			email : Joi.string().email(),
			password : Joi.string().regex(
				new RegExp(
					`(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$`
					))
		}

		const {error, value} = Joi.validate(req.body, schema)

		if(error){
			switch(error.details[0].context.key){
				case 'email':
					res.status(400).send({
						error: 'You must provide a valid email'
					})
					break
				case 'password':
					res.status(400).send({
						error: `Weak password, try an other one`
					})
					break
				default:
					res.status(400).send({
						error: `Dunno`
					})
					break

			}
		}
		else {
			next()			
		}		
	}
}