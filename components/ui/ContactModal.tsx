import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [state, handleSubmit] = useForm("xeeoyadw");

  // Reset form state when modal closes if needed (optional, but good UX)
  // For now we just keep the simple Formspree logic.

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-[#0a0a0a] w-full max-w-md pointer-events-auto shadow-2xl border border-white/10 relative overflow-hidden">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-gray-500 hover:bg-white/10 hover:text-white transition-colors z-10"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="p-8 md:p-12">
                {state.succeeded ? (
                  <div className="flex flex-col items-center justify-center text-center py-10 space-y-4">
                    <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mb-2">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Thanks!</h2>
                    <p className="text-gray-400">We'll be in touch shortly.</p>
                    <button
                      onClick={onClose}
                      className="mt-6 px-6 py-2 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-8">

                      <h2 className="text-3xl font-bold tracking-tighter uppercase leading-none text-white">Contact us</h2>
                      <p className="text-gray-400 mt-2 text-lg leading-relaxed">
                        Help us get to know you and we'll give you a call.
                      </p>
                    </div>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                      <div className="space-y-1">
                        <label htmlFor="name" className="text-md font-bold uppercase tracking-wider text-gray-300">Name</label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          className="w-full bg-white/5 border-b border-white/10 p-3 text-md text-white focus:outline-none focus:border-white focus:bg-white/10 transition-colors rounded-none placeholder:text-gray-600"
                          placeholder="Jane Doe"
                          required
                        />
                        <ValidationError
                          prefix="Name"
                          field="name"
                          errors={state.errors}
                          className="text-red-500 text-xs mt-1 block"
                        />
                      </div>

                      <div className="space-y-1">
                        <label htmlFor="email" className="text-md font-bold uppercase tracking-wider text-gray-300">Work Email</label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          className="w-full bg-white/5 border-b border-white/10 p-3 text-md text-white focus:outline-none focus:border-white focus:bg-white/10 transition-colors rounded-none placeholder:text-gray-600"
                          placeholder="jane@company.com"
                          required
                        />
                        <ValidationError
                          prefix="Email"
                          field="email"
                          errors={state.errors}
                          className="text-red-500 text-xs mt-1 block"
                        />
                      </div>

                      <div className="space-y-1">
                        <label htmlFor="message" className="text-md font-bold uppercase tracking-wider text-gray-300">Message</label>
                        <textarea
                          id="message"
                          name="message"
                          rows={3}
                          className="w-full bg-white/5 border-b border-white/10 p-3 text-md text-white focus:outline-none focus:border-white focus:bg-white/10 transition-colors rounded-none placeholder:text-gray-600 resize-none"
                          placeholder="Tell us anything about your company and what you're looking for. We'll get back to you in <24 hours."
                        />
                        <ValidationError
                          prefix="Message"
                          field="message"
                          errors={state.errors}
                          className="text-red-500 text-xs mt-1 block"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={state.submitting}
                        className="w-full bg-white text-black h-12 text-sm font-bold uppercase tracking-widest hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group transition-all mt-4"
                      >
                        {state.submitting ? 'Sending...' : 'Submit Request'}
                        {!state.submitting && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
                      </button>
                    </form>

                    <div className="mt-6 text-sm text-gray-600 text-center leading-tight">
                      We respect your inbox.
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};