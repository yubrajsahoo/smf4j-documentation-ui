import React from 'react';
import CodeBlock from '../components/CodeBlock';

const SpELDocs = () => {
  return (
    <div className="animate-in fade-in duration-500">
      <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl mb-4">
        SpEL Dynamic Tags
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        One of the most powerful features of <code>smf4j</code> is its native support for the Spring Expression Language (SpEL) inside <strong>both metric tag keys and values</strong>. This eliminates the need to write custom <code>MeterFilter</code> or <code>TagsProvider</code> boilerplate classes.
      </p>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-5 mb-10 shadow-sm rounded-r-lg">
        <h3 className="text-xl font-semibold text-blue-900 mb-3">SpEL Syntax Rules, Designs & Performance</h3>
        
        <p className="text-sm text-blue-800 mb-4">
          The evaluation engine explicitly checks for specific prefixes before attempting to parse an expression. As defined in <code>MetricsConstant.ALLOWED_SPEL_DESIGNS</code>, your key or value <strong>must start with one of the following</strong> to trigger SpEL evaluation:
        </p>
        
        <ul className="mb-4 text-sm text-blue-800 list-disc list-inside space-y-2">
          <li>
            <code className="font-mono bg-blue-100 text-blue-900 px-1 py-0.5 rounded">@</code> 
            <strong>Bean Reference:</strong> Invoke methods or properties on a Spring Bean registered in the application context (e.g., <code>@myService.calculateTag()</code>).
          </li>
          <li>
            <code className="font-mono bg-blue-100 text-blue-900 px-1 py-0.5 rounded">#</code> 
            <strong>Context Variables:</strong> Access local variables injected by the interceptor context, such as arguments, results, or the target method signature (e.g., <code>#result.id</code> or <code>#a0</code>).
          </li>
          <li>
            <code className="font-mono bg-blue-100 text-blue-900 px-1 py-0.5 rounded">T</code> 
            <strong>Type Reference:</strong> Access static methods or static constants on a specific Java class (e.g., <code>T(java.lang.Math).random()</code>).
          </li>
        </ul>

        <div className="bg-blue-100 p-3 rounded text-sm text-blue-900 mb-2">
          <strong>Literal Fallback Strategy:</strong> If your tag key or value does not start with any of the prefixes above (e.g., <code>"my-static-value"</code>), <strong>it will not be evaluated as SpEL.</strong> Instead, the engine will take the input exactly as-is and return it as a literal string. This allows you to seamlessly mix static strings and dynamic SpEL expressions in both your keys and values without parsing overhead! (Parsed expressions are cached internally for speed).
        </div>
        
        <div className="bg-blue-100 p-3 rounded text-sm text-blue-900">
          <strong>Safety:</strong> If a SpEL expression yields <code>null</code> or fails to evaluate, it automatically falls back to <code>"none"</code>.
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Available Context Variables</h2>
      <p className="text-gray-600 mb-6">
        When evaluating SpEL expressions, <code>smf4j</code> populates the evaluation context with several root variables. You can access these variables using the <code>#</code> prefix.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Execution Context</h3>
          <ul className="space-y-4">
            <li>
              <code className="text-indigo-600 font-mono bg-indigo-50 px-1 py-0.5 rounded">#joinPoint</code>
              <span className="text-sm text-gray-600 block mt-1">The AOP <code>JoinPoint</code> representing the intercepted method execution.</span>
              <span className="text-xs text-gray-500 block mt-1"><em>Example:</em> <code>#joinPoint.target.class.simpleName</code></span>
            </li>
            <li>
              <code className="text-indigo-600 font-mono bg-indigo-50 px-1 py-0.5 rounded">#methodSignature</code>
              <span className="text-sm text-gray-600 block mt-1">The <code>MethodSignature</code> of the intercepted method.</span>
              <span className="text-xs text-gray-500 block mt-1"><em>Example:</em> <code>#methodSignature.declaringTypeName</code></span>
            </li>
            <li>
              <code className="text-indigo-600 font-mono bg-indigo-50 px-1 py-0.5 rounded">#methodName</code>
              <span className="text-sm text-gray-600 block mt-1">A direct shortcut to the intercepted method's name.</span>
              <span className="text-xs text-gray-500 block mt-1"><em>Example:</em> <code>#methodName.toUpperCase()</code></span>
            </li>
          </ul>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Method Arguments</h3>
          <ul className="space-y-4">
            <li>
              <code className="text-indigo-600 font-mono bg-indigo-50 px-1 py-0.5 rounded">#args</code>
              <span className="text-sm text-gray-600 block mt-1">The full array of method arguments (<code>Object[]</code>).</span>
              <span className="text-xs text-gray-500 block mt-1"><em>Example:</em> <code>#args.length</code></span>
            </li>
            <li>
              <code className="text-indigo-600 font-mono bg-indigo-50 px-1 py-0.5 rounded">#a0</code> or <code className="text-indigo-600 font-mono bg-indigo-50 px-1 py-0.5 rounded">#p0</code>
              <span className="text-sm text-gray-600 block mt-1">Individual arguments accessed by their zero-based index.</span>
              <span className="text-xs text-gray-500 block mt-1"><em>Example:</em> <code>#a0.id</code> (accesses the <code>id</code> property of the 1st arg)</span>
            </li>
            <li>
              <code className="text-indigo-600 font-mono bg-indigo-50 px-1 py-0.5 rounded">#&lt;paramName&gt;</code>
              <span className="text-sm text-gray-600 block mt-1">Arguments accessed by their declared variable name. <em>Requires <code>-parameters</code> flag.</em></span>
              <span className="text-xs text-gray-500 block mt-1"><em>Example:</em> <code>#user.role</code></span>
            </li>
          </ul>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Return & Exceptions</h3>
          <ul className="space-y-4">
            <li>
              <code className="text-indigo-600 font-mono bg-indigo-50 px-1 py-0.5 rounded">#result</code>
              <span className="text-sm text-gray-600 block mt-1">The object returned by the method. Only available if the method completes successfully.</span>
              <span className="text-xs text-gray-500 block mt-1"><em>Example:</em> <code>#result.status</code></span>
            </li>
            <li>
              <code className="text-indigo-600 font-mono bg-indigo-50 px-1 py-0.5 rounded">#error</code>
              <span className="text-sm text-gray-600 block mt-1">The <code>Throwable</code> exception thrown by the method, if any.</span>
              <span className="text-xs text-gray-500 block mt-1"><em>Example:</em> <code>#error.message</code></span>
            </li>
            <li>
              <code className="text-indigo-600 font-mono bg-indigo-50 px-1 py-0.5 rounded">#rootError</code>
              <span className="text-sm text-gray-600 block mt-1">The deepest root cause of the thrown exception, unwrapped automatically.</span>
              <span className="text-xs text-gray-500 block mt-1"><em>Example:</em> <code>#rootError.class.simpleName</code></span>
            </li>
          </ul>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-2">Provided Spels By SMF4J</h2>
      <div className="mb-4 text-sm text-gray-500 font-mono">
        class: <code>io.github.yubrajsahoo.smf4j.api.constant.Smf4jSpelConstants</code>
      </div>
      <p className="text-gray-600 mb-4">
        Once you understand the root variables, you can chain properties and methods on them using standard SpEL syntax. The <code>Smf4jSpelConstants</code> class provides pre-built constants for common expressions:
      </p>

      <div className="overflow-x-auto border border-gray-200 rounded-lg mb-8 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expression / Constant</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-indigo-600">#methodName<br/><span className="text-xs text-gray-400">Smf4jSpelConstants.METHOD_NAME</span></td>
              <td className="px-6 py-4 text-sm text-gray-700">Resolves to the name of the intercepted method.</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-indigo-600">#methodSignature.declaringType.simpleName<br/><span className="text-xs text-gray-400">Smf4jSpelConstants.CLASS_NAME</span></td>
              <td className="px-6 py-4 text-sm text-gray-700">Accesses the <code>declaringType</code> property on the <code>#methodSignature</code> root variable to get the simple class name (e.g., "UserService").</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-indigo-600">#methodSignature.declaringTypeName<br/><span className="text-xs text-gray-400">Smf4jSpelConstants.FULLY_QUALIFIED_CLASS_NAME</span></td>
              <td className="px-6 py-4 text-sm text-gray-700">Resolves to the fully qualified class name (e.g., "com.example.UserService").</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-indigo-600">#methodSignature.declaringType.simpleName + '.' + #methodName<br/><span className="text-xs text-gray-400">Smf4jSpelConstants.CLASS_AND_METHOD_NAME</span></td>
              <td className="px-6 py-4 text-sm text-gray-700">Combines the simple class name and method name into one string (e.g., "UserService.getUser").</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-indigo-600">#a0<br/><span className="text-xs text-gray-400">Smf4jSpelConstants.FIRST_ARG</span></td>
              <td className="px-6 py-4 text-sm text-gray-700">Resolves to the first argument passed to the intercepted method.</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-indigo-600">#a1<br/><span className="text-xs text-gray-400">Smf4jSpelConstants.SECOND_ARG</span></td>
              <td className="px-6 py-4 text-sm text-gray-700">Resolves to the second argument passed to the intercepted method.</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-indigo-600">#result<br/><span className="text-xs text-gray-400">Smf4jSpelConstants.RESULT</span></td>
              <td className="px-6 py-4 text-sm text-gray-700">Resolves to the returned result of the method execution. Note: Only available in contexts evaluated after the method has successfully returned.</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-indigo-600">#error<br/><span className="text-xs text-gray-400">Smf4jSpelConstants.ERROR</span></td>
              <td className="px-6 py-4 text-sm text-gray-700">Resolves to the thrown Exception object during the method execution. Note: Only available in error-handling contexts.</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-indigo-600">#error != null ? #error.class.simpleName : 'None'<br/><span className="text-xs text-gray-400">Smf4jSpelConstants.ERROR_TYPE</span></td>
              <td className="px-6 py-4 text-sm text-gray-700">Safely checks the <code>#error</code> variable and extracts its simple class name. Returns 'None' if no error occurred.</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-indigo-600">#error != null ? #error.message : 'None'<br/><span className="text-xs text-gray-400">Smf4jSpelConstants.ERROR_MESSAGE</span></td>
              <td className="px-6 py-4 text-sm text-gray-700">Safely extracts the message from the <code>#error</code> variable. Returns 'None' if no error occurred.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Advanced Example</h2>
      <p className="text-gray-600 mb-4">
        You can reach deep into nested objects to extract contextual tags.
      </p>

      <CodeBlock code={`
@Timer(
    name = "api.portfolio.cloud.upload",
    tags = {
        // Static Key with SpEL Value
        @Tags(key = "resource_type", value = "#metaData.resourceType.name()"),
        
        // SpEL Key with SpEL Value
        @Tags(key = "#metaData.getDynamicKeyName()", value = "#metaData.accessType.name()")
    }
)
public String uploadFile(FileMetaData metaData, MultipartFile file) {
    // ...
}
      `} />
    </div>
  );
};

export default SpELDocs;
