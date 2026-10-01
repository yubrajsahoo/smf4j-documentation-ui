import React from 'react';
import CodeBlock from '../components/CodeBlock';

const MonitoringDocs = () => {
  return (
    <div className="animate-in fade-in duration-500">
      <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl mb-4">
        Monitoring & Observability
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        SMF4J is designed to simplify application metric collection in Spring Boot applications. It works naturally with the Micrometer ecosystem and can be exposed through Prometheus, visualized in Grafana, and combined with OpenTelemetry for broader observability.
      </p>

      <div className="prose prose-indigo max-w-none text-gray-600 space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">How SMF4J fits in the observability stack</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>SMF4J</strong> gives you a simple annotation-based way to declare metrics and tags.</li>
            <li><strong>Micrometer</strong> collects and records the metrics in a registry.</li>
            <li><strong>Prometheus</strong> scrapes the metrics endpoint and stores time series data.</li>
            <li><strong>Grafana</strong> visualizes those metrics through dashboards.</li>
            <li><strong>OpenTelemetry</strong> complements this by providing tracing and centralized telemetry signals across services.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Recommended dependencies</h2>
          <CodeBlock language="xml" code={`
<dependency>
    <groupId>io.github.yubrajsahoo</groupId>
    <artifactId>smf4j-spring-boot-starter</artifactId>
    <version>0.0.1</version>
</dependency>

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>

<dependency>
    <groupId>io.micrometer</groupId>
    <artifactId>micrometer-registry-prometheus</artifactId>
</dependency>
          `} />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Prometheus configuration</h2>
          <p>
            Expose the metrics endpoint in your Spring Boot application and configure Prometheus to scrape it.
          </p>

          <CodeBlock language="yaml" code={`
management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics,prometheus
  endpoint:
    prometheus:
      enabled: true
  metrics:
    export:
      prometheus:
        enabled: true
          `} />

          <p className="mt-4">Example Prometheus scrape config:</p>
          <CodeBlock language="yaml" code={`
scrape_configs:
  - job_name: 'smf4j-app'
    metrics_path: /actuator/prometheus
    static_configs:
      - targets: ['localhost:8080']
          `} />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Grafana dashboard setup</h2>
          <p>
            Once metrics are flowing into Prometheus, you can connect Grafana to that Prometheus data source and build dashboards for request volume, latency, error rates, and business-level metrics.
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li>Request count per endpoint</li>
            <li>Timer latency percentile</li>
            <li>Total errors and error ratios</li>
            <li>Custom SMF4J counters and gauges</li>
            <li>Application-specific business KPIs</li>
          </ul>

          <p className="mt-4">Useful PromQL examples:</p>

          <CodeBlock language="promql" code={`
rate(api_requests_total[5m])
          `} />

          <CodeBlock language="promql" code={`
histogram_quantile(0.95, sum(rate(http_server_requests_seconds_bucket[5m])) by (le))
          `} />

          <CodeBlock language="promql" code={`
sum(rate(custom_metric_total[5m])) by (status)
          `} />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">OpenTelemetry and SMF4J</h2>
          <p>
            SMF4J is not a replacement for OpenTelemetry. Instead, it complements it. SMF4J helps you define application metrics in a clean, annotation-driven way, while OpenTelemetry can be used for distributed tracing and wider signals across your platform.
          </p>

          <CodeBlock language="xml" code={`
<dependency>
    <groupId>io.github.yubrajsahoo</groupId>
    <artifactId>smf4j-spring-boot-starter</artifactId>
    <version>0.0.1</version>
</dependency>

<dependency>
    <groupId>io.opentelemetry</groupId>
    <artifactId>opentelemetry-exporter-otlp</artifactId>
</dependency>
          `} />

          <CodeBlock language="yaml" code={`
otel:
  exporter:
    otlp:
      endpoint: http://localhost:4318
  metrics:
    export:
      interval: 30s
          `} />

          <p className="mt-4">
            In practice, use SMF4J for metric declarations in your business logic, use Micrometer for registry emission, and use OpenTelemetry for traces and cross-service correlation. This combination works well in larger distributed systems.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Example monitorable service</h2>
          <CodeBlock language="java" code={`
@Service
public class OrderService {

    @Counter(
        name = "orders.created.total",
        description = "Total number of orders created",
        tags = {
            @Tags(key = "status", value = "#result.status"),
            @Tags(key = "region", value = "#region")
        }
    )
    public OrderResponse createOrder(OrderRequest request, String region) {
        return orderProcessor.process(request);
    }

    @Timer(name = "orders.processing.time", description = "Time spent processing orders")
    public OrderResponse processOrder(OrderRequest request) {
        return orderProcessor.process(request);
    }
}
          `} />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Best practices</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Keep metric names stable and descriptive.</li>
            <li>Avoid high-cardinality labels like raw user IDs or random tokens.</li>
            <li>Use tags for dimensions such as status, region, tenant, or operation type.</li>
            <li>Expose metrics through Actuator and Prometheus in production.</li>
            <li>Use Grafana to visualize trends and alert on anomalies.</li>
            <li>Combine application metrics with tracing for full observability.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default MonitoringDocs;
