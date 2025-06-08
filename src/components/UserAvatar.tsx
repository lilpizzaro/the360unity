import Image from "next/image";
import { useState } from "react";

interface UserAvatarProps {
  src?: string | null;
  alt?: string;
  size?: number | "sm" | "md" | "lg" | "xl";
  className?: string;
  fallbackText?: string;
}

export default function UserAvatar({
  src,
  alt = "User",
  size = "md",
  className = "",
  fallbackText
}: UserAvatarProps) {
  const [imageError, setImageError] = useState(false);
  
  // Convert size to pixels if it's a string
  const sizeInPixels = typeof size === "number" 
    ? size 
    : size === "sm" 
      ? 24 
      : size === "md" 
        ? 40 
        : size === "lg" 
          ? 64 
          : 96; // xl
  
  // Get the first letter for the fallback
  const letter = fallbackText 
    ? fallbackText.charAt(0).toUpperCase() 
    : alt.charAt(0).toUpperCase();
  
  // Adjust font size based on avatar size
  const fontSize = sizeInPixels < 32 
    ? "text-xs" 
    : sizeInPixels < 48 
      ? "text-sm" 
      : sizeInPixels < 64 
        ? "text-base" 
        : "text-xl";
  
  // Show fallback if no image URL or if image failed to load
  if (!src || imageError) {
    return (
      <div 
        className={`bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center font-bold ${className}`}
        style={{ width: sizeInPixels, height: sizeInPixels }}
      >
        <span className={fontSize}>{letter}</span>
      </div>
    );
  }
  
  return (
    <div 
      className={`relative rounded-full overflow-hidden ${className}`}
      style={{ width: sizeInPixels, height: sizeInPixels }}
    >
      <Image
        src={src}
        alt={alt}
        width={sizeInPixels}
        height={sizeInPixels}
        className="object-cover w-full h-full"
        onError={() => setImageError(true)}
        unoptimized={src.includes('clerk.com')} // Unoptimize Clerk images to avoid issues
      />
    </div>
  );
} 