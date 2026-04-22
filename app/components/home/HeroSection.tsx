import Link from 'next/link'

export default function HeroSection() {
  return (
    <section style={{ backgroundColor: 'var(--color-secondary)' }} className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1
          className="text-5xl font-bold leading-tight mb-6"
          style={{ color: 'var(--color-main)' }}
        >
          NDIS Services, Simplified
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
          Connect with registered NDIS service providers for meal delivery, cleaning, transport,
          and more — all in one place.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/select-service"
            className="px-8 py-3 rounded-full text-white font-semibold text-lg transition-opacity hover:opacity-90"
            style={{ backgroundColor: 'var(--color-main)' }}
          >
            Find Services
          </Link>
          <Link
            href="/user-signup"
            className="px-8 py-3 rounded-full font-semibold text-lg border-2 transition-colors hover:text-white hover:bg-[var(--color-main)]"
            style={{ color: 'var(--color-main)', borderColor: 'var(--color-main)' }}
          >
            Create an Account
          </Link>
        </div>
      </div>
    </section>
  )
}
