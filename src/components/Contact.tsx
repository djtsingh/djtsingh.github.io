// src/components/Contact.tsx

'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { motion } from 'framer-motion';

// Define the validation schema with Zod
const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormValues = z.infer<typeof formSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'success' | 'error' | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsSubmitting(true);
    setSubmissionStatus(null);

    try {
      const response = await fetch('YOUR_FORMSPREE_ENDPOINT', { // <-- PASTE YOUR URL HERE
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmissionStatus('success');
        reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmissionStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-24"
    >
      <div className="container mx-auto max-w-2xl">
        <h2 className="text-4xl font-bold text-center text-text-accent mb-12">
          Get In Touch
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-text mb-2">Name</label>
            <input
              type="text"
              id="name"
              {...register('name')}
              className="w-full bg-background-secondary p-3 rounded-lg border border-transparent focus:border-primary focus:outline-none"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-text mb-2">Email</label>
            <input
              type="email"
              id="email"
              {...register('email')}
              className="w-full bg-background-secondary p-3 rounded-lg border border-transparent focus:border-primary focus:outline-none"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="message" className="block text-text mb-2">Message</label>
            <textarea
              id="message"
              rows={5}
              {...register('message')}
              className="w-full bg-background-secondary p-3 rounded-lg border border-transparent focus:border-primary focus:outline-none"
            />
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-opacity-80 transition-all disabled:bg-opacity-50"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>

          {submissionStatus === 'success' && <p className="text-green-500 text-center">Thank you! Your message has been sent.</p>}
          {submissionStatus === 'error' && <p className="text-red-500 text-center">Something went wrong. Please try again.</p>}
        </form>
      </div>
    </motion.section>
  );
}