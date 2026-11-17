import { useEffect, useRef, useState, type FormEvent } from 'react'
import { submitContactForm, type ContactFormInput } from '../services/api'

const initialForm: ContactFormInput = { name: '', email: '', phone: '', service: '', message: '' }

export function ContactForm() {
  const [form, setForm] = useState(initialForm)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [showThankYou, setShowThankYou] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const thankYouDialog = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (showThankYou && !thankYouDialog.current?.open) {
      thankYouDialog.current?.showModal()
    }
  }, [showThankYou])

  function updateField(field: keyof ContactFormInput, value: string) {
    setForm((current) => ({ ...current, [field]: value }))
    if (errorMessage) setErrorMessage(null)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setErrorMessage(null)
    try {
      await submitContactForm(form)
      setForm(initialForm)
      setShowThankYou(true)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'We could not send your enquiry. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-heading"><p className="eyebrow">PROJECT ENQUIRY</p><p>Share a few details to get started.</p></div>
      <div className="form-grid">
        <label className="field"><span>Your name</span><input autoComplete="name" maxLength={100} name="name" onChange={(event) => updateField('name', event.target.value)} required value={form.name} /></label>
        <label className="field"><span>Email address</span><input autoComplete="email" maxLength={254} name="email" onChange={(event) => updateField('email', event.target.value)} required type="email" value={form.email} /></label>
        <label className="field"><span>Phone number</span><input autoComplete="tel" maxLength={30} name="phone" onChange={(event) => updateField('phone', event.target.value)} required type="tel" value={form.phone} /></label>
        <label className="field"><span>What are you planning?</span><select name="service" onChange={(event) => updateField('service', event.target.value)} required value={form.service}><option disabled value="">Choose a service</option><option>Architectural glass</option><option>Windows & doors</option><option>Interior detailing</option><option>Something else</option></select></label>
        <label className="field field-full"><span>A little about your project</span><textarea maxLength={2000} name="message" onChange={(event) => updateField('message', event.target.value)} required rows={3} value={form.message} /></label>
      </div>
      <div className="form-bottom">
        <p className="form-privacy">Your details are only used to respond to this enquiry.</p>
        <button className="button button-dark" disabled={isSubmitting} type="submit">{isSubmitting ? 'Sending…' : 'Send enquiry'} <span aria-hidden="true">↗</span></button>
      </div>
      {errorMessage && <p className="form-status form-status-error" role="alert">{errorMessage}</p>}
      <dialog
        className="thank-you-dialog"
        onClose={() => setShowThankYou(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) thankYouDialog.current?.close()
        }}
        ref={thankYouDialog}
      >
        <div className="thank-you-art" aria-hidden="true"><span>V</span><i /></div>
        <p className="eyebrow">ENQUIRY RECEIVED</p>
        <h2>Thank you.<br /><em>We’ll be in touch.</em></h2>
        <p className="thank-you-copy">Your project note is safely with our team. We look forward to hearing more about what you have in mind.</p>
        <button className="button button-dark thank-you-close" onClick={() => thankYouDialog.current?.close()} type="button" autoFocus>
          Back to the studio <span aria-hidden="true">↗</span>
        </button>
        <span className="thank-you-signoff">VIHAAN GLASS & INTERIORS</span>
      </dialog>
    </form>
  )
}