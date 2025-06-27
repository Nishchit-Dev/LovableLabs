import React from 'react'
import { AnimatedText } from '../../../code/FramerTextAnimation'
import { ParallaxGridBackground } from '../../../code/ParallaxGridBackground'

// Helper to wrap children with ParallaxGridBackground
const WithParallax: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <ParallaxGridBackground centered boxSize={36} full overlay>
        {children}
    </ParallaxGridBackground>
)


export const AnimatedTextFadeDown = () => {
    return (
        <div className="mb-10">
            <div className="rounded-xl flex items-center justify-center h-64 overflow-hidden border border-[#333] bg-slate-900">
                <WithParallax>
                    <AnimatedText
                        animation="fadeDown"
                        className="text-4xl font-bold text-black/70"
                    >
                        Fade Down Animation
                    </AnimatedText>
                </WithParallax>
            </div>
        </div>
    )
}

export const AnimatedTextSlideLeft = () => {
    return (
        <div className="mb-10">
            <div className="rounded-xl flex items-center justify-center h-64 overflow-hidden border border-[#333] bg-slate-900">
                <WithParallax>
                    <AnimatedText
                        animation="slideLeft"
                        className="text-4xl font-bold text-black/70"
                    >
                        Slide Left Animation
                    </AnimatedText>
                </WithParallax>
            </div>
        </div>
    )
}

export const AnimatedTextSlideRight = () => {
    return (
        <div className="mb-10">
            <div className="rounded-xl flex items-center justify-center h-64 overflow-hidden border border-[#333] bg-slate-900">
                <WithParallax>
                    <AnimatedText
                        animation="slideRight"
                        className="text-4xl font-bold text-black/70"
                    >
                        Slide Right Animation
                    </AnimatedText>
                </WithParallax>
            </div>
        </div>
    )
}

// Scale Animation Variants
export const AnimatedTextScale = () => {
    return (
        <div className="mb-10">
            <div className="rounded-xl flex items-center justify-center h-64 overflow-hidden border border-[#333] bg-slate-900">
                <WithParallax>
                    <AnimatedText
                        animation="scale"
                        className="text-4xl font-bold text-black/70"
                    >
                        Scale Animation
                    </AnimatedText>
                </WithParallax>
            </div>
        </div>
    )
}

export const AnimatedTextZoom = () => {
    return (
        <div className="mb-10">
            <div className="rounded-xl flex items-center justify-center h-64 overflow-hidden border border-[#333] bg-slate-900">
                <WithParallax>
                    <AnimatedText
                        animation="zoom"
                        className="text-4xl font-bold text-black/70"
                    >
                        Zoom Animation
                    </AnimatedText>
                </WithParallax>
            </div>
        </div>
    )
}

export const AnimatedTextBounce = () => {
    return (
        <div className="mb-10">
            <div className="rounded-xl flex items-center justify-center h-64 overflow-hidden border border-[#333] bg-slate-900">
                <WithParallax>
                    <AnimatedText
                        animation="bounce"
                        className="text-4xl font-bold text-black/70"
                    >
                        Bounce Animation
                    </AnimatedText>
                </WithParallax>
            </div>
        </div>
    )
}

// 3D Animation Variants
export const AnimatedTextFlip = () => {
    return (
        <div className="mb-10">
            <div className="rounded-xl flex items-center justify-center h-64 overflow-hidden border border-[#333] bg-slate-900">
                <WithParallax>
                    <AnimatedText
                        animation="flip"
                        className="text-4xl font-bold text-black/70"
                    >
                        Flip X Animation
                    </AnimatedText>
                </WithParallax>
            </div>
        </div>
    )
}

export const AnimatedTextFlipY = () => {
    return (
        <div className="mb-10">
            <div className="rounded-xl flex items-center justify-center h-64 overflow-hidden border border-[#333] bg-slate-900">
                <WithParallax>
                    <AnimatedText
                        animation="flipY"
                        className="text-4xl font-bold text-black/70"
                    >
                        Flip Y Animation
                    </AnimatedText>
                </WithParallax>
            </div>
        </div>
    )
}

