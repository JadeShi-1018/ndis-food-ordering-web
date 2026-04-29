const items = [
  "Frontend",
  "User Service",
  "Order Service",
  "Payment Service",
  "Provider Service",
  "RabbitMQ / MassTransit",
  "Azure SQL",
  "Azure Deployment",
];

export default function SystemOverviewSection() {
  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            System Overview
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            The platform is split into focused building blocks with clear
            service responsibilities.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {items.map((item) => (
            <div
              key={item}
              className="rounded-3xl border border-gray-100 bg-[#f8fafc] px-5 py-8 text-center shadow-sm"
            >
              <p className="text-base md:text-lg font-semibold text-gray-800">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}