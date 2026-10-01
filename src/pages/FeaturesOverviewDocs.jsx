import React from 'react';
import CodeBlock from '../components/CodeBlock';

const FeaturesOverviewDocs = () => {
  return (
    <div className="animate-in fade-in duration-500">
      <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl mb-4">
        Features Overview
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        SMF4J provides a comprehensive set of features to simplify metrics collection in Spring Boot applications.
      </p>

      <div className="prose prose-indigo max-w-none text-gray-600 space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Core Features</h2>
          <ul className="list-disc pl-5 space-y-3 text-gray-600">
            <li>
              <strong className="text-gray-900">@Counter Annotation</strong> - Track event counts with increment support and dynamic tags
            </li>
            <li>
              <strong className="text-gray-900">@Timer Annotation</strong> - Measure execution time for methods with histograms and percentiles
            </li>
            <li>
              <strong className="text-gray-900">@Gauge Annotation</strong> - Monitor current state like queue size or cache count
            </li>
            <li>
              <strong className="text-gray-900">@Tags Annotation</strong> - Add dimensional labels to metrics using SpEL expressions
            </li>
            <li>
              <strong className="text-gray-900">Enable/Disable</strong> - Toggle metrics collection without code changes
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">SpEL Expression Support</h2>
          <p>
            SMF4J supports Spring Expression Language for dynamic tag evaluation:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-4">
            <li><code>#argName</code> - Access method arguments</li>
            <li><code>#result</code> - Access method return value</li>
            <li><code>#error</code> - Access thrown exception</li>
            <li><code>#request.id</code> - Nested property access</li>
            <li><code>#user?.name</code> - Safe navigation operator</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Micrometer Integration</h2>
          <p>
            SMF4J automatically integrates with Micrometer to publish metrics to any supported backend:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li>Prometheus</li>
            <li>Datadog</li>
            <li>New Relic</li>
            <li>CloudWatch</li>
            <li>InfluxDB</li>
            <li>Grafana Cloud</li>
            <li>And many more...</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Spring Boot Auto-Configuration</h2>
          <p>
            Simply add the starter dependency and everything is automatically configured:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li>AOP aspects registered</li>
            <li>Metric services initialized</li>
            <li>SpEL parser configured</li>
            <li>Micrometer registry connected</li>
            <li>No manual bean configuration needed</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Complete Example</h2>
          <CodeBlock language="java" code={`
@Service
public class PaymentService {

    // Track total payments processed
    @Counter(
        name = "payments.processed.total",
        description = "Total payments processed",
        tags = {
            @Tags(key = "method", value = "#payment.method"),
            @Tags(key = "status", value = "#result.status"),
            @Tags(key = "currency", value = "#payment.currency")
        },
        increment = 1,
        enable = true
    )
    public PaymentResult processPayment(Payment payment) {
        return processor.process(payment);
    }

    // Track payment processing time
    @Timer(
        name = "payment.processing.duration",
        description = "Time taken to process payment",
        tags = {
            @Tags(key = "method", value = "#payment.method"),
            @Tags(key = "status", value = "#result.status")
        },
        enable = true
    )
    public PaymentResult handlePayment(Payment payment) {
        return processPayment(payment);
    }

    // Monitor active payment queue
    @Gauge(
        name = "payment.queue.size",
        description = "Current size of pending payments",
        tags = {
            @Tags(key = "type", value = "pending")
        },
        enable = true
    )
    public int getPendingPaymentCount() {
        return paymentQueue.size();
    }
}
          `} />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Advanced Features</h2>
          <ul className="list-disc pl-5 space-y-3 text-gray-600">
            <li>
              <strong className="text-gray-900">Custom Increment</strong> - Use increment parameter to increment by any value
            </li>
            <li>
              <strong className="text-gray-900">Gauge Expressions</strong> - Use SpEL to transform gauge values
            </li>
            <li>
              <strong className="text-gray-900">Exception Tracking</strong> - Access #error in tags to track exception types
            </li>
            <li>
              <strong className="text-gray-900">Selective Enabling</strong> - Toggle metrics on/off per method
            </li>
            <li>
              <strong className="text-gray-900">Multi-Module Support</strong> - Use just the API module in interfaces
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default FeaturesOverviewDocs;