export const AnimatedTextRotate = () => {
    return (
        <div className="mb-10">
            <div className="rounded-xl flex items-center justify-center h-64 overflow-hidden border border-[#333] bg-slate-900">
                <WithParallax>
                    <AnimatedText
                        animation="rotate"
                        className="text-4xl font-bold text-black/70"
                    >
                        Rotate Animation
                    </AnimatedText>
                </WithParallax>
            </div>
        </div>
    )
}

// Creative Animation Variants
export const AnimatedTextWave = () => {
    return (
        <div className="mb-10">
            <div className="rounded-xl flex items-center justify-center h-64 overflow-hidden border border-[#333] bg-slate-900">
                <WithParallax>
                    <AnimatedText
                        animation="wave"
                        className="text-4xl font-bold text-black/70"
                    >
                        Wave Animation
                    </AnimatedText>
                </WithParallax>
            </div>
        </div>
    )
}

export const AnimatedTextSkew = () => {
    return (
        <div className="mb-10">
            <div className="rounded-xl flex items-center justify-center h-64 overflow-hidden border border-[#333] bg-slate-900">
                <WithParallax>
                    <AnimatedText
                        animation="skew"
                        className="text-4xl font-bold text-black/70"
                    >
                        Skew Animation
                    </AnimatedText>
                </WithParallax>
            </div>
        </div>
    )
}

export const AnimatedTextSpiral = () => {
    return (
        <div className="mb-10">
            <div className="rounded-xl flex items-center justify-center h-64 overflow-hidden border border-[#333] bg-slate-900">
                <WithParallax>
                    <AnimatedText
                        animation="spiral"
                        className="text-4xl font-bold text-black/70"
                    >
                        Spiral Animation
                    </AnimatedText>
                </WithParallax>
            </div>
        </div>
    )
}

// Speed Variants
export const AnimatedTextQuick = () => {
    return (
        <div className="mb-10">
            <div className="rounded-xl flex items-center justify-center h-64 overflow-hidden border border-[#333] bg-slate-900">
                <WithParallax>
                    <AnimatedText
                        animation="quick"
                        className="text-4xl font-bold text-black/70"
                    >
                        Quick Animation
                    </AnimatedText>
                </WithParallax>
            </div>
        </div>
    )
}

export const AnimatedTextSlow = () => {
    return (
        <div className="mb-10">
            <div className="rounded-xl flex items-center justify-center h-64 overflow-hidden border border-[#333] bg-slate-900">
                <WithParallax>
                    <AnimatedText
                        animation="slow"
                        className="text-4xl font-bold text-black/70"
                    >
                        Slow Animation
                    </AnimatedText>
                </WithParallax>
            </div>
        </div>
    )
}

// Special Effect Variants
export const AnimatedTextTypewriter = () => {
    return (
        <div className="mb-10">
            <div className="rounded-xl flex items-center justify-center h-64 overflow-hidden border border-[#333] bg-slate-900">
                <WithParallax>
                    <AnimatedText
                        animation="typewriter"
                        className="text-4xl font-bold text-black/70"
                    >
                        Typewriter Effect
                    </AnimatedText>
                </WithParallax>
            </div>
        </div>
    )
}

export const AnimatedTextGlitch = () => {
    return (
        <div className="mb-10">
            <div className="rounded-xl flex items-center justify-center h-64 overflow-hidden border border-[#333] bg-slate-900">
                <WithParallax>
                    <AnimatedText
                        animation="glitch"
                        className="text-4xl font-bold text-black/70"
                    >
                        Glitch Animation
                    </AnimatedText>
                </WithParallax>
            </div>
        </div>
    )
}

