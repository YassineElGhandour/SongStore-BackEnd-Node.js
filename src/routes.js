const AuthenticationController = require('./controllers/AuthenticationController')
const SongsController = require('./controllers/SongsController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')

module.exports = (app) => {

	app.post('/register', 
		AuthenticationControllerPolicy.register,
		AuthenticationController.register)

	app.post('/login', 
		AuthenticationController.login)

	app.get('/songs', 
		SongsController.index)

	app.post('/songs/add', 
		SongsController.post)

	app.get('/song/:songId', 
		SongsController.viewsong)

	app.put('/song/edit/:songId', 
		SongsController.putsong)
}