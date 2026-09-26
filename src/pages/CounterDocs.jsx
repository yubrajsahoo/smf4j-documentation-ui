import React from 'react';
import CodeBlock from '../components/CodeBlock';

const CounterDocs = () => {
  return (
    <div className="animate-in fade-in duration-500">
      <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl mb-4">
        @Counter
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        The <code>@Counter</code> annotation monotonically increments every time the annotated method is executed. It is highly useful for tracking occurrences like exceptions, specific events, or business milestones.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Supported Attributes</h2>
      <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-8">
        <li><strong>name (String):</strong> The metric name (required).</li>
        <li><strong>description (String):</strong> Metric description.</li>
        <li><strong>tags (Tags[]):</strong> Array of dynamic or static tags.</li>
        <li><strong>increment (long):</strong> The amount to increment per call (default: <code>1</code>).</li>
        <li><strong>enable (boolean):</strong> Flag to temporarily disable the metric (default: <code>true</code>).</li>
      </ul>

      <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Tracking Exceptions</h2>
      <p className="text-gray-600 mb-4">
        A great use case for <code>@Counter</code> is globally tracking exceptions inside a Spring <code>@RestControllerAdvice</code>. By using SpEL, you can dynamically extract the exception class name and pass it as a tag!
      </p>

      <CodeBlock code={`
import io.github.yubrajsahoo.smf4j.api.annotation.Counter;
import io.github.yubrajsahoo.smf4j.api.annotation.Tags;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @Counter(
            name = "api.portfolio.exception",
            description = "Exception Handler Processed Error",
            tags = {
                    @Tags(key = "api", value = "GLOBAL_EXCEPTION_HANDLER"),
                    // Dynamically extracts the Class name of the first argument (the Exception)
                    @Tags(key = "exception_type", value = "#a0.getClass().getSimpleName()")
            }
    )
    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<String> handleAuthError(UsernameNotFoundException ex) {
        return ResponseEntity.status(401).body(ex.getMessage());
    }
}
      `} />
    </div>
  );
};

export default CounterDocs;
