import { List, ParentCategoryElement } from "./ListElements.css";

const ParentCategory = ({id, name, active, setActive, setTransactionIds, items}) => {
    function handleParentCategories() {
        if(active) {
            setActive(null);
            setTransactionIds([]);
            return;
        }
        setActive(id);
        setTransactionIds(!items.length ? [0] : items.map((category) => category.id));
    };

    return (
        <ParentCategoryElement key={id}>
            <span onClick={handleParentCategories}>{name}</span>
                {active && !!id && 
                    <List>
                        {items.map((category) => 
                            <li key={category.id}>{category.name}</li>
                        )}
                    </List>
                }
        </ParentCategoryElement>
    )
};

export default ParentCategory;
