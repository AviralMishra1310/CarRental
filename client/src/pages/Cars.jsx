import React, { useEffect, useState } from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CarCard from '../components/CarCard';
import { useSearchParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const Cars = () => {
  const [searchParams] = useSearchParams();
  const pickupLocation = searchParams.get('pickupLocation');
  const pickupDate = searchParams.get('pickupDate');
  const returnDate = searchParams.get('returnDate');

  const { cars, axios } = useAppContext();

  const [input, setInput] = useState('');
  const [filteredCars, setFilteredCars] = useState([]);

  const isSearchData = pickupLocation && pickupDate && returnDate;

  const applyFilter = () => {
    if (input === '') {
      setFilteredCars(cars);
      return;
    }

    const searchTerm = input.toLowerCase();
    const filtered = cars.filter((car) =>
      car.brand?.toLowerCase().includes(searchTerm) ||
      car.model?.toLowerCase().includes(searchTerm) ||
      car.category?.toLowerCase().includes(searchTerm) ||
      car.transmission?.toLowerCase().includes(searchTerm)
    );

    setFilteredCars(filtered);
  };

  const searchCarAvailability = async () => {
    try {
      const { data } = await axios.post('/api/bookings/check-availability', {
        location: pickupLocation,
        pickupDate,
        returnDate,
      });

      if (data.success) {
        setFilteredCars(data.availableCars);
        if (data.availableCars.length === 0) {
          toast('No cars available for the selected dates.');
        }
      } else {
        toast.error(data.message || 'Failed to fetch cars');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isSearchData) {
      searchCarAvailability();
    } else {
      setFilteredCars(cars);
    }
  }, [pickupLocation, pickupDate, returnDate, cars]);

  useEffect(() => {
    if (!isSearchData && cars.length > 0) {
      applyFilter();
    }
  }, [input, cars]);

  return (
    <div className="flex flex-col items-center py-20 bg-light max-md:px-4 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Title
          title="Available Cars"
          subTitle="Browse our selection of premium vehicles available for your next adventure"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow"
      >
        <img src={assets.search_icon} alt="" className="w-4.5 h-4.5 mr-2" />
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          placeholder="Search by brand, model, category or transmission"
          className="w-full h-full outline-none text-gray-500"
        />
        <img src={assets.filter_icon} alt="" className="w-4.5 h-4.5 ml-2" />
      </motion.div>

      <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10 w-full">
        <AnimatePresence mode="wait">
          {filteredCars.length > 0 ? (
            <motion.div
              key="car-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.p
                className="text-gray-500 xl:px-20 max-w-7xl mx-auto"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Showing {filteredCars.length} Cars
              </motion.p>

              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.15,
                    },
                  },
                }}
              >
                {filteredCars.map((car, index) => (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  >
                    <CarCard car={car} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <motion.p
              key="empty-state"
              className="text-gray-600 text-center mt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              No cars found for the selected criteria.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Cars;
