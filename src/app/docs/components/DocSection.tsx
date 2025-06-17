import React, { useState, useRef, useEffect } from 'react'
import { DocContent } from '../constants'
import ReactMarkdown from 'react-markdown'
import { themes, Highlight } from 'prism-react-renderer'
import { motion } from 'framer-motion'
import './markdown.css'
import { Copy, Lock, Check, Eye, EyeClosed } from 'lucide-react'
import Countdown from '@/app/utils/countdown'

type DocSectionProps = {
    content: DocContent
}

type CodeBlockProps = {
    code: string
    language: string
    codeSrc?: string
}

const CodeBlock = ({ code, language, codeSrc }: CodeBlockProps) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const [showExpandButton, setShowExpandButton] = useState(false)
    const [copySuccess, setCopySuccess] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const codeRef = useRef<HTMLPreElement>(null)

    useEffect(() => {
        if (codeRef.current) {
            const height = codeRef.current.scrollHeight
            setShowExpandButton(height > 200)
        }
    }, [code])

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code)
            setCopySuccess(true)
            setTimeout(() => setCopySuccess(false), 2000)
        } catch (err) {
            console.error('Failed to copy code:', err)
        }
    }

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded)
    }

    return (
        <div className="relative">
            <Highlight theme={themes.nightOwl} code={code} language={language}>
                {({
                    className,
                    style,
                    tokens,
                    getLineProps,
                    getTokenProps,
                }) => (
                    <>
                        {codeSrc ? (
                            <div className="flex flex-row">
                                <p className="px-5 py-3 flex-1 bg-black/70 text-sm">
                                    {codeSrc}
                                </p>
                                <div
                                    className="flex justify-end items-center px-5 py-3 bg-black/70 text-sm cursor-pointer hover:bg-black/80 transition-colors flex-shrink-0"
                                    onClick={handleCopy}
                                >
                                    {copySuccess ? (
                                        <div className="flex items-center gap-2 text-green-400">
                                            <Check size={16} />
                                            <span className="text-xs">
                                                Copied!
                                            </span>
                                        </div>
                                    ) : (
                                        <Copy
                                            size={16}
                                            className="cursor-pointer"
                                        />
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="w-full flex justify-end items-center px-5 py-3 bg-black/70 text-sm">
                                <div
                                    className="cursor-pointer hover:bg-black/50 p-1 rounded transition-colors"
                                    onClick={handleCopy}
                                >
                                    {copySuccess ? (
                                        <div className="flex items-center gap-2 text-green-400">
                                            <Check size={18} />
                                            <span className="text-xs">
                                                Copied!
                                            </span>
                                        </div>
                                    ) : (
                                        <Copy size={18} />
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="relative">
                            <pre
                                ref={codeRef}
                                className={className}
                                style={{
                                    ...style,
                                    padding: '20px',
                                    borderRadius: '4px',
                                    overflow: 'auto',
                                    backgroundColor: '#1e1e1e',
                                    scrollbarWidth: 'thin',
                                    scrollbarColor: 'oklch(60.6% 0.25 292.717) #000',
                                    maxHeight: showExpandButton && !isExpanded ? '200px' : 'none',
                                    position: 'relative',
                                }}
                            >
                                {tokens.map((line, i) => {
                                    const lineProps = getLineProps({
                                        line,
                                        key: i,
                                    })
                                    const { ...restLineProps } = lineProps
                                    return (
                                        <div key={i} {...restLineProps}>
                                            {line.map((token, key) => {
                                                const tokenProps = getTokenProps({
                                                    token,
                                                    key,
                                                })
                                                return (
                                                    <span
                                                        key={key}
                                                        {...tokenProps}
                                                    />
                                                )
                                            })}
                                        </div>
                                    )
                                })}
                            </pre>

                            {/* Gradient mask when code is collapsed */}
                            {showExpandButton && !isExpanded && (
                                <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none bg-gradient-to-t from-black/65 via-gray-black/40 to-transparent" />
                            )}

                            {/* Show/Hide button */}
                            {showExpandButton && (
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 right-0 flex justify-center">
                                    <motion.button
                                        onClick={toggleExpanded}
                                        onMouseEnter={() => setIsHovered(true)}
                                        onMouseLeave={() => setIsHovered(false)}
                                        className="text-white flex flex-row gap-2 items-center cursor-pointer justify-center px-4 py-2 bg-black/50 rounded-full hover:bg-black/70"
                                        transition={{ duration: 0.2 }}
                                    >
                                        <motion.div className="relative w-5 h-5 flex items-center justify-center">
                                            <motion.div
                                                initial={{ opacity: 1 }}
                                                animate={{
                                                    opacity: isHovered ? 0 : 1,
                                                }}
                                                transition={{ duration: 0.2 }}
                                                style={{ position: 'absolute' }}
                                            >
                                                {!isExpanded ? (
                                                    <EyeClosed size={20} />
                                                ) : (
                                                    <Eye size={20} />
                                                )}
                                            </motion.div>
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{
                                                    opacity: isHovered ? 1 : 0,
                                                }}
                                                transition={{ duration: 0.2 }}
                                                style={{ position: 'absolute' }}
                                            >
                                                {!isExpanded ? (
                                                    <Eye size={20} />
                                                ) : (
                                                    <EyeClosed size={20} />
                                                )}
                                            </motion.div>
                                        </motion.div>
                                        {isExpanded ? 'Hide Code' : 'Show Code'}
                                    </motion.button>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </Highlight>
        </div>
    )
}

const DocSection = ({ content }: DocSectionProps) => {
    return (
        <motion.div
            layout="size"
            initial={{
                opacity: 0,
                y: 40,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                type: 'tween',
                ease: [0.4, 0, 0.2, 1],
                delay: 0.6,
                duration: 0.8,
            }}
            className="text-[var(--font-white)] overflow-hidden"
        >
            <h1 className="text-3xl font-bold mb-3">{content.title}</h1>
            <p className="text-[var(--font-gray)] mb-10">
                {content.description}
            </p>

            {content.preview}

            {new Date(content.releaseDate || '').getTime() > Date.now() ? (
                <div>
                    <div className="flex flex-col justify-center items-center gap-5">
                        <>
                            <Lock size={32} />
                            <p className="text-lg">
                                Hold tight! This component will go live on.
                            </p>
                        </>

                        <div className="flex">
                            {content.releaseDate ? (
                                <Countdown targetDate={content.releaseDate} />
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                content.sections.map((section, index) => (
                    <div key={index} className="flex flex-row">
                        <div className="w-[0.5px] bg-white/20 self-stretch lg:mr-10 mr-4">
                            <div className="w-[5px] h-[35px] rounded-r-2xl bg-violet-500"></div>
                        </div>
                        <div className="mb-16 w-full min-w-0">
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
                                        <p className="text-[var(--font-gray)] text-md font-light">
                                            {section.description}
                                        </p>
                                    )}
                                </div>
                            )}

                            <div className="markdown-content text-[var(--font-white)] text-sm">
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
                ))
            )}
        </motion.div>
    )
}

export default DocSection