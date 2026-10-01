import React from 'react';
import CodeBlock from '../components/CodeBlock';

const AdvancedFeaturesDoc = () => {
  return (
    <div className="animate-in fade-in duration-500">
      <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl mb-4">
        Advanced Features
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Explore advanced SMF4J features for complex metrics scenarios.
      </p>

      <div className="prose prose-indigo max-w-none text-gray-600 space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Custom Increment Values</h2>
          <p>
            Use the <code>increment</code> parameter to increment counters by values other than 1:
          </p>
          <CodeBlock language="java" code={`
@Counter(
    name = "revenue.processed",
    description = "Total revenue processed",
    increment = 100,  // Increment by 100 each time
    tags = {
        @Tags(key = "currency", value = "#payment.currency")
    }
)
public void processPayment(Payment payment) {
    // Payment processing logic
}
          `} />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Exception Tracking</h2>
          <p>
            Track error types using the <code>#error</code> variable in tags:
          </p>
          <CodeBlock language="java" code={`
@Counter(
    name = "operations.errors.total",
    description = "Total operation errors",
    tags = {
        @Tags(key = "error_type", value = "#error.getClass().getSimpleName()"),
        @Tags(key = "error_message", value = "#error.getMessage()")
    }
)
public void riskyOperation() {
    // This method might throw exceptions
    // Exceptions will be tracked automatically
}
          `} />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Gauge with SpEL Expressions</h2>
          <p>
            Use the <code>expression</code> parameter to transform gauge values:
          </p>
          <CodeBlock language="java" code={`
@Service
public class CacheService {
    private List<String> cachedItems = new ArrayList<>();

    // Monitor cache size
    @Gauge(
        name = "cache.items.total",
        description = "Total items in cache",
        expression = "size()"  // Evaluate size() on the returned list
    )
    public List<String> getCachedItems() {
        return cachedItems;
    }

    // Monitor cache utilization percentage
    @Gauge(
        name = "cache.utilization.percent",
        description = "Cache utilization percentage",
        expression = "(size() * 100) / 1000"  // (items / max_size) * 100
    )
    public List<String> getUtilization() {
        return cachedItems;
    }
}
          `} />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Conditional Metric Collection</h2>
          <p>
            Use the <code>enable</code> parameter to toggle metrics collection:
          </p>
          <CodeBlock language="java" code={`
@Service
public class AnalyticsService {
    @Value("${metrics.detailed-tracking:false}")
    private boolean detailedTracking;

    @Timer(
        name = "analytics.processing.time",
        description = "Time to process analytics",
        enable = true  // Always enabled
    )
    public void processAnalytics() {
        // Always tracked
    }

    @Counter(
        name = "analytics.detailed.events",
        description = "Detailed event tracking",
        enable = false  // Disabled by default, can be enabled via configuration
    )
    public void trackDetailedEvent() {
        // Disabled unless explicitly enabled
    }
}
          `} />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Complex SpEL Expressions</h2>
          <p>
            SMF4J supports sophisticated SpEL expressions for tag values:
          </p>
          <CodeBlock language="java" code={`
@Counter(
    name = "operations.completed",
    description = "Completed operations",
    tags = {
        // Ternary operator
        @Tags(key = "result", value = "#result != null ? 'success' : 'failure'"),
        
        // Safe navigation
        @Tags(key = "user_id", value = "#request?.user?.id ?: 'unknown'"),
        
        // Method calls
        @Tags(key = "status_code", value = "#result.getStatus().toString()"),
        
        // String concatenation
        @Tags(key = "metric_label", value = "#result.type + '_' + #result.status")
    }
)
public OperationResult performOperation(Request request) {
    return operator.execute(request);
}
          `} />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Field-Level Gauges</h2>
          <p>
            Apply @Gauge directly to fields for monitoring internal state:
          </p>
          <CodeBlock language="java" code={`
@Service
public class ConnectionPool {
    
    @Gauge(
        name = "database.connections.active",
        description = "Active database connections",
        tags = @Tags(key = "pool", value = "primary")
    )
    private AtomicInteger activeConnections = new AtomicInteger(0);
    
    @Gauge(
        name = "database.connections.total",
        description = "Total available connections",
        tags = @Tags(key = "pool", value = "primary")
    )
    private static final int POOL_SIZE = 50;
    
    public Connection getConnection() {
        activeConnections.incrementAndGet();
        return connectionPool.getConnection();
    }
}
          `} />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Module-Based Architecture</h2>
          <p>
            Use the modular structure for maximum flexibility:
          </p>
          <CodeBlock language="xml" code={`
<!-- Use only the API module in interfaces/contracts -->
<dependency>
    <groupId>io.github.yubrajsahoo</groupId>
    <artifactId>smf4j-api</artifactId>
    <scope>provided</scope>
</dependency>

<!-- Full implementation in services -->
<dependency>
    <groupId>io.github.yubrajsahoo</groupId>
    <artifactId>smf4j-spring-boot-starter</artifactId>
    <scope>runtime</scope>
</dependency>

<!-- Or use specific modules -->
<dependency>
    <groupId>io.github.yubrajsahoo</groupId>
    <artifactId>smf4j-core</artifactId>
</dependency>
<dependency>
    <groupId>io.github.yubrajsahoo</groupId>
    <artifactId>smf4j-engine</artifactId>
</dependency>
          `} />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Best Practices</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li>Use descriptive metric names following a consistent naming convention</li>
            <li>Keep tag cardinality low - avoid user IDs or random tokens as tags</li>
            <li>Use enable=false for expensive metrics in production</li>
            <li>Prefer simple SpEL expressions for better performance</li>
            <li>Document complex expressions with comments</li>
            <li>Use increment parameter for bulk operations to reduce metric volume</li>
            <li>Monitor gauge expressions for potential performance impact</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AdvancedFeaturesDoc;
