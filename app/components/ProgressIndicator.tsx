"use client";

interface ProgressIndicatorProps {
  current: number;
  total: number;
  failed?: number;
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

interface CircularProgressProps {
  current: number;
  total: number;
  failed?: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export function LinearProgress({
  current,
  total,
  failed = 0,
  className = "",
  showText = true,
  size = "md",
}: ProgressIndicatorProps) {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;
  const successPercentage =
    total > 0 ? Math.round(((current - failed) / total) * 100) : 0;
  const failedPercentage = total > 0 ? Math.round((failed / total) * 100) : 0;

  const heightClass = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4",
  }[size];

  const textSizeClass = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  }[size];

  return (
    <div className={`w-full ${className}`}>
      {showText && (
        <div
          className={`flex justify-between items-center mb-2 ${textSizeClass}`}
        >
          <span className="text-muted-foreground">
            {current} of {total} files processed
          </span>
          <span className="text-foreground font-medium">{percentage}%</span>
        </div>
      )}

      <div className={`glass rounded-full overflow-hidden ${heightClass}`}>
        <div className="relative w-full h-full">
          {/* Background */}
          <div className="absolute inset-0 bg-muted/30" />

          {/* Success progress */}
          <div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-400 to-purple-500 transition-all duration-500 ease-out"
            style={{ width: `${successPercentage}%` }}
          />

          {/* Failed progress */}
          {failed > 0 && (
            <div
              className="absolute top-0 h-full bg-gradient-to-r from-red-400 to-red-500 transition-all duration-500 ease-out"
              style={{
                left: `${successPercentage}%`,
                width: `${failedPercentage}%`,
              }}
            />
          )}

          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer" />
        </div>
      </div>

      {failed > 0 && showText && (
        <div className={`mt-1 ${textSizeClass} text-destructive`}>
          {failed} file{failed !== 1 ? "s" : ""} failed
        </div>
      )}
    </div>
  );
}

export function CircularProgress({
  current,
  total,
  failed = 0,
  size = 120,
  strokeWidth = 8,
  className = "",
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const percentage = total > 0 ? (current / total) * 100 : 0;
  const successPercentage = total > 0 ? ((current - failed) / total) * 100 : 0;
  const offset = circumference - (successPercentage / 100) * circumference;

  const center = size / 2;

  return (
    <div
      className={`relative glass rounded-full p-4 ${className}`}
      style={{ width: size + 32, height: size + 32 }}
    >
      <svg
        width={size}
        height={size}
        className="transform -rotate-90 transition-all duration-500"
      >
        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-muted/30"
        />

        {/* Progress circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="text-purple-500 transition-all duration-500 ease-out"
          strokeLinecap="round"
        />

        {/* Failed progress indicator */}
        {failed > 0 && (
          <circle
            cx={center}
            cy={center}
            r={radius - strokeWidth - 2}
            stroke="currentColor"
            strokeWidth={4}
            fill="transparent"
            strokeDasharray={circumference * 0.8}
            strokeDashoffset={
              circumference * 0.8 - (failed / total) * circumference * 0.8
            }
            className="text-destructive transition-all duration-500 ease-out"
            strokeLinecap="round"
          />
        )}
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">
            {Math.round(percentage)}%
          </div>
          <div className="text-xs text-muted-foreground">
            {current}/{total}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProcessingSpinner({
  className = "",
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  }[size];

  return (
    <div className={`${sizeClasses} ${className}`}>
      <svg
        className="animate-spin text-primary"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
}

// Pulse animation for loading states
export function PulseLoader({ className = "" }: { className?: string }) {
  return (
    <div className={`flex space-x-2 ${className}`}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-2 h-2 glass rounded-full animate-pulse"
          style={{
            animationDelay: `${i * 0.2}s`,
            animationDuration: "1.4s",
          }}
        />
      ))}
    </div>
  );
}

export default LinearProgress;
