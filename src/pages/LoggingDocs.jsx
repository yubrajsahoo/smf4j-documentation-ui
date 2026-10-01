import React, { useState } from 'react';
import CodeBlock from '../components/CodeBlock';

const LoggingDocs = () => {
  const [selectedLevel, setSelectedLevel] = useState('info');

  return (
    <div className="animate-in fade-in duration-500">
      <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl mb-4">
        Logging & Diagnostics
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        SMF4J provides comprehensive logging capabilities to track metrics collection and debug your application. You can customize log levels, messages, and implement your own logging strategies.
      </p>

      <div className="prose prose-indigo max-w-none text-gray-600 space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Overview</h2>
          <p>
            SMF4J's logging system has two main components:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-gray-900">MetricsLogger</strong> - Abstract base class for custom logging implementations</li>
            <li><strong className="text-gray-900">DefaultMetricsLogger</strong> - Default implementation using SLF4J</li>
            <li><strong className="text-gray-900">LogMetrics</strong> - Utility class for programmatic metric logging</li>
            <li><strong className="text-gray-900">Smf4jMetricsProperties</strong> - Configuration for log messages and levels</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4\">Default Logging Behavior</h2>
          <p>\n            When metrics are collected, SMF4J automatically logs them using the DefaultMetricsLogger:
          </p>
          <CodeBlock language=\"yaml\" code={`
# application.yml - Default logging configuration
smf4j:
  metrics:
    logLevel: INFO                          # Log level for enabled metrics (DEBUG, INFO, WARN, ERROR)
    disableLogLevel: DEBUG                  # Log level for disabled metrics
    logMessage: \"Metrics Logs For With->\"  # Prefix for enabled metric logs
    disableLogMessage: \"Metrics Disabled For->\"  # Prefix for disabled metric logs
          `} />

          <p className=\"mt-4\">Example log output:</p>
          <CodeBlock language=\"text\" code={`
INFO - Metrics Logs For With->name=orders.created->currency=USD->status=success->description=Total orders created->increment=1
DEBUG - Metrics Disabled For->name=experimental.tracking->description=Experimental metric
          `} />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4\">Customizing Log Configuration</h2>
          <p>
            Customize logging via application properties:
          </p>
          <CodeBlock language=\"yaml\" code={`
# application.yml
smf4j:
  metrics:
    # Change log level for active metrics
    logLevel: WARN
    
    # Change log level for disabled metrics
    disableLogLevel: TRACE
    
    # Customize log message prefix for active metrics
    logMessage: \"[METRIC] Event detected: \"
    
    # Customize log message for disabled metrics
    disableLogMessage: \"[METRIC-DISABLED] Skipped: \"
          `} />

          <p className=\"mt-4\">The log output will now show:</p>
          <CodeBlock language=\"text\" code={`
WARN - [METRIC] Event detected: name=payment.processed->amount=100->currency=USD->description=Payment processed
TRACE - [METRIC-DISABLED] Skipped: name=debug.tracking->description=Debug tracking disabled
          `} />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4\">Log Levels</h2>
          <p>
            SMF4J supports all standard SLF4J log levels:
          </p>
          <div className=\"bg-gray-50 p-4 rounded-lg space-y-3\">\n            <div>\n              <strong className=\"text-gray-900\">TRACE</strong>\n              <p>Detailed diagnostic information for troubleshooting</p>\n            </div>\n            <div>\n              <strong className=\"text-gray-900\">DEBUG</strong>\n              <p>Debugging information, useful during development</p>\n            </div>\n            <div>\n              <strong className=\"text-gray-900\">INFO</strong>\n              <p>General informational messages (default)</p>\n            </div>\n            <div>\n              <strong className=\"text-gray-900\">WARN</strong>\n              <p>Warning messages for potentially problematic situations</p>\n            </div>\n            <div>\n              <strong className=\"text-gray-900\">ERROR</strong>\n              <p>Error messages for serious problems</p>\n            </div>\n          </div>\n        </section>\n\n        <section>\n          <h2 className=\"text-2xl font-bold text-gray-900 mt-10 mb-4\">LogMetrics Utility Class</h2>\n          <p>\n            For programmatic metric logging, use the LogMetrics utility class with different log levels:\n          </p>\n          <CodeBlock language=\"java\" code={`\npublic class AnalyticsService {\n    \n    // Log at DEBUG level\n    public void trackDebugMetric() {\n        LogMetrics.debug(\n            \"analytics.event.processed\",\n            \"Debug level analytics event\",\n            true,\n            new Tag(\"type\", \"debug\")\n        );\n    }\n    \n    // Log at INFO level\n    public void trackInfoMetric() {\n        LogMetrics.info(\n            \"analytics.event.processed\",\n            \"Info level analytics event\",\n            true,\n            new Tag(\"type\", \"info\")\n        );\n    }\n    \n    // Log at WARN level\n    public void trackWarningMetric() {\n        LogMetrics.warn(\n            \"analytics.degradation\",\n            \"Performance degradation detected\",\n            true,\n            new Tag(\"severity\", \"high\")\n        );\n    }\n    \n    // Log at ERROR level\n    public void trackErrorMetric() {\n        LogMetrics.error(\n            \"analytics.error\",\n            \"Analytics processing error\",\n            true,\n            new Tag(\"error_type\", \"processing\")\n        );\n    }\n    \n    // Log with custom log level\n    public void trackCustomLevelMetric() {\n        LogMetrics.log(\n            \"analytics.event\",\n            \"Custom level event\",\n            true,\n            LogLevel.WARN,\n            new Tag(\"custom\", \"true\")\n        );\n    }\n}\n          `} />\n        </section>\n\n        <section>\n          <h2 className=\"text-2xl font-bold text-gray-900 mt-10 mb-4\">Custom Logger Implementation</h2>\n          <p>\n            Implement a custom MetricsLogger to have full control over metric logging:\n          </p>\n          <CodeBlock language=\"java\" code={`\nimport io.github.yubrajsahoo.smf4j.core.logger.MetricsLogger;\nimport io.github.yubrajsahoo.smf4j.api.domain.Metrics;\nimport io.github.yubrajsahoo.smf4j.api.enums.LogLevel;\nimport org.slf4j.Logger;\nimport org.slf4j.LoggerFactory;\nimport com.google.gson.Gson;\n\npublic class JsonMetricsLogger extends MetricsLogger {\n    private static final Logger logger = LoggerFactory.getLogger(JsonMetricsLogger.class);\n    private final Gson gson = new Gson();\n    \n    @Override\n    public void log(Metrics metrics) {\n        log(metrics, LogLevel.INFO);\n    }\n    \n    @Override\n    public void log(Metrics metrics, LogLevel level) {\n        // Convert metric to JSON for structured logging\n        String jsonLog = gson.toJson(metrics);\n        LogLevel.log(logger, level, jsonLog);\n    }\n}\n          `} />\n        </section>\n\n        <section>\n          <h2 className=\"text-2xl font-bold text-gray-900 mt-10 mb-4\">Register Custom Logger</h2>\n          <p>\n            Register your custom logger in Spring Boot configuration:\n          </p>\n          <CodeBlock language=\"java\" code={`\nimport org.springframework.boot.autoconfigure.AutoConfiguration;\nimport org.springframework.context.annotation.Bean;\nimport org.springframework.context.annotation.Primary;\nimport io.github.yubrajsahoo.smf4j.core.logger.MetricsLogger;\n\n@AutoConfiguration\npublic class CustomMetricsLoggerConfig {\n    \n    @Bean\n    @Primary  // Override default logger\n    public MetricsLogger customMetricsLogger() {\n        return new JsonMetricsLogger();\n    }\n}\n          `} />\n        </section>\n\n        <section>\n          <h2 className=\"text-2xl font-bold text-gray-900 mt-10 mb-4\">Programmatic Logger Customization</h2>\n          <p>\n            Create a more sophisticated custom logger that formats output differently:\n          </p>\n          <CodeBlock language=\"java\" code={`\npublic class EnrichedMetricsLogger extends MetricsLogger {\n    private static final Logger logger = LoggerFactory.getLogger(EnrichedMetricsLogger.class);\n    private final DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;\n    private final String applicationName;\n    \n    public EnrichedMetricsLogger(String applicationName) {\n        this.applicationName = applicationName;\n    }\n    \n    @Override\n    public void log(Metrics metrics) {\n        log(metrics, LogLevel.INFO);\n    }\n    \n    @Override\n    public void log(Metrics metrics, LogLevel level) {\n        // Custom formatting with timestamp, app name, and structured data\n        String timestamp = ZonedDateTime.now().format(formatter);\n        String formatted = String.format(\n            \"[%s] [APP=%s] [METRIC=%s] [ENABLED=%s] %s\",\n            timestamp,\n            applicationName,\n            metrics.getName(),\n            metrics.isEnable(),\n            prepareLog(\"Tags:\", metrics)\n        );\n        \n        LogLevel.log(logger, level, formatted);\n    }\n}\n          `} />\n        </section>\n\n        <section>\n          <h2 className=\"text-2xl font-bold text-gray-900 mt-10 mb-4\">Logging Configuration Best Practices</h2>\n          <ul className=\"list-disc pl-5 space-y-2\">\n            <li>Use DEBUG or TRACE levels during development and troubleshooting</li>\n            <li>Use INFO level for production metrics tracking</li>\n            <li>Use WARN level for important business events and degradation</li>\n            <li>Use ERROR level only for critical failures</li>\n            <li>Keep log message prefixes concise and meaningful</li>\n            <li>Disable metrics logging for high-frequency events to reduce log volume</li>\n            <li>Use custom loggers for structured logging (JSON, MDC, etc.)</li>\n            <li>Set disable log level to DEBUG or lower in production to minimize noise</li>\n          </ul>\n        </section>\n\n        <section>\n          <h2 className=\"text-2xl font-bold text-gray-900 mt-10 mb-4\">Structured Logging Example</h2>\n          <p>\n            Combine SMF4J with MDC (Mapped Diagnostic Context) for structured logging:\n          </p>\n          <CodeBlock language=\"java\" code={`\nimport org.slf4j.MDC;\nimport io.github.yubrajsahoo.smf4j.core.logger.MetricsLogger;\n\npublic class StructuredMetricsLogger extends MetricsLogger {\n    private static final Logger logger = LoggerFactory.getLogger(StructuredMetricsLogger.class);\n    \n    @Override\n    public void log(Metrics metrics) {\n        log(metrics, LogLevel.INFO);\n    }\n    \n    @Override\n    public void log(Metrics metrics, LogLevel level) {\n        // Add contextual information to MDC\n        MDC.put(\"metric_name\", metrics.getName());\n        MDC.put(\"metric_enabled\", String.valueOf(metrics.isEnable()));\n        MDC.put(\"metric_tags\", metrics.getTags().toString());\n        \n        try {\n            String message = prepareLog(\"Metric recorded\", metrics);\n            LogLevel.log(logger, level, message);\n        } finally {\n            // Clean up MDC\n            MDC.remove(\"metric_name\");\n            MDC.remove(\"metric_enabled\");\n            MDC.remove(\"metric_tags\");\n        }\n    }\n}\n          `} />\n        </section>\n\n        <section>\n          <h2 className=\"text-2xl font-bold text-gray-900 mt-10 mb-4\">Troubleshooting Logging Issues</h2>\n          <ul className=\"list-disc pl-5 space-y-3\">\n            <li>\n              <strong className=\"text-gray-900\">No logs appearing:</strong> Check that your logger configuration enables SMF4J logs. Verify log level matches your configuration.\n            </li>\n            <li>\n              <strong className=\"text-gray-900\">Too many logs:</strong> Increase the disableLogLevel to ERROR or disable metrics logging for high-frequency events.\n            </li>\n            <li>\n              <strong className=\"text-gray-900\">Custom logger not used:</strong> Ensure it's marked with @Primary and properly registered as a @Bean.\n            </li>\n            <li>\n              <strong className=\"text-gray-900\">Missing tags in logs:</strong> Verify SpEL expressions in @Tags are correctly evaluating in the tag preparation step.\n            </li>\n          </ul>\n        </section>\n      </div>\n    </div>\n  );\n};\n\nexport default LoggingDocs;\n