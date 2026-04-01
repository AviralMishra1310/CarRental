import React, { useState, useEffect } from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const MyBookings = () => {
  const { axios, user, currency } = useAppContext();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyBookings = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/bookings/user');
      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message || 'Failed to fetch bookings');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyBookings();
    }
  }, [user]);

  return (
    <motion.div
      className="px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 text-sm max-w-7xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Title
          title="My Bookings"
          subTitle="View and manage all your car bookings"
          align="left"
        />
      </motion.div>

      <div>
        {loading && (
          <motion.div
            className="mt-12 space-y-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {[1, 2].map((i) => (
              <motion.div
                key={i}
                className="h-40 bg-gray-200 rounded-lg w-full"
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
              />
            ))}
          </motion.div>
        )}

        {!loading && bookings.length === 0 && (
          <motion.p
            className="mt-12 text-gray-500"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            You don’t have any bookings yet.
          </motion.p>
        )}

        <AnimatePresence>
          {!loading &&
            bookings.map((booking, index) => (
              <motion.div
                key={booking._id}
                className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border border-borderColor rounded-lg mt-5 first:mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.01 }}
              >
                <div className="md:col-span-1">
                  <motion.div
                    className="rounded-md overflow-hidden mb-3"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <img
                      src={booking.car?.image}
                      alt={`${booking.car?.brand} ${booking.car?.model}`}
                      className="w-full h-auto aspect-video object-cover"
                    />
                  </motion.div>
                  <p className="text-lg font-medium mt-2">
                    {booking.car?.brand} {booking.car?.model}
                  </p>
                  <p className="text-gray-500">
                    {booking.car?.year} &bull; {booking.car?.category} &bull;{' '}
                    {booking.car?.location}
                  </p>
                </div>

                <div className="md:col-span-2">
                  <motion.div
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    <p className="px-3 py-1.5 bg-light rounded">Booking #{index + 1}</p>
                    <p
                      className={`px-3 py-1 text-xs rounded-full ${
                        booking.status === 'confirmed'
                          ? 'bg-green-400/15 text-green-600'
                          : 'bg-red-400/15 text-red-600'
                      }`}
                    >
                      {booking.status}
                    </p>
                  </motion.div>

                  <motion.div
                    className="flex items-start gap-2 mt-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <img
                      src={assets.calendar_icon_colored}
                      alt=""
                      className="w-4 h-4 mt-1"
                    />
                    <div>
                      <p>Rental Period</p>
                      <p>
                        {booking.pickupDate.split('T')[0]} To {booking.returnDate.split('T')[0]}
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start gap-2 mt-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    <img
                      src={assets.location_icon_colored}
                      alt=""
                      className="w-4 h-4 mt-1"
                    />
                    <div>
                      <p>Pick-up Location</p>
                      <p>{booking.car?.location}</p>
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  className="md:col-span-1 flex flex-col justify-between gap-6 text-right"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <div className="text-sm text-gray-500">
                    <p>Total Price</p>
                    <h1 className="text-2xl font-semibold text-primary">
                      {currency}
                      {booking.price}
                    </h1>
                    <p>Booked on {booking.createdAt.split('T')[0]}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default MyBookings;
