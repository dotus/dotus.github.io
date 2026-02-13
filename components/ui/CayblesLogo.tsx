import React from 'react';
import { motion } from 'framer-motion';

interface CayblesLogoProps {
  /** Logo size - 'full' includes text, 'small' is just the icon */
  size?: 'full' | 'small';
  /** Theme - 'dark' for light backgrounds (black text), 'light' for dark backgrounds (white text), 'colored' for multicolored icon */
  theme?: 'dark' | 'light' | 'colored';
  /** Height in pixels - width adjusts automatically based on aspect ratio */
  height?: number;
  /** CSS class for additional styling */
  className?: string;
}

/**
 * Caybles Logo Component
 * 
 * Full logo (icon + wordmark) or small logo (icon only)
 * 
 * @example
 * // Full logo for light background
 * <CayblesLogo size="full" theme="dark" height={40} />
 * 
 * // Full logo for dark background
 * <CayblesLogo size="full" theme="light" height={40} />
 * 
 * // Small colored icon
 * <CayblesLogo size="small" theme="colored" height={32} />
 * 
 * // Small white icon for dark background
 * <CayblesLogo size="small" theme="light" height={32} />
 */
export const CayblesLogo: React.FC<CayblesLogoProps> = ({
  size = 'full',
  theme = 'dark',
  height = 40,
  className = '',
}) => {
  const textColor = theme === 'light' ? 'text-white' : 'text-black';

  // Icon only (small)
  if (size === 'small') {
    const aspectRatio = 630 / 630;
    const width = height * aspectRatio;

    const iconFill = theme === 'light' ? '#FFFFFF' : theme === 'dark' ? '#0a0a0a' : null;

    if (theme === 'colored') {
      return (
        <svg
          width={width}
          height={height}
          viewBox="0 0 630 630"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-label="Caybles"
        >
          <g clipPath="url(#caybles-small-clip)">
            <path
              d="M187.063 426.874C184.121 419.898 193.539 414.446 198.123 420.472L276.973 537.73C285.938 551.063 276.384 569 260.318 569C252.247 569 244.961 564.165 241.825 556.729L187.063 426.874Z"
              fill="#EBA832"
            />
            <path
              d="M257.819 90.5801C252.539 75.6574 263.608 60 279.437 60C290.262 60 299.612 67.5687 301.866 78.1554L339.874 256.636C342.327 268.158 327.436 274.989 320.303 265.613C319.611 264.703 319.064 263.691 318.683 262.614L257.819 90.5801Z"
              fill="#0D9488"
            />
            <path
              d="M48.3053 329.149C33.5419 334.435 18 323.492 18 307.811C18 296.904 25.7683 287.544 36.4884 285.534L172.807 259.976C184.881 257.713 191.784 273.261 182.007 280.699C181.058 281.421 180.004 281.993 178.881 282.395L48.3053 329.149Z"
              fill="#7C9E5D"
            />
            <path
              d="M102.5 166.823C88.8017 159.47 86.0762 140.986 97.0693 129.993C105.13 121.933 117.854 120.926 127.082 127.619L258.03 222.597C268.349 230.082 261.812 246.388 249.18 244.671C247.729 244.474 246.324 244.018 245.033 243.325L102.5 166.823Z"
              fill="#459972"
            />
            <path
              d="M120.833 478.213C115.908 493.431 96.6393 498.069 85.3287 486.759C78.6125 480.042 77.1248 469.704 81.6747 461.367L143.944 347.262C148.861 338.252 162.605 342.766 161.223 352.937C161.149 353.481 161.027 354.017 160.858 354.539L120.833 478.213Z"
              fill="#B4A348"
            />
          </g>
          <defs>
            <clipPath id="caybles-small-clip">
              <rect width="630" height="630" fill="white" />
            </clipPath>
          </defs>
        </svg>
      );
    }

    // Small light/dark (monochrome)
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 630 630"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="Caybles"
      >
        <g clipPath="url(#caybles-small-mono-clip)">
          <path
            d="M187.063 426.874C184.121 419.898 193.539 414.446 198.123 420.472L276.973 537.73C285.938 551.063 276.384 569 260.318 569C252.247 569 244.961 564.165 241.825 556.729L187.063 426.874Z"
            fill={iconFill}
          />
          <path
            d="M257.819 90.5801C252.539 75.6574 263.608 60 279.437 60C290.262 60 299.612 67.5687 301.866 78.1554L339.874 256.636C342.327 268.158 327.436 274.989 320.303 265.613C319.611 264.703 319.064 263.691 318.683 262.614L257.819 90.5801Z"
            fill={iconFill}
          />
          <path
            d="M48.3053 329.149C33.5419 334.435 18 323.492 18 307.811C18 296.904 25.7683 287.544 36.4884 285.534L172.807 259.976C184.881 257.713 191.784 273.261 182.007 280.699C181.058 281.421 180.004 281.993 178.881 282.395L48.3053 329.149Z"
            fill={iconFill}
          />
          <path
            d="M102.5 166.823C88.8017 159.47 86.0762 140.986 97.0693 129.993C105.13 121.933 117.854 120.926 127.082 127.619L258.03 222.597C268.349 230.082 261.812 246.388 249.18 244.671C247.729 244.474 246.324 244.018 245.033 243.325L102.5 166.823Z"
            fill={iconFill}
          />
          <path
            d="M120.833 478.213C115.908 493.431 96.6393 498.069 85.3287 486.759C78.6125 480.042 77.1248 469.704 81.6747 461.367L143.944 347.262C148.861 338.252 162.605 342.766 161.223 352.937C161.149 353.481 161.027 354.017 160.858 354.539L120.833 478.213Z"
            fill={iconFill}
          />
        </g>
        <defs>
          <clipPath id="caybles-small-mono-clip">
            <rect width="630" height="630" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );
  }

  // Full logo: small icon + "caybles" text
  const iconHeight = height;
  const iconWidth = iconHeight; // 1:1 ratio

  return (
    <div className={`flex items-center ${className}`} style={{ height }}>
      {/* Icon */}
      <svg
        width={iconWidth}
        height={iconHeight}
        viewBox="0 0 630 630"
        className="-mr-2"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <g clipPath="url(#caybles-full-clip)">
          {/* Top (teal) - 1st */}
          <motion.path
            d="M257.819 90.5801C252.539 75.6574 263.608 60 279.437 60C290.262 60 299.612 67.5687 301.866 78.1554L339.874 256.636C342.327 268.158 327.436 274.989 320.303 265.613C319.611 264.703 319.064 263.691 318.683 262.614L257.819 90.5801Z"
            fill="#0D9488"
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0, duration: 0.5, type: "spring", stiffness: 200 }}
            style={{ originX: 0.5, originY: 0.5 }}
          />
          {/* Upper-left (teal-green) - 2nd */}
          <motion.path
            d="M102.5 166.823C88.8017 159.47 86.0762 140.986 97.0693 129.993C105.13 121.933 117.854 120.926 127.082 127.619L258.03 222.597C268.349 230.082 261.812 246.388 249.18 244.671C247.729 244.474 246.324 244.018 245.033 243.325L102.5 166.823Z"
            fill="#459972"
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.08, duration: 0.5, type: "spring", stiffness: 200 }}
            style={{ originX: 0.5, originY: 0.5 }}
          />
          {/* Middle-left (green) - 3rd */}
          <motion.path
            d="M48.3053 329.149C33.5419 334.435 18 323.492 18 307.811C18 296.904 25.7683 287.544 36.4884 285.534L172.807 259.976C184.881 257.713 191.784 273.261 182.007 280.699C181.058 281.421 180.004 281.993 178.881 282.395L48.3053 329.149Z"
            fill="#7C9E5D"
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.16, duration: 0.5, type: "spring", stiffness: 200 }}
            style={{ originX: 0.5, originY: 0.5 }}
          />
          {/* Lower-left (yellow-green) - 4th */}
          <motion.path
            d="M120.833 478.213C115.908 493.431 96.6393 498.069 85.3287 486.759C78.6125 480.042 77.1248 469.704 81.6747 461.367L143.944 347.262C148.861 338.252 162.605 342.766 161.223 352.937C161.149 353.481 161.027 354.017 160.858 354.539L120.833 478.213Z"
            fill="#B4A348"
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.24, duration: 0.5, type: "spring", stiffness: 200 }}
            style={{ originX: 0.5, originY: 0.5 }}
          />
          {/* Bottom-right (orange) - 5th */}
          <motion.path
            d="M187.063 426.874C184.121 419.898 193.539 414.446 198.123 420.472L276.973 537.73C285.938 551.063 276.384 569 260.318 569C252.247 569 244.961 564.165 241.825 556.729L187.063 426.874Z"
            fill="#EBA832"
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.32, duration: 0.5, type: "spring", stiffness: 200 }}
            style={{ originX: 0.5, originY: 0.5 }}
          />
        </g>
        <defs>
          <clipPath id="caybles-full-clip">
            <rect width="630" height="630" fill="white" />
          </clipPath>
        </defs>
      </svg>
      {/* Text */}
      <motion.span 
        className={`font-serif ${textColor}`}
        style={{ 
          fontSize: `${height * 0.55}px`,
          lineHeight: 1,
        }}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.45, duration: 0.4, ease: "easeOut" }}
      >
        caybles
      </motion.span>
    </div>
  );
};

export default CayblesLogo;
