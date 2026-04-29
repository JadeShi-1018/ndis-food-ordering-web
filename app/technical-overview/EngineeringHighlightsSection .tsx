const highlights = [
  {
    title: "Service Boundaries",
    description:
      "User, order, payment, and provider logic are separated by domain responsibility.",
  },
  {
    title: "Async Communication",
    description:
      "Order and payment coordination is event-driven instead of tightly coupled through direct callbacks.",
  },
  {
    title: "Outbox Pattern",
    description:
      "Reliable event publishing is supported through Outbox-based message persistence.",
  },
  {
    title: "Idempotency",
    description:
      "The workflow is designed to reduce duplicate submissions, retries, and repeated message handling risks.",
  },
];

export default function EngineeringHighlightsSection() {
  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Engineering Highlights
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            A few key design choices that shape the system architecture.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-gray-100 bg-[#f8fafc] p-8 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="mt-4 text-gray-600 leading-7">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}