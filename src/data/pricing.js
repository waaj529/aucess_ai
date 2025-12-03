/**
 * Pricing plans data
 */
export const pricingPlans = {
    starter: {
        title: 'STARTER',
        price: '200',
        period: '/ One-Time Build',
        note: '+ $49/mo Server & API Maintenance',
        icon: '/assets/img/icon/pricing-icon01.svg',
        bg: '/assets/img/bg/pricing-bg01.png',
        buttonText: 'Book Strategy Call',
        features: [
            'Custom Knowledge Base (Trained on your PDFs & Website)',
            'Standard Q&A Agent (Answers FAQs instantly)',
            'Native Multilingual (Auto-detects 3 Languages)',
            'WordPress Plugin Integration',
            'Standard Chat Widget UI',
            'Email Handoff (Forward complex queries to human)'
        ]
    },
    proAgent: {
        title: 'PRO AGENT',
        price: '500',
        period: '/ Custom Quote',
        note: '+ $149/mo Server & API Maintenance',
        icon: '/assets/img/icon/pricing-icon02.svg',
        bg: '/assets/img/bg/pricing-bg01.png',
        buttonText: 'Request Proposal',
        featuresLeft: [
            'Everything in Starter +',
            'Agentic Capabilities (The AI takes action: Booking, Selling)',
            'Deep API Integration (WooCommerce, SQL, CRM)',
            'Custom Admin Dashboard (To view leads & analytics)'
        ],
        featuresRight: [
            'Lead Generation Funnels (Collects emails/phones)',
            'Unlimited Languages',
            'Priority Support & Fine-Tuning'
        ]
    }
};
