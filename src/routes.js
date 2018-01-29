import Items from './components/Items';
import Dashboard from './components/Dashboard';

export const routes = [
    {
        path: '/',
        exact: true,
        component: Dashboard,
        menuLabel: 'Dashboard'
    },
    {
        path: '/images',
        exact: true,
        component: Items,
        menuLabel: 'Images'
    }
];