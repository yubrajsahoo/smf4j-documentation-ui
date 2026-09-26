import React from 'react';
import CodeBlock from '../components/CodeBlock';

const GaugeDocs = () => {
  return (
    <div className="animate-in fade-in duration-500">
      <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl mb-4">
        @Gauge
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Gauges measure the current value of a state. Unlike Timers and Counters which are push-based (calculated per request), Gauges are pull-based and execute in the background when the metrics registry (like Prometheus) is scraped.
      </p>

      <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 mb-8">
        <p className="text-sm text-indigo-700">
          <strong>Pro Tip:</strong> <code>smf4j</code> handles Spring AOP proxy unwrapping automatically, which means you can safely apply <code>@Gauge</code> to fields inside classes that use <code>@Transactional</code>, <code>@Async</code>, or <code>@Timer</code>.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Field-Level Gauge Example</h2>
      <p className="text-gray-600 mb-4">
        You can directly annotate a numeric field (e.g. <code>AtomicLong</code>). This is perfect for keeping an in-memory count of lifetime logins:
      </p>

      <CodeBlock code={`
import io.github.yubrajsahoo.smf4j.api.annotation.Gauge;
import io.github.yubrajsahoo.smf4j.api.annotation.Tags;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Gauge(
            name = "api.portfolio.logins.total",
            description = "Total number of successful logins",
            tags = {
                    @Tags(key = "api", value = "NO_OF_USER_LOGIN"),
            }
    )
    private final AtomicLong totalLogins = new AtomicLong(0);

    @Override
    public UserDetails loadUserByUsername(String email) {
        // ... execute login logic

        totalLogins.incrementAndGet(); // The gauge reads this value automatically

        return userDetails;
    }
}
      `} />

    </div>
  );
};

export default GaugeDocs;
