import Link from 'next/link'

export default function CTABanner() {
  return (
    <section
      className="py-16 px-6 text-center"
      style={{ backgroundColor: 'var(--color-main)' }}
    >
      <h2 className="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
      <p className="text-white opacity-80 mb-8 text-lg">
        Find NDIS-approved services near you today.
      </p>
      <Link
        href="/select-service"
        className="inline-block px-10 py-3 rounded-full font-semibold text-lg bg-white transition-opacity hover:opacity-90"
        style={{ color: 'var(--color-main)' }}
      >
        Find Services
      </Link>
    </section>
  )
}
