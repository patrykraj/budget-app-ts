import { useState } from 'react';
import { useSelector } from 'react-redux';

import {PageWrapper, Loader} from '../../components';
import ParentCategory from './components';
import Grid from './Budget.css';

const Budget = () => {
    const {parentCategories, isLoading} = useSelector((store) => store.parentCategories);
    const transactions = useSelector((store) => store.transactions);
    const [activeParentCategory, setActiveParentCategory] = useState(null);
    const [transactionIds, setTransactionIds] = useState([]);

    const content = isLoading ? <Loader /> : parentCategories.map((item) => 
        <ParentCategory
            key={item.id}
            id={item.id}
            name={item.name}
            active={item.id === activeParentCategory}
            setActive={setActiveParentCategory}
            setTransactionIds={setTransactionIds}
            items={item.categories}    
        />
    );

    return (
        <PageWrapper>
            <Grid>
                <section>
                    <ul>
                        {content}
                    </ul>
                </section>
                <section>
                    <ul>
                        {transactions.transactions.map((item) => transactionIds.includes(item.categoryId) && <li key={item.id}>
                            {`${item.description}, Price: $${item.amount}`}
                        </li>)}
                    </ul>
                </section>
            </Grid>
        </PageWrapper>
    )
};

export default Budget;
