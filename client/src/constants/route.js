import { dashboardIcon, dashboardIconColored, addIcon, addIconColored, carIcon, carIconColored, listIcon, listIconColored } from '../assets/index';

export const menuLinks = [
    { name: "Home", path: '/' },
    { name: "Cars", path: '/cars' },
    { name: "My Bookings", path: '/my-bookings' },
];

export const ownerMenuLinks = [
    { 
        name: "Dashboard", 
        path: '/owner', 
        icon: dashboardIcon, 
        coloredIcon: dashboardIconColored 
    },
    { 
        name: "Add car", 
        path: '/owner/add-car', 
        icon: addIcon, 
        coloredIcon: addIconColored 
    },
    { 
        name: "Manage Cars",
        path: '/owner/manage-cars', 
        icon: carIcon, 
        coloredIcon: carIconColored
    },
    { 
        name: "Manage Bookings",    
        path: '/owner/manage-bookings', 
        icon: listIcon, 
        coloredIcon: listIconColored 
    },
];
