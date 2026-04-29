export default function TechnicalHeroSection() {
  return (
    <section className="w-full bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 md:py-24">
        <p
          className="text-sm font-semibold uppercase tracking-[0.18em] mb-4"
          style={{ color: "var(--color-main)" }}
        >
          Technical Overview
        </p>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight max-w-4xl">
          A full-stack NDIS platform
          <br />
          built with microservices and event-driven workflow
        </h1>

        <p className="mt-6 text-lg text-gray-600 leading-8 max-w-3xl">
          This page gives a quick view of the system structure, the core
          order-payment flow, and the engineering decisions behind the project.
        </p>
      </div>
    </section>
  );
}