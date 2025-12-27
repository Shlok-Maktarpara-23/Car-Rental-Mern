import { dummyMyBookingsData } from "./mock-bookingCars";


export const dummyDashboardData = {
    "totalCars": 4,
    "totalBookings": 2,
    "pendingBookings": 0,
    "completedBookings": 2,
    "recentBookings": [
        dummyMyBookingsData[0],
        dummyMyBookingsData[1],
    ],
    "monthlyRevenue": 840
}