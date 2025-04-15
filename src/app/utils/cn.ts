import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names into a single string using clsx and tailwind-merge
 * This helps with conditional classes and prevents duplicate tailwind classes
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
} 