import { useState } from 'react'
import { Check, Gift } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'

function Subscription() {
  const [currentPlan, setCurrentPlan] = useState('basic')

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: '$9.99',
      period: 'month',
      description: 'Perfect for individuals and personal use. Get started with essential features to secure your important files and documents.',
      features: [
        '5GB Storage',
        'Basic Security',
        'Email Support',
        'File Encryption',
        'Single Device Access'
      ],
      popular: false,
      earnCreditsOptions: [
        { title: 'Verify Email', credits: 31, description: 'Confirm your email address' },
        { title: 'Refer a Friend', credits: 62, description: 'Invite friends to SafeDrome' },
        { title: 'Connect Social Media', credits: 47, description: 'Link your social accounts' },
        { title: 'Download Mobile App', credits: 93, description: 'Install SafeDrome on your phone' },
        { title: 'Complete Tutorial', credits: 15, description: 'Learn how to use SafeDrome' }
      ]
    },
    {
      id: 'standard',
      name: 'Standard',
      price: '$19.99',
      period: 'month',
      description: 'Ideal for professionals and small teams. Enhanced security features and increased storage for growing needs.',
      features: [
        '50GB Storage',
        'Advanced Security',
        'Priority Support',
        'Cloud Sync',
        'Multi-Device Access',
        'File Sharing',
        'Version History'
      ],
      popular: true,
      earnCreditsOptions: [
        { title: 'Verify Email', credits: 62, description: 'Confirm your email address' },
        { title: 'Refer a Friend', credits: 125, description: 'Invite friends to SafeDrome' },
        { title: 'Connect Social Media', credits: 95, description: 'Link your social accounts' },
        { title: 'Download Mobile App', credits: 187, description: 'Install SafeDrome on your phone' },
        { title: 'Complete Tutorial', credits: 31, description: 'Learn how to use SafeDrome' }
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$49.99',
      period: 'month',
      description: 'Comprehensive solution for businesses and organizations. Unlimited storage with enterprise-grade security and dedicated support.',
      features: [
        'Unlimited Storage',
        'Enterprise Security',
        '24/7 Dedicated Support',
        'Custom Integration',
        'Team Management',
        'Advanced Analytics',
        'API Access',
        'SLA Guarantee'
      ],
      popular: false,
      earnCreditsOptions: [
        { title: 'Verify Email', credits: 125, description: 'Confirm your email address' },
        { title: 'Refer a Friend', credits: 250, description: 'Invite friends to SafeDrome' },
        { title: 'Connect Social Media', credits: 190, description: 'Link your social accounts' },
        { title: 'Download Mobile App', credits: 375, description: 'Install SafeDrome on your phone' },
        { title: 'Complete Tutorial', credits: 63, description: 'Learn how to use SafeDrome' }
      ]
    }
  ]

  const handlePlanClick = (planId) => {
    // Switch to the selected plan
    setCurrentPlan(planId)
    console.log(`Switched to plan: ${planId}`)
  }

  const handleSubscribe = (e, planId) => {
    e.stopPropagation()
    
    // Initiate buying procedure
    console.log(`Initiating purchase for: ${planId}`)
    alert(`Proceeding to buy ${planId.charAt(0).toUpperCase() + planId.slice(1)} plan...`)
    
    // TODO: Add your buying/checkout logic here
    // After successful payment, switch to the plan:
    // setCurrentPlan(planId)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">Choose Your Plan</h1>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {plans.map((plan) => {
          const isCurrentPlan = plan.id === currentPlan
          
          return (
            <div key={plan.id} className="relative flex flex-col h-full group">
              <div 
                onClick={() => handlePlanClick(plan.id)}
                className="rounded-[20px] p-8 transition-all duration-300 flex flex-col h-full cursor-pointer group-hover:scale-105"
                style={{
                  backgroundColor: '#FFFFFF',
                  boxShadow: plan.popular 
                    ? '0 0 40px rgba(59, 130, 246, 0.15), 0 8px 32px rgba(0, 0, 0, 0.08)'
                    : '0 8px 32px rgba(0, 0, 0, 0.06)',
                  border: isCurrentPlan 
                    ? '3px solid #10B981'
                    : plan.popular 
                      ? '2px solid rgba(59, 130, 246, 0.2)' 
                      : '1px solid rgba(0, 0, 0, 0.08)'
                }}
              >
                {isCurrentPlan ? (
                  <div 
                    className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full"
                    style={{
                      backgroundColor: '#10B981',
                      boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)',
                    }}
                  >
                    <span className="text-sm font-semibold text-white">✓ Current Plan</span>
                  </div>
                ) : plan.popular ? (
                  <div 
                    className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full"
                    style={{
                      backgroundColor: '#3B82F6',
                      boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)',
                    }}
                  >
                    <span className="text-sm font-semibold text-white">Most Popular</span>
                  </div>
                ) : null}
                
                <div className="space-y-6 flex-grow flex flex-col">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span 
                        className="text-5xl font-bold"
                        style={{ color: '#3B82F6' }}
                      >
                        {plan.price}
                      </span>
                      <span className="text-gray-600 text-lg">/ {plan.period}</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{plan.description}</p>
                  </div>

                  <div className="space-y-4 py-6 flex-grow">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div 
                          className="rounded-full p-1 mt-0.5"
                          style={{ backgroundColor: 'rgba(59, 130, 246, 0.15)' }}
                        >
                          <Check className="w-4 h-4" style={{ color: '#3B82F6' }} />
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto space-y-3">
                    {isCurrentPlan ? (
                      <Dialog>
                        <DialogTrigger asChild>
                          <button
                            className="w-full py-3 px-6 rounded-xl transition-all duration-200 inline-flex items-center justify-center gap-2 font-semibold hover:scale-105"
                            style={{
                              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                              color: '#FFFFFF',
                              border: 'none',
                              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                            }}
                          >
                            <Gift className="w-4 h-4" />
                            Earn Credits
                          </button>
                        </DialogTrigger>
                        <DialogContent 
                          className="border-0"
                          style={{ 
                            backgroundColor: '#FFFFFF',
                            boxShadow: '0 0 40px rgba(59, 130, 246, 0.15)',
                            border: '1px solid rgba(0, 0, 0, 0.1)'
                          }}
                        >
                          <DialogHeader>
                            <DialogTitle className="text-gray-900">Earn Free Credits - {plan.name} Plan</DialogTitle>
                            <DialogDescription className="text-gray-600">
                              Complete tasks to earn credits and enhance your {plan.name.toLowerCase()} plan
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="space-y-4 p-6 pt-2">
                            {plan.earnCreditsOptions.map((option, index) => (
                              <div 
                                key={index}
                                className="p-4 rounded-lg border transition-all duration-200 hover:border-blue-500/50 cursor-pointer"
                                style={{ 
                                  backgroundColor: '#F8FAFC',
                                  borderColor: 'rgba(0, 0, 0, 0.1)'
                                }}
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-semibold text-gray-900">{option.title}</h4>
                                  <span 
                                    className="font-bold"
                                    style={{ color: '#3B82F6' }}
                                  >
                                    +{option.credits} credits
                                  </span>
                                </div>
                                <p className="text-gray-600 text-sm">{option.description}</p>
                              </div>
                            ))}
                          </div>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <>
                        {plan.id !== 'basic' && (
                          <button
                            onClick={(e) => handleSubscribe(e, plan.id)}
                            className="w-full py-3 px-6 rounded-xl transition-all duration-200 inline-flex items-center justify-center gap-2 font-semibold hover:scale-105"
                            style={{
                              background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
                              color: '#FFFFFF',
                              border: 'none',
                              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                            }}
                          >
                            Subscribe Now
                          </button>
                        )}
                        <button
                          disabled
                          onClick={(e) => e.stopPropagation()}
                          className="w-full py-3 px-6 rounded-xl transition-all duration-200 inline-flex items-center justify-center gap-2 font-semibold cursor-not-allowed opacity-50"
                          style={{
                            border: '2px solid rgba(59, 130, 246, 0.3)',
                            color: '#3B82F6',
                            backgroundColor: 'transparent'
                          }}
                        >
                          <Gift className="w-4 h-4" />
                          Earn Credits
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Subscription