// Word-based Animation Variants
export const AnimatedTextFadeUpWords = () => {
    return (
        <div className="mb-10">
            <div className="rounded-xl flex items-center justify-center h-64 overflow-hidden border border-[#333] bg-slate-900">
                <WithParallax>
                    <AnimatedText
                        animation="fadeUp"
                        splitType="words"
                        className="text-4xl font-bold text-black/70 text-center"
                    >
                        Fade Up Word Animation
                    </AnimatedText>
                </WithParallax>
            </div>
        </div>
    )
}

export const AnimatedTextBounceWords = () => {
    return (
        <div className="mb-10">
            <div className="rounded-xl flex items-center justify-center h-64 overflow-hidden border border-[#333] bg-slate-900">
                <WithParallax>
                    <AnimatedText
                        animation="bounce"
                        splitType="words"
                        className="text-4xl font-bold text-black/70 text-center"
                    >
                        Bounce Word Animation
                    </AnimatedText>
                </WithParallax>
            </div>
        </div>
    )
}

export const AnimatedTextFlipWords = () => {
    return (
        <div className="mb-10">
            <div className="rounded-xl flex items-center justify-center h-64 overflow-hidden border border-[#333] bg-slate-900">
                <WithParallax>
                    <AnimatedText
                        animation="flip"
                        splitType="words"
                        className="text-4xl font-bold text-black/70 text-center"
                    >
                        Flip Word Animation
                    </AnimatedText>
                </WithParallax>
            </div>
        </div>
    )
}

export const AnimatedTextWaveWords = () => {
    return (
        <div className="mb-10">
            <div className="rounded-xl flex items-center justify-center h-64 overflow-hidden border border-[#333] bg-slate-900">
                <WithParallax>
                    <AnimatedText
                        animation="wave"
                        splitType="words"
                        className="text-4xl font-bold text-black/70 text-center"
                    >
                        Wave Word Animation
                    </AnimatedText>
                </WithParallax>
            </div>
        </div>
    )
}

// Speed Variants with Different Animations
export const AnimatedTextFadeUpFast = () => {
    return (
        <div className="mb-10">
            <div className="rounded-xl flex items-center justify-center h-64 overflow-hidden border border-[#333] bg-slate-900">
                <WithParallax>
                    <AnimatedText
                        animation="fadeUp"
                        speed="fast"
                        className="text-4xl font-bold text-black/70"
                    >
                        Fast Fade Up
                    </AnimatedText>
                </WithParallax>
            </div>
        </div>
    )
}

export const AnimatedTextBounceSlow = () => {
    return (
        <div className="mb-10">
            <div className="rounded-xl flex items-center justify-center h-64 overflow-hidden border border-[#333] bg-slate-900">
                <WithParallax>
                    <AnimatedText
                        animation="bounce"
                        speed="slow"
                        className="text-4xl font-bold text-black/70"
                    >
                        Slow Bounce
                    </AnimatedText>
                </WithParallax>
            </div>
        </div>
    )
}

// Custom Styled Variants
export const AnimatedTextGradient = () => {
    return (
        <div className="mb-10">
            <div className="rounded-xl flex items-center justify-center h-64 overflow-hidden border border-[#333] bg-slate-900">
                <WithParallax>
                    <AnimatedText
                        animation="scale"
                        className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                    >
                        Gradient Animation
                    </AnimatedText>
                </WithParallax>
            </div>
        </div>
    )
}

export const AnimatedTextNeon = () => {
    return (
        <div className="mb-10">
            <div className="rounded-xl flex items-center justify-center h-64 overflow-hidden border border-[#333] bg-black">
                <WithParallax>
                    <AnimatedText
                        animation="glitch"
                        className="text-4xl font-bold text-cyan-400"
                        style={{
                            textShadow:
                                '0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff',
                        }}
                    >
                        Neon Glitch
                    </AnimatedText>
                </WithParallax>
            </div>
        </div>
    )
}

