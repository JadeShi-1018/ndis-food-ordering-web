import Link from 'next/link'

const services = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    label: 'Meal Delivery',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    label: 'Cleaning',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    label: 'Transport',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    label: 'Medical Support',
  },
]

export default function ServicesGlance() {
  return (
    <section style={{ backgroundColor: 'var(--color-secondary)' }} className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2
          className="text-3xl font-bold text-center mb-4"
          style={{ color: 'var(--color-main)' }}
        >
          Services Available
        </h2>
        <p className="text-center text-gray-500 mb-12">
          A range of support services to fit your NDIS plan
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {services.map((s, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl flex flex-col items-center justify-center py-8 gap-3 shadow-sm"
            >
              <div style={{ color: 'var(--color-main)' }}>{s.icon}</div>
              <span className="font-medium text-sm" style={{ color: 'var(--color-main)' }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link
            href="/select-service"
            className="font-semibold text-base underline underline-offset-4"
            style={{ color: 'var(--color-main)' }}
          >
            Explore All Services →
          </Link>
        </div>
      </div>
    </section>
  )
}
