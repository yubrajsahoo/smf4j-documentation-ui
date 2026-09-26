import React from 'react';
import CodeBlock from '../components/CodeBlock';

const SpELDocs = () => {
  return (
    <div className="animate-in fade-in duration-500">
      <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl mb-4">
        SpEL Dynamic Tags
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        One of the most powerful features of <code>smf4j</code> is its native support for the Spring Expression Language (SpEL) inside metric tags. This eliminates the need to write custom <code>MeterFilter</code> or <code>TagsProvider</code> boilerplate classes.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Common SpEL Expressions</h2>
      
      <div className="overflow-x-auto border border-gray-200 rounded-lg mb-8 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expression</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-indigo-600">Smf4jSpelConstants.METHOD_NAME</td>
              <td className="px-6 py-4 text-sm text-gray-700">Resolves to the name of the intercepted method.</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-indigo-600">#error != null ? 'ERROR' : 'SUCCESS'</td>
              <td className="px-6 py-4 text-sm text-gray-700">Tracks if the method threw an exception (generates an <code>outcome</code> tag).</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-indigo-600">#a0, #a1, #p0...</td>
              <td className="px-6 py-4 text-sm text-gray-700">Accesses method arguments by index. (e.g. <code>#a0.getClass().getSimpleName()</code>)</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-indigo-600">#myParamName</td>
              <td className="px-6 py-4 text-sm text-gray-700">Accesses a parameter directly by its name (requires code compiled with <code>-parameters</code>).</td>
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
        @Tags(key = "resource_type", value = "#metaData.resourceType.name()"),
        @Tags(key = "access_type", value = "#metaData.accessType.name()")
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
