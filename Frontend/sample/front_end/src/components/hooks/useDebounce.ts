import { useEffect, useState } from "react";

/**
 * useDebounce
 * Delays updating the value until after a given delay.
 *
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds (e.g., 500)
 * @returns debouncedValue
 */
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
