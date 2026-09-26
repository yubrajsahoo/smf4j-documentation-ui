import React from 'react';
import CodeBlock from '../components/CodeBlock';

const GettingStarted = ({ version }) => {
  return (
    <div className="animate-in fade-in duration-500">
      <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl mb-4">
        Getting Started with smf4j
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Welcome to the Simple Metrics Facade for Java (smf4j). This library provides a clean, AOP-driven abstraction over Micrometer, allowing you to attach robust, dimensional metrics to your Spring Boot applications using simple annotations and SpEL tags.
      </p>

      <div className="prose prose-indigo max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Installation</h2>
        <p className="text-gray-600 mb-4">Add the Spring Boot Starter to your `pom.xml`:</p>
        
        <CodeBlock language="xml" code={`
<dependency>
    <groupId>io.github.yubrajsahoo</groupId>
    <artifactId>smf4j-spring-boot-starter</artifactId>
    <version>${version}</version>
</dependency>

<!-- You will also need a Micrometer registry (e.g., Prometheus) -->
<dependency>
    <groupId>io.micrometer</groupId>
    <artifactId>micrometer-registry-prometheus</artifactId>
    <scope>runtime</scope>
</dependency>
        `} />

        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Why smf4j?</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-600">
          <li><strong>Zero-Boilerplate:</strong> Avoid polluting business logic with metric registries.</li>
          <li><strong>Dynamic Tagging (SpEL):</strong> Use Spring Expression Language directly inside your annotations to extract tags dynamically.</li>
          <li><strong>Field-level @Gauge:</strong> Safely monitor internal state variables with full Spring AOP proxy unwrapping built-in.</li>
          {version === '0.2.0' && (
             <li><strong className="text-indigo-600">Global Interceptors (New in 0.2.0):</strong> Automatically track incoming web requests without manually annotating every Controller!</li>
          )}
        </ul>

      </div>
    </div>
  );
};

export default GettingStarted;
