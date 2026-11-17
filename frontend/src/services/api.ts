export interface ContactFormInput {
  name: string
  email: string
  phone: string
  service: string
  message: string
}

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5001/api'

export async function submitContactForm(form: ContactFormInput): Promise<void> {
  let response: Response
  try {
    response = await fetch(`${API_BASE_URL}/forms`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
  } catch {
    throw new Error('We could not reach the server. Please try again in a moment.')
  }

  const result = await response.json() as { message?: string }
  if (!response.ok) throw new Error(result.message ?? 'We could not send your enquiry. Please try again.')
}