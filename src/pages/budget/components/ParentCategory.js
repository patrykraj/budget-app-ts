import { List, ParentCategoryElement } from "./ListElements.css";

const ParentCategory = ({
        id,
        name,
        active,
        setActive,
        items,
        noExtend,
        transactions
    }) => {
        
    function getExpenses() {
        return transactions.reduce((acc, transaction) => {
            return acc += transaction.amount;
        }, 0);
    };

    function getAmount(categoryId) {
        return transactions.reduce((acc, transaction) => {
            if(categoryId === transaction.categoryId) return acc += transaction.amount;
            return acc;
        }, 0);
    };

    function handleParentCategories() {
        if(active) {
            return setActive(null);
        }
        setActive(id);
    };

    return (
        <ParentCategoryElement key={id}>
            <div onClick={handleParentCategories}>
                <span>{name}</span>
                <span>{getExpenses()}</span>
            </div>
                {active && !noExtend &&
                    <List>
                        {items.map((category) => id === category.parentCategoryId && 
                            <li key={category.id}>
                                <span>{category.name}</span>
                                <span>{getAmount(category.id)}</span>
                            </li>
                        )}
                    </List>
                }
        </ParentCategoryElement>
    )
};

export default ParentCategory;
