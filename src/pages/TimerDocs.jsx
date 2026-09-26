import React from 'react';
import CodeBlock from '../components/CodeBlock';

const TimerDocs = () => {
  return (
    <div className="animate-in fade-in duration-500">
      <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl mb-4">
        @Timer
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        The <code>@Timer</code> annotation tracks the duration of a method execution. It automatically provides latency (max, sum, and count metrics).
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Supported Attributes</h2>
      <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-8">
        <li><strong>name (String):</strong> The metric name (required).</li>
        <li><strong>description (String):</strong> Metric description.</li>
        <li><strong>tags (Tags[]):</strong> Array of dynamic or static tags.</li>
        <li><strong>enable (boolean):</strong> Flag to temporarily disable the metric (default: <code>true</code>).</li>
      </ul>

      <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Usage Example</h2>
      <p className="text-gray-600 mb-4">
        Here is a real-world example from the <code>portfolio-api</code>, tracking the execution of a user authentication method:
      </p>

      <CodeBlock code={`
import io.github.yubrajsahoo.smf4j.api.annotation.Timer;
import io.github.yubrajsahoo.smf4j.api.annotation.Tags;
import io.github.yubrajsahoo.smf4j.api.constant.Smf4jSpelConstants;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Timer(
            name = "api.portfolio.service",
            description = "Execute Service Method",
            tags = {
                    @Tags(key = "api", value = "CUSTOM_USER_DETAILS_SERVICE"),
                    @Tags(key = "operation", value = "LOAD_USER_BY_USERNAME"),
                    @Tags(key = "method", value = Smf4jSpelConstants.METHOD_NAME),
                    @Tags(key = "outcome", value = "#error != null ? 'ERROR' : 'SUCCESS'")
            }
    )
    @Override
    public UserDetails loadUserByUsername(@NonNull String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return org.springframework.security.core.userdetails.User.withUsername(user.getEmail())
                .password(user.getPassword())
                .authorities(prepareAuthorities(user.getRoles()))
                .build();
    }
}
      `} />

      <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Prometheus Output</h3>
      <p className="text-gray-600 mb-4">This will generate the following time series in Prometheus:</p>
      
      <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm text-gray-800">
        <p>api_portfolio_service_seconds_count&#123;api="CUSTOM_USER_DETAILS_SERVICE", method="loadUserByUsername", operation="LOAD_USER_BY_USERNAME", outcome="SUCCESS"&#125; 142.0</p>
        <p>api_portfolio_service_seconds_sum&#123;...&#125; 0.2351</p>
        <p>api_portfolio_service_seconds_max&#123;...&#125; 0.045</p>
      </div>
    </div>
  );
};

export default TimerDocs;
