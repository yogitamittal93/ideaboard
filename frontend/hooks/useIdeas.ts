import { useState, useEffect, useCallback } from 'react';
// Correct import of the specific function needed for fetching
import { fetchIdeas } from '../src/services/api'; 

const POLLING_INTERVAL = 5000; 

export const useIdeas = () => {
  const [ideas, setIdeas] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // The core function to fetch data
  const getIdeasData = useCallback(async () => {
    try {
      const data = await fetchIdeas();
      // The backend should sort by upvotes, but a client-side sort here
      // acts as a reliable fallback/guarantee for the UI.
      setIdeas(data.sort((a: any, b: any) => b.upvotes - a.upvotes));
    } catch (error) {
      console.error('Fetch error during polling/initial load:', error);
    } finally {
      setIsLoading(false);
    }
  }, []); 

  // 1. Setup Polling
  useEffect(() => {
    getIdeasData(); // Initial load
    
    // Set up the interval for periodic polling
    const intervalId = setInterval(getIdeasData, POLLING_INTERVAL);

    // Cleanup function runs when the component unmounts
    return () => clearInterval(intervalId);
  }, [getIdeasData]); 

  // 2. Expose the manual refetch function
  const refetch = () => {
      // Show loading indicator briefly on manual action
      setIsLoading(true); 
      getIdeasData();
  };

  return { ideas, isLoading, refetch };
};
