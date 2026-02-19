import React from 'react';
import { Check } from 'lucide-react';

interface PricingCardProps {
    name: string;
    price: string;
    priceSubtext?: string;
    description: string;
    features: string[];
    cta: string;
    onCta: () => void;
    highlighted?: boolean;
}

export const PricingCard: React.FC<PricingCardProps> = ({ 
    name, 
    price, 
    priceSubtext,
    description, 
    features, 
    cta, 
    onCta, 
    highlighted 
}) => (
    <div className={`rounded-2xl p-6 ${
        highlighted 
            ? 'bg-gray-900 text-white' 
            : 'bg-white border border-gray-200'
    }`}>
        <p className={`text-sm font-medium mb-2 ${highlighted ? 'text-teal-400' : 'text-gray-500'}`}>
            {name}
        </p>
        <p className="text-4xl font-serif mb-1">{price}</p>
        {priceSubtext && (
            <p className={`text-sm mb-3 ${highlighted ? 'text-gray-400' : 'text-gray-500'}`}>
                {priceSubtext}
            </p>
        )}
        <p className={`text-sm mb-6 ${highlighted ? 'text-gray-400' : 'text-gray-500'}`}>
            {description}
        </p>
        
        <button 
            onClick={onCta}
            className={`w-full py-2.5 rounded-lg text-sm font-medium transition-colors ${
                highlighted 
                    ? 'bg-white text-gray-900 hover:bg-gray-100' 
                    : 'bg-gray-900 text-white hover:bg-gray-800'
            }`}
        >
            {cta}
        </button>
        
        <ul className="mt-6 space-y-3">
            {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                    <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${highlighted ? 'text-teal-400' : 'text-teal-600'}`} />
                    <span className={highlighted ? 'text-gray-300' : 'text-gray-600'}>{feature}</span>
                </li>
            ))}
        </ul>
    </div>
);

// Simple pricing section with enterprise option
export const PricingSection: React.FC<{ onCta: () => void }> = ({ onCta }) => (
    <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6 mb-8">
            <PricingCard
                name="Free"
                price="$0"
                priceSubtext="/month"
                description="Basic campaign management for small teams."
                features={["3 active quests", "Basic editor", "Email support"]}
                cta="Get Started"
                onCta={onCta}
            />
            <PricingCard
                name="Scale"
                price="$29"
                priceSubtext="/month + credits"
                description="Everything in Free, plus AI credits for content generation."
                features={["Unlimited quests", "AI-powered content", "Priority support", "Monthly spending limits"]}
                cta="Start Free Trial"
                onCta={onCta}
                highlighted
            />
        </div>
        
        {/* Enterprise option */}
        <div className="text-center p-6 bg-gray-50 rounded-2xl border border-gray-200">
            <p className="text-gray-900 font-medium mb-1">Need a fractional PR person?</p>
            <p className="text-sm text-gray-500 mb-4">Get dedicated PR support embedded in your team.</p>
            <button 
                onClick={onCta}
                className="text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors"
            >
                Contact us →
            </button>
        </div>
    </div>
);
