import { useThemeStore } from "../store/themeStore";

interface ValuePickerSliderProps {
    value: number;
    onChange: (value: number) => void;

    label?: string;
    min?: number;
    max?: number;
    step?: number;
}

export default function ValuePickerSlider({
    value,
    onChange,
    label = "",
    min = 1,
    max = 20,
    step = 1,
}: ValuePickerSliderProps) {
    const { isDarkMode } = useThemeStore();
    const progress = ((value - min) / (max - min)) * 100;

    return (
        <div className="bg-card/60 rounded-3xl border border-white/10 p-6 shadow-xl backdrop-blur-xl">
            <div className="mb-5 flex items-center justify-between">
                <span className="text-muted font-medium">{label}</span>

                <div className="bg-text/20 text-text rounded-full px-4 py-1 font-semibold">
                    {value}
                </div>
            </div>

            <div className="relative">
                <div
                    className="bg-text absolute top-1/2 left-0 h-2 -translate-y-1/2 rounded-tl-full rounded-bl-full bg-gradient-to-r"
                    style={{
                        width: `${progress}%`,
                    }}
                />

                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className={`[&::-webkit-slider-thumb]:bg-${isDarkMode ? "text" : "primary"} [&::-moz-range-thumb]:bg-${isDarkMode ? "text" : "primary"} relative h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg`}
                />
            </div>

            <div className="text-muted mt-3 flex justify-between text-sm">
                <span>{min}</span>
                <span>{max}</span>
            </div>
        </div>
    );
}
