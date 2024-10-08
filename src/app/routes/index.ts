import express from 'express';
import { AuthRoutes } from '../modules/Auth/Auth.route';
import { RoomRoutes } from '../modules/Room/Room.route';
import { SlotsRoutes } from '../modules/Slots/Slots.route';
import { BookingRoutes } from '../modules/Booking/Booking.route';
import { MyBookingRoutes } from '../modules/MyBooking/MyBooking.route';
import { UserRoutes } from '../modules/User/User.route';
import { PaymentRoutes } from '../modules/Payment/Payment.route';

const router = express.Router();

const modelRouter = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/rooms',
    route: RoomRoutes,
  },
  {
    path: '/slots',
    route: SlotsRoutes,
  },
  {
    path: '/bookings',
    route: BookingRoutes,
  },
  {
    path: '/my-bookings',
    route: MyBookingRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/payment',
    route: PaymentRoutes,
  },
];

modelRouter.forEach((route) => router.use(route.path, route.route));

export default router;
