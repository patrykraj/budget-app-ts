import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllCategories, getTransactions, getBudgetCategories } from '../store/features';

function useInitStore() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTransactions());
        dispatch(getAllCategories());
        dispatch(getBudgetCategories());
    }, [dispatch]);
};

export default useInitStore;
