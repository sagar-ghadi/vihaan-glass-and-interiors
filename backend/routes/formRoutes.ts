import { Router } from 'express'
import { createFormSubmission } from '../controllers/formController.js'

const formRoutes = Router()
formRoutes.get('/', (_req, res) => res.json({
	message: 'Submit a contact enquiry with POST.',
	method: 'POST',
	requiredFields: ['name', 'email', 'phone', 'service', 'message'],
}))
formRoutes.post('/', createFormSubmission)

export default formRoutes