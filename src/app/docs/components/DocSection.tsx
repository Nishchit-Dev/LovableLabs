import React, { useState, useRef, useEffect } from 'react'
import { DocContent } from '../constants'
import ReactMarkdown from 'react-markdown'
import { themes, Highlight } from 'prism-react-renderer'
import { motion } from 'framer-motion'
import './markdown.css'
import { Copy, Lock, Check, Eye, EyeClosed } from 'lucide-react'
import Countdown from '@/app/utils/countdown'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/app/components/mirco-components/tabs'
import { sendGAEvent } from '@next/third-parties/google'

type DocSectionProps = {
    content: DocContent
}

type CodeBlockProps = {
    code: string
    language: string
    codeSrc?: string
    copy_event: string
}

const CodeBlock = ({
    code,
    language = 'jsx',
    codeSrc,
    copy_event,
}: CodeBlockProps) => {
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

    const handleCopy = async (copy_event: string) => {
        try {
            await navigator.clipboard.writeText(code)
            setCopySuccess(true)
            console.log('Tracked copy_event: ', copy_event)
            sendGAEvent('event', 'code_copy', {
                event_category: 'code_copy',
                event_label: copy_event,
            })
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
            <Highlight theme={themes.vsDark} code={code} language={language}>
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
                                    onClick={() => handleCopy(copy_event)}
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
                                    onClick={() => handleCopy(copy_event)}
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
                                    scrollbarColor:
                                        'oklch(60.6% 0.25 292.717) #000',
                                    maxHeight:
                                        showExpandButton && !isExpanded
                                            ? '200px'
                                            : 'none',
                                    position: 'relative',
                                }}
                            >
                                {tokens.map((line, i) => {
                                    const lineProps = getLineProps({
                                        line,
                                        key: i,
                                    })
                                    return (
                                        <div
                                            key={i}
                                            className={`${lineProps.className} flex items-center justify-start `}
                                            style={lineProps.style}
                                        >
                                            {
                                                <span
                                                    style={{
                                                        userSelect: 'none',
                                                        MozUserSelect: 'none',
                                                        WebkitUserSelect:
                                                            'none',
                                                    }}
                                                    className="pr-5 text-gray-400 font-thin"
                                                >
                                                    {i + 1}
                                                </span>
                                            }
                                            {line.map((token, key) => {
                                                const tokenProps =
                                                    getTokenProps({
                                                        token,
                                                        key,
                                                    })
                                                return (
                                                    <span
                                                        key={key}
                                                        className={
                                                            tokenProps.className
                                                        }
                                                        style={tokenProps.style}
                                                    >
                                                        {tokenProps.children}
                                                    </span>
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

// Helper function to generate consistent IDs for sections
const generateSectionId = (title: string): string => {
    return title.toLowerCase().replace(/\s+/g, '-');
}

const PreviewTab = ({ content }: DocSectionProps) => {
    return (
        <div className="w-full">
            {content.isComingSoon && (
                <div
                    className="absolute inset-0 pointer-events-none z-100"
                    style={{
                        background:
                            'linear-gradient(to bottom, transparent -70%, var(--bg-dark) 100%)',
                        backdropFilter: 'blur(6px)',
                        WebkitBackdropFilter: 'blur(6px)',
                    }}
                ></div>
            )}
            {content.preview}

            {new Date(content.releaseDate || '').getTime() > Date.now() ? (
                <div>
                    <div className="flex flex-col w-full justify-center items-center gap-5">
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
                    <div key={index} className="flex flex-row relative">
                        <div className="w-[0.5px] bg-white/20 self-stretch lg:mr-10 mr-4">
                            <div className="w-[5px] h-[35px] rounded-r-2xl bg-violet-500"></div>
                        </div>
                        <div className="mb-16 w-full min-w-0">
                            {section.title && (
                                <div className="mb-6">
                                    <h2
                                        id={generateSectionId(section.title)}
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
                                        copy_event={section.copy_event || ''}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

const VariantsTab = ({ content }: DocSectionProps) => {
    if (!content?.variantTab) {
        return <></>
    }
    return (
        <div
            className={`w-full ${
                content.isComingSoon ? 'overflow-y-hidden' : ''
            }`}
        >
            {content.isComingSoon && (
                <div
                    className="absolute inset-0 pointer-events-none z-100"
                    style={{
                        background:
                            'linear-gradient(to bottom, transparent -70%, var(--bg-dark) 100%)',
                        backdropFilter: 'blur(6px)',
                        WebkitBackdropFilter: 'blur(6px)',
                    }}
                ></div>
            )}
            {new Date(content.releaseDate || '').getTime() > Date.now() ? (
                <div>
                    <div className="flex flex-col ww-full justify-center items-center gap-5">
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
                content.variantTab.map((section, index) => (
                    <div key={index + section.title} className="flex flex-row">
                        <div className="w-[0.5px] bg-white/20 self-stretch lg:mr-10 mr-4">
                            <div className="w-[5px] h-[35px] rounded-r-2xl bg-violet-500"></div>
                        </div>

                        <div className="mb-16 w-full min-w-0 ">
                            {section.title && (
                                <div className="mb-6 mt-2 relative z-10">
                                    <h2
                                        id={generateSectionId(section.title)}
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
                            {content.variantTab ? (
                                content.variantTab[index]?.preview
                            ) : (
                                <></>
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
                                        copy_event={section.copy_event || ''}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

const PropsTab = ({ content }: DocSectionProps) => {
    if (!content?.propsTab) {
        return <></>
    }
    return (
        <div
            className={`w-full ${
                content.isComingSoon ? 'overflow-y-hidden' : ''
            }`}
        >
            {content.isComingSoon && (
                <div
                    className="absolute inset-0 pointer-events-none z-100"
                    style={{
                        background:
                            'linear-gradient(to bottom, transparent -70%, var(--bg-dark) 100%)',
                        backdropFilter: 'blur(6px)',
                        WebkitBackdropFilter: 'blur(6px)',
                    }}
                ></div>
            )}
            {new Date(content.releaseDate || '').getTime() > Date.now() ? (
                <div>
                    <div className="flex flex-col w-full justify-center items-center gap-5">
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
                <div className="mb-16 w-full min-w-0">
                    <h2 className="text-2xl font-bold text-[var(--font-white)] mb-6 flex items-center">
                        Props
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-left border-collapse">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border-b border-gray-700 text-[var(--font-white)] font-semibold">Prop</th>
                                    <th className="px-4 py-2 border-b border-gray-700 text-[var(--font-white)] font-semibold">Type</th>
                                    <th className="px-4 py-2 border-b border-gray-700 text-[var(--font-white)] font-semibold">Default</th>
                                    <th className="px-4 py-2 border-b border-gray-700 text-[var(--font-white)] font-semibold">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {content.propsTab.map((prop, idx) => (
                                    <tr key={prop.name || idx} className="border-b border-gray-800">
                                        <td className="px-4 py-2 font-mono text-violet-400">{prop.name}</td>
                                        <td className="px-4 py-2 font-mono text-blue-300">{prop.type}</td>
                                        <td className="px-4 py-2 text-green-300">{prop.default ?? <span className="text-gray-500">-</span>}</td>
                                        <td className="px-4 py-2 text-[var(--font-gray)]">{prop.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}

const TabsMerger = ({ content }: DocSectionProps) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [activeTab, setActiveTab] = useState("Preview");
    
    const tabVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
    };
    
    const handleTabChange = (value: string) => {
        setActiveTab(value);
        
        // Dispatch custom event for tab change
        const tabChangeEvent = new CustomEvent('docTabChange', { 
            detail: { 
                tab: value.toLowerCase() as 'preview' | 'variants' | 'props',
                contentTitle: content.title 
            } 
        });
        window.dispatchEvent(tabChangeEvent);
        
        // Track tab change in analytics
        sendGAEvent('event', 'tab_change', {
            event_category: 'navigation',
            event_label: `${content.title} - ${value}`,
            content_title: content.title,
            tab_name: value
        });
    };
    
    return (
        <>
            <Tabs 
                defaultValue="Preview" 
                className=""
                onValueChange={handleTabChange}
            >
                <div className="flex justify-between items-center mb-2">
                    <TabsList>
                        <TabsTrigger
                            value="Preview"
                            className="cursor-pointer"
                        >
                            Preview
                        </TabsTrigger>
                        {content.variantTab && (
                            <TabsTrigger
                                value="Variants"
                                className="cursor-pointer"
                            >
                                Variants
                            </TabsTrigger>
                        )}
                        {content.propsTab && (
                            <TabsTrigger
                                value="Props"
                                className="cursor-pointer"
                            >
                                Props
                            </TabsTrigger>
                        )}
                    </TabsList>
                </div>

                <TabsContent value="Preview" className="">
                    <motion.div
                        key="preview-tab"
                        initial="hidden"
                        animate="visible"
                        variants={tabVariants}
                    >
                        <PreviewTab content={content} />
                    </motion.div>
                </TabsContent>
                <TabsContent value="Variants">
                    <motion.div
                        key="variants-tab"
                        initial="hidden"
                        animate="visible"
                        variants={tabVariants}
                    >
                        <VariantsTab content={content} />
                    </motion.div>
                </TabsContent>
                 <TabsContent value="Props">
                    <motion.div
                        key="props-tab"
                        initial="hidden"
                        animate="visible"
                        variants={tabVariants}
                    >
                        <PropsTab content={content} />
                    </motion.div>
                </TabsContent>
            </Tabs>
        </>
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
            className={`text-[var(--font-white)] overflow-hidden ${
                content.isComingSoon ? 'overflow-y-hidden' : ''
            }`}
        >
            <h1 className="text-3xl font-bold mb-3">{content.title}</h1>
            <p className="text-[var(--font-gray)] mb-10">
                {content.description}
            </p>

            <TabsMerger content={content} />
        </motion.div>
    )
}

export default DocSection
