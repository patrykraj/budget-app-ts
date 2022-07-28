import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getParentCategories, getTransactions } from '../store/features';

function useInitStore() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTransactions());
        dispatch(getParentCategories());
    }, [dispatch]);
};

export default useInitStore;
