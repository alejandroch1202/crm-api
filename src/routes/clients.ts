import { Router } from 'express'
import { create, list, find, update, remove } from './../controllers/clients'

const router = Router()

router.post('/', create)

router.get('/', list)

router.get('/:id', find)

router.put('/:id', update)

router.delete('/:id', remove)

export default router
