import React from 'react'
import { DocContent } from '../constants'
import ReactMarkdown from 'react-markdown'
import { themes, Highlight } from 'prism-react-renderer'
// import { motion } from 'framer-motion'
import './markdown.css'
import { Copy } from 'lucide-react'

type DocSectionProps = {
    content: DocContent
}

type CodeBlockProps = {
    code: string
    language: string
    codeSrc?: string
}

const CodeBlock = ({ code, language, codeSrc }: CodeBlockProps) => {
    return (
        <Highlight theme={themes.nightOwl} code={code} language={language}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <>
                    {codeSrc ? (
                        <div className='flex flex-row '>
                            {' '}
                            <p className=" px-5 py-3 w-full bg-black/70 text-sm">
                                {codeSrc}
                            </p>
                            <div className="w-full flex justify-end items-center px-5 py-3 bg-black/70 text-sm">
                                <Copy size={18} />
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="w-full flex justify-end items-center px-5 py-3 bg-black/70 text-sm">
                                <Copy size={18} />
                            </div>
                        </>
                    )}
                    <pre
                        className={className}
                        style={{
                            ...style,
                            padding: '20px',
                            borderRadius: '4px',
                            overflow: 'auto',
                            backgroundColor: '#1e1e1e',
                        }}
                    >
                        {tokens.map((line, i) => {
                            const lineProps = getLineProps({ line, key: i })
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            const { key, ...restLineProps } = lineProps
                            return (
                                <div key={i} {...restLineProps}>
                                    {line.map((token, key) => {
                                        const tokenProps = getTokenProps({
                                            token,
                                            key,
                                        })
                                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                        const {
                                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                            key: tokenKey,
                                            ...restTokenProps
                                        } = tokenProps
                                        return (
                                            <span
                                                key={key}
                                                {...restTokenProps}
                                            />
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </pre>
                </>
            )}
        </Highlight>
    )
}

const DocSection = ({ content }: DocSectionProps) => {
    return (
        <div className="text-[var(--font-white)]">
            <h1 className="text-3xl font-bold mb-3">{content.title}</h1>
            <p className="text-[var(--font-gray)] mb-10">
                {content.description}
            </p>

            {content.sections.map((section, index) => (
                <div key={index} className="flex flex-row">
                    <div className="w-[0.5px] bg-white/20 self-stretch mr-10 ">
                        <div className="w-[5px] h-[25px] rounded-r-2xl bg-purple-500 "></div>
                    </div>
                    <div className="mb-16 min-w-[820px] max-w-[820px]">
                        {section.title && (
                            <div className="mb-6">
                                <h2
                                    id={section.title
                                        .toLowerCase()
                                        .replace(/\s+/g, '-')}
                                    className="text-2xl font-bold text-[var(--font-white)] mb-2 flex items-center"
                                >
                                    {section.title}
                                </h2>
                                {section.description && (
                                    <p className="text-[var(--font-gray)] text-lg font-light">
                                        {section.description}
                                    </p>
                                )}
                                {/* <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '7rem' }}
                                transition={{ duration: 0.8, ease: 'easeOut' }}
                                className="h-1 bg-gradient-to-r from-[var(--font-blue)] to-transparent mt-2 rounded-full"
                            ></motion.div> */}
                            </div>
                        )}

                        <div className="markdown-content text-[var(--font-white)]">
                            <ReactMarkdown>{section.content}</ReactMarkdown>
                        </div>

                        {section.code && (
                            <div className="mt-6 bg-[#1E1E1E] rounded-md overflow-x-auto">
                                <CodeBlock
                                    code={section.code}
                                    codeSrc={section.codeSrc}
                                    language={'jsx'}
                                />
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default DocSection
