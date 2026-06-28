// components/DiamondBorder.tsx

interface DiamondBorderProps {
    color?: string;
    size?: number;
    borderColor?: string;
}

export default function DiamondBorder({
    color = "#e07070",
    size = 20,
    borderColor = "border-red-500",
}: DiamondBorderProps) {
    const half = size / 2;
    const padding = size * 0.1;

    return (
        <div className={`w-full my-12 overflow-hidden border-y-2 ${borderColor}`}>
            <svg
                width="100%"
                height={size}
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid slice"
            >
                <defs>
                    <pattern
                        id="diamond-border"
                        x="0"
                        y="0"
                        width={size}
                        height={size}
                        patternUnits="userSpaceOnUse"
                    >
                        {/* Outer diamond */}
                        <polygon
                            points={`
                ${half},${padding}
                ${size - padding},${half}
                ${half},${size - padding}
                ${padding},${half}
              `}
                            fill="none"
                            stroke={color}
                            strokeWidth={size * 0.07}
                        />
                        {/* Center dot */}
                        <circle cx={half} cy={half} r={size * 0.07} fill={color} />
                    </pattern>
                </defs>
                <rect width="100%" height={size} fill="url(#diamond-border)" />
            </svg>
        </div>
    );
}