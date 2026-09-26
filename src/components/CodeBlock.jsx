import React, { useEffect } from 'react';

const CodeBlock = ({ code, language = 'java' }) => {
  useEffect(() => {
    if (window.Prism) {
      window.Prism.highlightAll();
    }
  }, [code]);

  return (
    <div className="rounded-xl overflow-hidden my-6 bg-[#2d2d2d] shadow-lg">
      <div className="flex items-center px-4 py-2 bg-[#1e1e1e] border-b border-gray-700">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="ml-4 text-xs text-gray-400 font-mono">{language === 'java' ? 'Java' : language.toUpperCase()}</div>
      </div>
      <pre className="!m-0 !p-4 !bg-transparent text-sm">
        <code className={`language-${language}`}>{code.trim()}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
