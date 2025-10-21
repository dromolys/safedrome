function Subscription() {
  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: '$9.99',
      period: 'month',
      features: ['5GB Storage', 'Basic Security', 'Email Support'],
      popular: false
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$19.99',
      period: 'month',
      features: ['50GB Storage', 'Advanced Security', 'Priority Support', 'Cloud Sync'],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$49.99',
      period: 'month',
      features: ['Unlimited Storage', 'Enterprise Security', '24/7 Support', 'Custom Integration'],
      popular: false
    }
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-10 p-10 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl">
        <h1 className="text-4xl font-bold mb-3">Subscription Plans</h1>
        <p className="text-xl opacity-90">Choose the plan that fits your needs</p>
      </div>
      
      <div className="space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map(plan => (
            <div key={plan.id} className={`bg-white rounded-2xl p-8 shadow-lg relative transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl ${
              plan.popular ? 'border-2 border-blue-500 scale-105' : 'border-2 border-transparent'
            }`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-5 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-slate-700 mb-4">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-blue-500">{plan.price}</span>
                  <span className="text-gray-600">/{plan.period}</span>
                </div>
              </div>
              
              <div className="mb-8">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="text-slate-700">{feature}</li>
                  ))}
                </ul>
              </div>
              
              <button className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-300 ${
                plan.popular 
                  ? 'bg-blue-500 text-white hover:bg-blue-600' 
                  : 'border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white'
              }`}>
                Choose {plan.name}
              </button>
            </div>
          ))}
        </div>
        
        <div className="bg-white p-10 rounded-xl shadow-lg">
          <h2 className="text-center text-3xl font-bold text-slate-700 mb-10">Why Choose SafeDrome?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-5">🔒</div>
              <h3 className="text-xl font-semibold text-slate-700 mb-3">Secure</h3>
              <p className="text-gray-600 leading-relaxed">Bank-level encryption for all your files</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-5">⚡</div>
              <h3 className="text-xl font-semibold text-slate-700 mb-3">Fast</h3>
              <p className="text-gray-600 leading-relaxed">Lightning-fast upload and download speeds</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-5">🌍</div>
              <h3 className="text-xl font-semibold text-slate-700 mb-3">Global</h3>
              <p className="text-gray-600 leading-relaxed">Access your files from anywhere in the world</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Subscription
