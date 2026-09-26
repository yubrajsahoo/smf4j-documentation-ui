import React from 'react';

const ArchitectureDocs = () => {
  return (
    <div className="animate-in fade-in duration-500">
      <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl mb-4">
        Architecture & Modules
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        The SMF4J library separates concerns into distinct modules, allowing you to use exactly what you need without bloating your classpath.
      </p>

      <div className="prose prose-indigo max-w-none">
        <ul className="list-disc pl-5 space-y-4 text-gray-600 mb-8">
          <li>
            <strong className="text-gray-900 font-bold text-lg"><code>smf4j-api</code></strong>
            <p className="mt-1">Contains the core annotations (<code>@Counter</code>, <code>@Timer</code>, <code>@Gauge</code>, <code>@Tags</code>) and abstract domain models.</p>
          </li>
          <li>
            <strong className="text-gray-900 font-bold text-lg"><code>smf4j-core</code></strong>
            <p className="mt-1">The foundational metric recording layer. Contains the direct integration logic with the Micrometer library.</p>
          </li>
          <li>
            <strong className="text-gray-900 font-bold text-lg"><code>smf4j-engine</code></strong>
            <p className="mt-1">The brains of the operation. Contains Spring AOP aspects and the SpEL (Spring Expression Language) evaluation engine to process annotations dynamically at runtime.</p>
          </li>
          <li>
            <strong className="text-gray-900 font-bold text-lg"><code>smf4j-spring-boot-starter</code></strong>
            <p className="mt-1">The plug-and-play auto-configuration dependency. Simply add this to your project to automatically bootstrap and register the engine.</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ArchitectureDocs;
