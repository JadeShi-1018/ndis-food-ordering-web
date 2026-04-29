const steps = [
  "Create Order",
  "PendingPayment",
  "Stripe Payment",
  "Outbox Event",
  "MQ Publish",
  "Order Consume",
  "Status Updated",
];

export default function WorkflowSection() {
  return (
    <section className="w-full bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Core Workflow
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            The key backend path in this project is the asynchronous
            synchronization between payment confirmation and order status.
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-3">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center gap-3">
              <div
                className="rounded-full px-5 py-3 text-sm md:text-base font-semibold text-white shadow-sm"
                style={{ backgroundColor: "var(--color-main)" }}
              >
                {step}
              </div>

              {index < steps.length - 1 && (
                <span className="text-2xl text-gray-400">→</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}