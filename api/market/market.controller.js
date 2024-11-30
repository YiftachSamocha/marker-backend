import { logger } from '../../services/logger.service.js'
import { marketService } from './market.service.js'


export async function getMarkets(req, res) {
	try {
		const filterBy = {
			sort: req.query.sort || '',
		}
		const markets = await marketService.query(filterBy)
		res.json(markets)
	} catch (err) {
		logger.error('Failed to get markets', err)
		res.status(400).send({ err: 'Failed to get markets' })
	}
}

export async function getMarketById(req, res) {
	try {
		const marketId = req.params.id
		const market = await marketService.getById(marketId)
		res.json(market)
	} catch (err) {
		logger.error('Failed to get market', err)
		res.status(400).send({ err: 'Failed to get market' })
	}
}

export async function addMarket(req, res) {
	const { body: market } = req

	try {
		const addedmarket = await marketService.add(market)
		res.json(addedmarket)
	} catch (err) {
		logger.error('Failed to add market', err)
		res.status(400).send({ err: 'Failed to add market' })
	}
}