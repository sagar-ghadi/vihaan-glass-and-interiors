import { Schema, model } from 'mongoose'

export interface FormSubmission {
  name: string
  email: string
  phone: string
  service: string
  message: string
  createdAt?: Date
}

const formSchema = new Schema<FormSubmission>(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
    phone: { type: String, required: true, trim: true, maxlength: 30 },
    service: { type: String, required: true, trim: true, maxlength: 80 },
    message: { type: String, required: true, trim: true, maxlength: 2000 },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
)

export const Form = model<FormSubmission>('FormSubmission', formSchema)