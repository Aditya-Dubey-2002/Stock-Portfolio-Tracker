import { useContext } from 'react';
import { HoldingsContext } from '../context/HoldingsContext';

const useHoldings = () => {
    const context = useContext(HoldingsContext);
    if (!context) {
        throw new Error('useHoldings must be used within a HoldingsProvider');
    }
    return context;
};

export default useHoldings;
