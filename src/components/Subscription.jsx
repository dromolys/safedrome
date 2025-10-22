import { useState } from 'react'
import { Check, Gift } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'

function Subscription() {
  const [currentPlan, setCurrentPlan] = useState('basic')
  const [calculatorMode, setCalculatorMode] = useState('credits') // 'credits' or 'money'
  const [calculatorValue, setCalculatorValue] = useState('')

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
      creditPackages: [
        { credits: 100, price: '$4.99', popular: false },
        { credits: 250, price: '$9.99', popular: true },
        { credits: 500, price: '$17.99', popular: false },
        { credits: 1000, price: '$29.99', popular: false }
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
      creditPackages: [
        { credits: 200, price: '$7.99', popular: false },
        { credits: 500, price: '$15.99', popular: true },
        { credits: 1000, price: '$27.99', popular: false },
        { credits: 2500, price: '$59.99', popular: false }
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
      creditPackages: [
        { credits: 500, price: '$14.99', popular: false },
        { credits: 1000, price: '$24.99', popular: false },
        { credits: 2500, price: '$54.99', popular: true },
        { credits: 5000, price: '$99.99', popular: false }
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

  const handleBuyCredits = (planName, credits, price) => {
    console.log(`Purchasing ${credits} credits for ${price} on ${planName} plan`)
    alert(`Processing payment of ${price} for ${credits} credits...\n\nPlan: ${planName}\nCredits: ${credits}\nPrice: ${price}`)
    
    // TODO: Add your payment processing logic here
    // After successful payment, add credits to user account
  }

  const calculateCredits = (planPackages, inputValue, mode) => {
    if (!inputValue || inputValue <= 0) return null
    
    // Calculate average price per credit from all packages
    const avgPricePerCredit = planPackages.reduce((sum, pkg) => {
      return sum + (parseFloat(pkg.price.replace('$', '')) / pkg.credits)
    }, 0) / planPackages.length

    if (mode === 'money') {
      // Calculate credits from money
      return Math.floor(inputValue / avgPricePerCredit)
    } else {
      // Calculate money from credits
      return (inputValue * avgPricePerCredit).toFixed(2)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Choose Your Plan</h1>
        <p className="text-lg text-gray-600">See pricing for our basic, professional, and enterprise plans.</p>
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
                            Buy Credits
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
                            <DialogTitle className="text-gray-900">Buy Credits - {plan.name} Plan</DialogTitle>
                          </DialogHeader>

                          {/* Prominent Heading */}
                          <div className="px-6 pt-4 pb-6 text-center">
                            <h2 className="text-3xl font-bold" style={{ color: '#3B82F6' }}>Buy More Credits, Save Money</h2>
                          </div>
                          
                          {/* Credit Packages */}
                          <div className="px-6 pt-2">
                            <h4 className="font-semibold text-gray-900 mb-3">Recommended Packages</h4>
                          </div>
              
                          <div className="space-y-3 px-6 pt-0 pb-6">
                            {plan.creditPackages.map((pkg, index) => (
                              <div 
                                key={index}
                                className="p-5 rounded-lg border transition-all duration-200 hover:shadow-md relative"
                                style={{ 
                                  backgroundColor: pkg.popular ? 'rgba(59, 130, 246, 0.05)' : '#FFFFFF',
                                  borderColor: pkg.popular ? '#3B82F6' : 'rgba(0, 0, 0, 0.1)',
                                  borderWidth: pkg.popular ? '2px' : '1px'
                                }}
                              >
                                {pkg.popular && (
                                  <div 
                                    className="absolute -top-2 right-4 px-3 py-0.5 rounded-full text-xs font-semibold"
                                    style={{ backgroundColor: '#3B82F6', color: '#FFFFFF' }}
                                  >
                                    Best Value
                                  </div>
                                )}
                                <div className="flex items-center justify-between mb-3">
                                  <div>
                                    <h4 className="text-2xl font-bold text-gray-900">{pkg.credits} Credits</h4>
                                    <p className="text-sm text-gray-600">${(parseFloat(pkg.price.replace('$', '')) / pkg.credits).toFixed(3)} per credit</p>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-3xl font-bold" style={{ color: '#3B82F6' }}>{pkg.price}</div>
                                  </div>
                                </div>
                                <button
                                  onClick={() => handleBuyCredits(plan.name, pkg.credits, pkg.price)}
                                  className="w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
                                  style={
                                    pkg.popular
                                      ? {
                                          background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
                                          color: '#FFFFFF',
                                          border: 'none',
                                          boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                                        }
                                      : {
                                          backgroundColor: '#FFFFFF',
                                          color: '#3B82F6',
                                          border: '2px solid #3B82F6'
                                        }
                                  }
                                >
                                  Buy Now
              </button>
            </div>
          ))}
        </div>
        
                          {/* Credit Calculator - Bottom */}
                          <div className="px-6 pb-6">
                            <div className="p-5 rounded-lg" style={{ backgroundColor: '#F8FAFC', border: '2px solid rgba(59, 130, 246, 0.3)' }}>
                              <h4 className="font-bold text-gray-900 mb-4 text-lg">💰 Credit Calculator</h4>
                              
                              <div className="flex gap-2 mb-4">
                                <button
                                  onClick={() => {
                                    setCalculatorMode('credits')
                                    setCalculatorValue('')
                                  }}
                                  className="flex-1 py-2.5 px-4 rounded-lg font-semibold transition-all"
                                  style={
                                    calculatorMode === 'credits'
                                      ? { backgroundColor: '#3B82F6', color: '#FFFFFF' }
                                      : { backgroundColor: '#FFFFFF', color: '#3B82F6', border: '2px solid #3B82F6' }
                                  }
                                >
                                  Credits → Money
                                </button>
                                <button
                                  onClick={() => {
                                    setCalculatorMode('money')
                                    setCalculatorValue('')
                                  }}
                                  className="flex-1 py-2.5 px-4 rounded-lg font-semibold transition-all"
                                  style={
                                    calculatorMode === 'money'
                                      ? { backgroundColor: '#3B82F6', color: '#FFFFFF' }
                                      : { backgroundColor: '#FFFFFF', color: '#3B82F6', border: '2px solid #3B82F6' }
                                  }
                                >
                                  Money → Credits
                                </button>
                              </div>

                              <div className="space-y-3">
                                <input
                                  type="number"
                                  placeholder={calculatorMode === 'credits' ? 'Enter credits' : 'Enter amount ($)'}
                                  value={calculatorValue}
                                  onChange={(e) => setCalculatorValue(e.target.value)}
                                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 text-lg"
                                  style={{ borderColor: 'rgba(59, 130, 246, 0.3)' }}
                                />
                                
                                {calculatorValue && (
                                  <div className="p-4 rounded-lg" style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)', border: '2px solid #3B82F6' }}>
                                    <p className="text-sm text-gray-600 mb-2">
                                      {calculatorMode === 'credits' ? 'Estimated Cost:' : 'Estimated Credits:'}
                                    </p>
                                    <p className="text-3xl font-bold" style={{ color: '#3B82F6' }}>
                                      {calculatorMode === 'credits'
                                        ? `$${calculateCredits(plan.creditPackages, calculatorValue, 'credits')}`
                                        : `${calculateCredits(plan.creditPackages, calculatorValue, 'money')} credits`
                                      }
                                    </p>
                                  </div>
                                )}
                              </div>
            </div>
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
                          Buy Credits
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
