import { asyncLocalStorage } from '../services/als.service.js'

export async function setupAsyncLocalStorage(req, res, next) {
	const storage = {}
    
	asyncLocalStorage.run(storage, () => {
		if (!req.cookies?.loginToken) return next()
		
		next()
	})
}
