import React from "react";
import { DocContent } from "../constants";
import ReactMarkdown from "react-markdown";
import { themes, Highlight } from "prism-react-renderer";

type DocSectionProps = {
  content: DocContent;
};

type CodeBlockProps = {
  code: string;
  language: string;
};

const CodeBlock = ({ code, language }: CodeBlockProps) => {
  return (
    <Highlight theme={themes.nightOwl} code={code} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={className}
          style={{
            ...style,
            padding: "20px",
            borderRadius: "4px",
            overflow: "auto",
            backgroundColor: "#1e1e1e",
          }}
        >
          {tokens.map((line, i) => {
            const lineProps = getLineProps({ line, key: i });
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { key, ...restLineProps } = lineProps;
            return (
              <div key={i} {...restLineProps}>
                {line.map((token, key) => {
                  const tokenProps = getTokenProps({ token, key });
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  const { key: tokenKey, ...restTokenProps } = tokenProps;
                  return <span key={key} {...restTokenProps} />;
                })}
              </div>
            );
          })}
        </pre>
      )}
    </Highlight>
  );
};

const DocSection = ({ content }: DocSectionProps) => {
  return (
    <div className="text-[var(--font-white)]">
      <h1 className="text-3xl font-bold mb-3">{content.title}</h1>
      <p className="text-[var(--font-gray)] mb-10">{content.description}</p>

      {content.sections.map((section, index) => (
        <div key={index} className="mb-12">
          <div className="markdown-content text-[var(--font-white)]">
            <ReactMarkdown>{section.content}</ReactMarkdown>
          </div>

          {section.code && (
            <div className="mt-6 bg-[#1E1E1E] rounded-md  overflow-x-auto">
              <CodeBlock code={section.code} language={"jsx"} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DocSection;
