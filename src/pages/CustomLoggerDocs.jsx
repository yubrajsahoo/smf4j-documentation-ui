import React from 'react';
import CodeBlock from '../components/CodeBlock';

const CustomLoggerDocs = () => {
  return (
    <div className="animate-in fade-in duration-500">
      <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl mb-4">
        Custom Logger
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        By default, <code>smf4j</code> logs recorded metrics using the <code>DefaultMetricsLogger</code>, which writes output to SLF4J at the <code>INFO</code> level. However, you can easily plug in your own custom logic to format the logs differently, write to external logging systems, or change the log level.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Default Log Structure</h2>
      <p className="text-gray-600 mb-4">
        Out of the box, the <code>DefaultMetricsLogger</code> formats metric records into a simple delimited string using the <code>-&gt;</code> separator. Here is an example of what it logs to the console for a counter metric:
      </p>
      
      <div className="bg-gray-900 text-green-400 font-mono text-sm p-4 rounded-lg mb-8 overflow-x-auto whitespace-pre">
        [INFO] Metrics Logs For With-&gt;name=api.portfolio.cloud.upload-&gt;resource_type=FILE-&gt;access_type=PUBLIC-&gt;description=Upload file API-&gt;increment=1.0
      </div>


      <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Changing the Default Log Level</h2>
      <p className="text-gray-600 mb-4">
        If you only want to change the log level (e.g., from <code>INFO</code> to <code>DEBUG</code>) without changing the formatting, you don't need to write any Java code at all! The auto-configuration automatically picks up the <code>smf4j.metrics.log-level</code> property from your application environment.
      </p>
      
      <p className="text-gray-600 mb-4">
        Simply add the following to your <code>application.properties</code>:
      </p>
      <CodeBlock code={`# Supported levels: INFO (default), DEBUG, WARN, ERROR, or DISABLED
smf4j.metrics.log-level=DISABLED`} />
      
      <p className="text-gray-600 mt-4 mb-4">
        Setting the level to <code>DISABLED</code> will completely turn off all metrics logging. Or in your <code>application.yml</code>:
      </p>
      <CodeBlock code={`smf4j:
  metrics:
    log-level: DISABLED`} />

      <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">The MetricsLogger Abstract Class</h2>
      <p className="text-gray-600 mb-4">
        To customize the logging behavior, you just need to extend the <code>MetricsLogger</code> abstract class provided by the core library:
      </p>

      <CodeBlock code={`package io.github.yubrajsahoo.smf4j.core.logger;

import io.github.yubrajsahoo.smf4j.api.domain.Metrics;

public abstract class MetricsLogger {
    
    public abstract void log(Metrics metrics);
    
    protected String prepareLog(String message, Metrics metrics) {
        // ...
    }
    
    protected String prepareTagsLog(Metrics metrics) {
        // ...
    }
    
    protected void logMessage(String logLevel, String logMessage) {
        // Automatically handles SLF4J log levels, including skipping if DISABLED

    }
}`} />

      <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Writing a Custom Logger</h2>
      <p className="text-gray-600 mb-4">
        Here is an example of a custom logger that logs metric data at the <code>DEBUG</code> level instead of <code>INFO</code>:
      </p>

      <CodeBlock code={`import io.github.yubrajsahoo.smf4j.core.logger.MetricsLogger;
import io.github.yubrajsahoo.smf4j.api.domain.Metrics;
import io.github.yubrajsahoo.smf4j.api.domain.CounterMetrics;
import org.springframework.stereotype.Component;

@Component
public class MyCustomMetricsLogger extends MetricsLogger {

    @Override
    public void log(Metrics metrics) {
        StringBuilder builder = new StringBuilder();
        builder.append("Metric [").append(metrics.getName()).append("] ");
        
        if (metrics instanceof CounterMetrics counter) {
            builder.append("incremented by ").append(counter.getIncrement()).append(" ");
        }
        
        builder.append("with tags: ");
        metrics.getTags().forEach(t -> 
            builder.append(t.getKey()).append("=").append(t.getValue()).append(" ")
        );
        
        // Use the built-in logMessage to handle SLF4J level checks!
        logMessage("DEBUG", builder.toString());
    }
}`} />



      <h3 className="text-xl font-bold text-gray-900 mt-10 mb-4">Overriding Formatting Methods</h3>
      <p className="text-gray-600 mb-4">
        Because <code>MetricsLogger</code> is an abstract class, it provides built-in protected methods like <code>prepareLog</code> and <code>prepareTagsLog</code>. If you want to keep the default logging behavior (logging at <code>INFO</code> level to SLF4J) but change how the tags are formatted, you can simply extend <code>DefaultMetricsLogger</code> and override the formatting logic:
      </p>

      <CodeBlock code={`import io.github.yubrajsahoo.smf4j.core.logger.impl.DefaultMetricsLogger;
import io.github.yubrajsahoo.smf4j.api.domain.Metrics;
import org.springframework.stereotype.Component;

@Component
public class MyFormattingLogger extends DefaultMetricsLogger {

    @Override
    protected String prepareTagsLog(Metrics metrics) {
        // Change the tag delimiter from "->" to " | "
        StringBuilder tagsBuilder = new StringBuilder();
        metrics.getTags().forEach(tag -> tagsBuilder.append(" | ")
                .append(tag.getKey()).append("=").append(tag.getValue()));
        return tagsBuilder.toString();
    }
}`} />

      <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">How to Use Your Custom Logger</h2>
      <p className="text-gray-600 mb-4">
        Once you have written your custom implementation, you need to register it with the Spring application context. Because <code>smf4j</code> relies on Spring's <code>@ConditionalOnMissingBean(MetricsLogger.class)</code>, it will automatically detect your custom logger and disable the default one.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Option 1: Using @Component</h3>
          <p className="text-sm text-gray-600 mb-4">Simply annotate your custom class with <code>@Component</code>. Spring will scan and register it automatically.</p>
          <pre className="bg-gray-100 p-3 rounded text-sm font-mono text-gray-800 overflow-x-auto">
{`@Component
public class MyCustomMetricsLogger 
    extends MetricsLogger {
    // ...
}`}
          </pre>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Option 2: Using @Bean</h3>
          <p className="text-sm text-gray-600 mb-4">Alternatively, you can define it inside any of your <code>@Configuration</code> classes.</p>
          <pre className="bg-gray-100 p-3 rounded text-sm font-mono text-gray-800 overflow-x-auto">
{`@Configuration
public class MetricsConfig {
    
    @Bean
    public MetricsLogger metricsLogger() {
        return new MyCustomMetricsLogger();
    }
}`}
          </pre>
        </div>
      </div>
      
      <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-8">
        <p className="text-sm text-green-800">
          <strong>That's it!</strong> The SMF4J engine will now route all metric logs through your custom implementation instead of the default one.
        </p>
      </div>
    </div>
  );
};

export default CustomLoggerDocs;
