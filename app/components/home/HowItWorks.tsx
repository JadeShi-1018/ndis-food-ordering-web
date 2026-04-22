const steps = [
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="8" strokeWidth={2} />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35" />
      </svg>
    ),
    title: 'Choose a Service',
    description: 'Browse NDIS-approved services that match your plan',
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Find a Provider',
    description: 'Discover providers near you with real-time availability',
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Place Your Order',
    description: 'Book, track, and manage your services with ease',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2
          className="text-3xl font-bold text-center mb-14"
          style={{ color: 'var(--color-main)' }}
        >
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
                style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-main)' }}
              >
                {step.icon}
              </div>
              <div
                className="text-sm font-bold uppercase tracking-widest mb-2"
                style={{ color: 'var(--color-main)', opacity: 0.5 }}
              >
                Step {index + 1}
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-main)' }}>
                {step.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
