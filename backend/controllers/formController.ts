import type { Request, Response } from 'express'
import { Form } from '../models/Form.js'

const allowedServices = new Set([
  'Architectural glass',
  'Windows & doors',
  'Interior detailing',
  'Something else',
])

function readText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

export async function createFormSubmission(req: Request, res: Response): Promise<void> {
  const payload = req.body as Record<string, unknown> | null
  const name = readText(payload?.name)
  const email = readText(payload?.email).toLowerCase()
  const phone = readText(payload?.phone)
  const service = readText(payload?.service)
  const message = readText(payload?.message)

  if (!name || name.length > 100) {
    res.status(400).json({ message: 'Enter your name (up to 100 characters).' })
    return
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    res.status(400).json({ message: 'Enter a valid email address.' })
    return
  }
  if (!/^[+\d() .-]{7,30}$/.test(phone)) {
    res.status(400).json({ message: 'Enter a valid phone number.' })
    return
  }
  if (!allowedServices.has(service)) {
    res.status(400).json({ message: 'Choose one of the listed project services.' })
    return
  }
  if (!message || message.length > 2000) {
    res.status(400).json({ message: 'Add a short project description (up to 2,000 characters).' })
    return
  }

  try {
    await Form.create({ name, email, phone, service, message })
    res.status(201).json({ message: 'Your enquiry has been received.' })
  } catch (error) {
    console.error('Unable to save contact form submission:', error)
    res.status(500).json({ message: 'We could not save your enquiry. Please try again later.' })
  }
}