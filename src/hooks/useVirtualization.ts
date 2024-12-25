import { useState, useEffect } from 'react';

export function useVirtualization<T>(items: T[], batchSize: number): T[] {
  const [visibleItems, setVisibleItems] = useState<T[]>([]);

  useEffect(() => {
    setVisibleItems(items.slice(0, batchSize));

    const handleScroll = () => {
      const scrolledToBottom = 
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1000;

      if (scrolledToBottom) {
        setVisibleItems(current => {
          const nextBatch = items.slice(0, current.length + batchSize);
          return nextBatch;
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items, batchSize]);

  return visibleItems;
}