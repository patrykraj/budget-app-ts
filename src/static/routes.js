import Homepage from '../pages/home/Homepage';
import Budget from '../pages/budget/Budget';

export const routes = [
    {to: '/', id: '', name: 'Home', element: () => <Homepage />, exact: true},
    {to: '/budget', id: 'budget', name: 'Budget', element: () => <Budget />,},
];