// Multi-line Variants
export const AnimatedTextMultiLine = () => {
    return (
        <div className="mb-10">
            <div className="rounded-xl flex items-center justify-center h-64 overflow-hidden border border-[#333] bg-slate-900">
                <WithParallax>
                    <div className="text-center">
                        <AnimatedText
                            animation="fadeUp"
                            splitType="words"
                            className="text-3xl font-bold text-black/70 block mb-2"
                        >
                            Multi Line
                        </AnimatedText>
                        <AnimatedText
                            animation="slideLeft"
                            splitType="words"
                            className="text-3xl font-bold text-purple-400 block"
                            delay={200}
                        >
                            Animation Effect
                        </AnimatedText>
                    </div>
                </WithParallax>
            </div>
        </div>
    )
}

// Large Text Variants
export const AnimatedTextHero = () => {
    return (
        <div className="mb-10">
            <div className="rounded-xl flex items-center justify-center h-96 overflow-hidden border border-[#333] bg-gradient-to-br from-slate-900 to-purple-900">
                <WithParallax>
                    <AnimatedText
                        animation="spiral"
                        className="text-6xl font-bold text-black/70 text-center"
                    >
                        HERO TEXT
                    </AnimatedText>
                </WithParallax>
            </div>
        </div>
    )
}

// Small Text Variants
export const AnimatedTextButton = () => {
    return (
        <div className="mb-10">
            <div className="rounded-xl flex items-center justify-center h-32 overflow-hidden border border-[#333] bg-slate-900">
                <WithParallax>
                    <button className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg transition-colors">
                        <AnimatedText
                            animation="quick"
                            className="text-lg font-semibold text-black/70"
                        >
                            Click Me
                        </AnimatedText>
                    </button>
                </WithParallax>
            </div>
        </div>
    )
}

// Default variant (most commonly used)
export const AnimatedTextDefault = () => {
    return (
        <div className="mb-10">
            <div className="rounded-xl flex items-center justify-center h-64 overflow-hidden border border-[#333] bg-slate-900">
                <WithParallax>
                    <AnimatedText className="text-4xl font-bold text-black/70">
                        Default Animation
                    </AnimatedText>
                </WithParallax>
            </div>
        </div>
    )
}
export const AnimatedTextFadeUp= () =>{
     return (
        <div className="mb-10">
            <div className="rounded-xl flex items-center justify-center h-64 overflow-hidden border border-[#333] bg-slate-900">
                <WithParallax>
                    <AnimatedText animation='fadeUp' className="text-4xl font-bold text-black/70">
                        Fade up Animation
                    </AnimatedText>
                </WithParallax>
            </div>
        </div>
    )
}

// All available variants for easy import
export const AnimatedTextVariants = {
    Default: AnimatedTextDefault,
    FadeUp: AnimatedTextFadeUp,
    FadeDown: AnimatedTextFadeDown,
    SlideLeft: AnimatedTextSlideLeft,
    SlideRight: AnimatedTextSlideRight,
    Scale: AnimatedTextScale,
    Zoom: AnimatedTextZoom,
    Bounce: AnimatedTextBounce,
    Flip: AnimatedTextFlip,
    FlipY: AnimatedTextFlipY,
    Rotate: AnimatedTextRotate,
    Wave: AnimatedTextWave,
    Skew: AnimatedTextSkew,
    Spiral: AnimatedTextSpiral,
    Quick: AnimatedTextQuick,
    Slow: AnimatedTextSlow,
    Typewriter: AnimatedTextTypewriter,
    Glitch: AnimatedTextGlitch,
    FadeUpWords: AnimatedTextFadeUpWords,
    BounceWords: AnimatedTextBounceWords,
    FlipWords: AnimatedTextFlipWords,
    WaveWords: AnimatedTextWaveWords,
    FadeUpFast: AnimatedTextFadeUpFast,
    BounceSlow: AnimatedTextBounceSlow,
    Gradient: AnimatedTextGradient,
    Neon: AnimatedTextNeon,
    MultiLine: AnimatedTextMultiLine,
    Hero: AnimatedTextHero,
    Button: AnimatedTextButton,
}
