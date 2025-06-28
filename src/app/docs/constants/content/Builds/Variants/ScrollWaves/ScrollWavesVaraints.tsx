import { GridBackground } from '../../../code/GridBackground'
import { ScrollWaveform } from '../../../code/ScrollWave'

export const ClassicWaveformVariant = () => {
    return (
        <div className="mb-10">
            <div className="rounded-xl p-6 flex items-center justify-center max-h-[420px] h-full border border-[#333]">
                <GridBackground
                    full
                    overlay
                    centered
                    boxSize={36}
                    className="min-h-[150px] w-full p-20"
                >
                    <ScrollWaveform
                        waveLength="medium"
                        smallBarHeight={40}
                        bigBarHeight={70}
                        barColor="#6B7280"
                        bigBarColor="#374151"
                        indicatorColor="#F97316"
                        height={180}
                    />
                </GridBackground>
            </div>
        </div>
    )
}
export const NeonGlowWaveformVariant = () => {
    return (
        <div className="mb-10">
            <div className="rounded-xl p-6 flex items-center justify-center max-h-[420px] h-full border border-[#333]">
                <GridBackground
                    full
                    overlay
                    centered
                    boxSize={36}
                    className="min-h-[150px] w-full p-20"
                >
                    <ScrollWaveform
                        waveLength="short"
                        smallBarHeight={30}
                        bigBarHeight={60}
                        barColor="#00FFE1"
                        bigBarColor="#FF0080"
                        indicatorColor="#FFFF00"
                        backgroundColor="#000000"
                        heightScale={0.6}
                        height={160}
                    />
                </GridBackground>
            </div>
        </div>
    )
}

export const MinimalMonochromeVariant = () => {
    return (
        <div className="mb-10">
            <div className="rounded-xl p-6 flex items-center justify-center max-h-[420px] h-full border border-[#333]">
                <GridBackground
                    full
                    overlay
                    centered
                    boxSize={36}
                    className="min-h-[150px] w-full p-20"
                >
                    <ScrollWaveform
                        waveLength="none"
                        smallBarHeight={20}
                        bigBarHeight={35}
                        barColor="#FFFFFF"
                        bigBarColor="#FFFFFF"
                        indicatorColor="#FF4444"
                        backgroundColor='#000'
                        barWidth={1}
                        bigBarWidth={1}
                        barSpacing={12}
                        height={120}
                    />
                </GridBackground>
            </div>
        </div>
    )
}

export const ThickBarsWaveformVariant = () => {
    return (
        <div className="mb-10">
            <div className="rounded-xl p-6 flex items-center justify-center max-h-[420px] h-full border border-[#333]">
                <GridBackground
                    full
                    overlay
                    centered
                    boxSize={36}
                    className="min-h-[150px] w-full p-20"
                >
                    <ScrollWaveform
                        waveLength="long"
                        smallBarHeight={50}
                        bigBarHeight={80}
                        barColor="#8B5CF6"
                        bigBarColor="#A855F7"
                        indicatorColor="#F59E0B"
                        barWidth={8}
                        bigBarWidth={12}
                        barSpacing={6}
                        height={200}
                    />
                </GridBackground>
            </div>
        </div>
    )
}

export const DenseFrequencyVariant = () => {
    return (
        <div className="mb-10">
            <div className="rounded-xl p-6 flex items-center justify-center max-h-[420px] h-full border border-[#333]">
                <GridBackground
                    full
                    overlay
                    centered
                    boxSize={36}
                    className="min-h-[150px] w-full p-20"
                >
                    <ScrollWaveform
                        waveLength="custom"
                        smallBarHeight={25}
                        bigBarHeight={45}
                        barColor="#10B981"
                        bigBarColor="#059669"
                        indicatorColor="#EF4444"
                        barWidth={2}
                        bigBarWidth={3}
                        barSpacing={3}
                        height={140}
                    />
                </GridBackground>
            </div>
        </div>
    )
}

export const AudioSpectrumStyleVariant = () => {
    return (
        <div className="mb-10">
            <div className="rounded-xl p-6 flex items-center justify-center max-h-[420px] h-full border border-[#333]">
                <GridBackground
                    full
                    overlay
                    centered
                    boxSize={36}
                    className="min-h-[150px] w-full p-20"
                >
                    <ScrollWaveform
                        waveLength="medium"
                        smallBarHeight={15}
                        bigBarHeight={90}
                        barColor="#3B82F6"
                        bigBarColor="#1D4ED8"
                        indicatorColor="#FBBF24"
                        barWidth={4}
                        bigBarWidth={6}
                        barSpacing={2}
                        heightScale={0.8}
                        widthScale={0.3}
                        height={220}
                    />
                </GridBackground>
            </div>
        </div>
    )
}
