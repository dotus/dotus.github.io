import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';

interface WaitlistModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const WaitlistModal: React.FC<WaitlistModalProps> = ({ isOpen, onClose }) => {
    const [state, handleSubmit] = useForm("xeeoyadw");

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }} 
                        onClick={onClose} 
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" 
                    />
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 20 }} 
                        animate={{ opacity: 1, scale: 1, y: 0 }} 
                        exit={{ opacity: 0, scale: 0.95, y: 20 }} 
                        transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                        className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="bg-white w-full max-w-md pointer-events-auto rounded-2xl shadow-2xl border border-black/[0.06] overflow-hidden">
                            {/* Header gradient */}
                      
                            
                            <button 
                                onClick={onClose} 
                                className="absolute top-4 right-4 p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 rounded-lg transition-colors z-10"
                            >
                                <X className="w-4 h-4" />
                            </button>
                            
                            <div className="p-8 md:p-10">
                                {state.succeeded ? (
                                    <div className="flex flex-col items-center justify-center text-center py-6 space-y-4">
                                        <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center">
                                            <CheckCircle2 className="w-8 h-8 text-teal-600" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-serif font-medium text-gray-900">
                                                You're on the list!
                                            </h2>
                                            <p className="text-gray-500 mt-2">We'll be in touch when early access opens.</p>
                                        </div>
                                        <button 
                                            onClick={onClose} 
                                            className="mt-4 px-8 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
                                        >
                                            Close
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="mb-8">
                               
                                            <h2 className="text-3xl font-serif font-medium text-gray-900">
                                                Join the waitlist
                                            </h2>
                                            <p className="text-gray-500 mt-2">Be the first to experience the new way to do PR.</p>
                                        </div>
                                        
                                        <form className="space-y-4" onSubmit={handleSubmit}>
                                            <div className="space-y-1.5">
                                                <label htmlFor="waitlist-name" className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                                                    Name
                                                </label>
                                                <input 
                                                    id="waitlist-name" 
                                                    name="name" 
                                                    type="text" 
                                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-gray-900 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all placeholder:text-gray-400" 
                                                    placeholder="Jane Doe" 
                                                    required 
                                                />
                                                <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 text-xs mt-1 block" />
                                            </div>
                                            
                                            <div className="space-y-1.5">
                                                <label htmlFor="waitlist-email" className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                                                    Work Email
                                                </label>
                                                <input 
                                                    id="waitlist-email" 
                                                    type="email" 
                                                    name="email" 
                                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-gray-900 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all placeholder:text-gray-400" 
                                                    placeholder="jane@company.com" 
                                                    required 
                                                />
                                                <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-xs mt-1 block" />
                                            </div>
                                            
                                            <div className="space-y-1.5">
                                                <label htmlFor="waitlist-company" className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                                                    Company <span className="text-gray-300 font-normal">(optional)</span>
                                                </label>
                                                <input 
                                                    id="waitlist-company" 
                                                    name="company" 
                                                    type="text" 
                                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-gray-900 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all placeholder:text-gray-400" 
                                                    placeholder="Acme Inc" 
                                                />
                                            </div>
                                            
                                            <button 
                                                type="submit" 
                                                disabled={state.submitting} 
                                                className="w-full bg-gray-900 text-white h-12 text-sm font-medium rounded-lg hover:bg-gray-800 disabled:opacity-50 flex items-center justify-center gap-2 group transition-all mt-4"
                                            >
                                                {state.submitting ? 'Joining...' : 'Join Waitlist'}
                                                {!state.submitting && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
                                            </button>
                                            
                                          
                                        </form>
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
