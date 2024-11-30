import express from 'express'

import { getMarkets, getMarketById, addMarket } from './market.controller.js'

const router = express.Router()

// We can add a middleware for the entire router:
// router.use(requireAuth)

router.get('/', getMarkets)
router.get('/:id', getMarketById)
router.post('/', addMarket)


export const marketRoutes = router