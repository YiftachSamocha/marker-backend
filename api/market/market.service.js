import { ObjectId } from 'mongodb'
import { logger } from '../../services/logger.service.js'
import { dbService } from '../../services/db.service.js'

const PAGE_SIZE = 3

export const marketService = {
	query,
	getById,
	add,
}

async function query(filterBy = { sort: 'email' }) {
	try {
		const sort = _buildSort(filterBy)
		const collection = await dbService.getCollection('market')
		var marketCursor = await collection.find().sort(sort)
		const markets = marketCursor.toArray()
		return markets
	} catch (err) {
		logger.error('cannot find markets', err)
		throw err
	}
}

async function getById(marketId) {
	try {
		const criteria = { _id: ObjectId.createFromHexString(marketId) }

		const collection = await dbService.getCollection('market')
		const market = await collection.findOne(criteria)

		market.createdAt = market._id.getTimestamp()
		return market
	} catch (err) {
		logger.error(`while finding market ${marketId}`, err)
		throw err
	}
}


async function add(market) {
	try {
		if (!market.email) throw 'Email inserion is mandatory'
		if (!_isValidEmail(market.email)) throw 'Email is not valid'
		const collection = await dbService.getCollection('market')
		const existedEmail = await collection.find({ email: market.email }).toArray()
		if (existedEmail.length > 0) throw 'Email is already in the system'
		market.createdAt = new Date()
		await collection.insertOne(market)
		return market
	} catch (err) {
		logger.error('cannot insert market', err)
		throw err
	}
}

function _isValidEmail(email) {
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	return emailRegex.test(email);
}





function _buildSort(filterBy) {
	const { sort } = filterBy
	if (sort === 'email') {
		return { email: 1 }
	} else if (sort === 'date') {
		return { createdAt: -1 }
	}

	return { email: 1 };
}