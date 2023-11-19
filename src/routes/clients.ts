import { Router } from 'express'
import {
  createClient,
  listClients,
  findClient,
  updateClient,
  removeClient
} from './../controllers/clients'

const router = Router()

router.post('/', createClient)

router.get('/', listClients)

router.get('/:id', findClient)

router.put('/:id', updateClient)

router.delete('/:id', removeClient)

export default router
