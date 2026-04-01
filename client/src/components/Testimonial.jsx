import React from 'react';
import { motion } from 'framer-motion';
import Title from './Title';
import { assets } from '../assets/assets';

const Testimonial = () => {
  const testimonials = [
    { 
      name: "Emma Rodriguez", 
      location: "Barcelona, Spain", 
      image: assets.testimonial_image_1, 
      testimonial: "I have rented cars from various platforms before, but this one stands out. The service was impeccable, and the car was in pristine condition. Highly recommend!" 
    },
    { 
      name: "John Smith", 
      location: "New York, USA", 
      image: assets.testimonial_image_2, 
      testimonial: "CarRental made my trip so much easier. The booking process was smooth, and the staff were friendly and helpful. The car was exactly as described." 
    },
    { 
      name: "Ava Johnson", 
      location: "Sydney, Australia", 
      image: assets.testimonial_image_3, // Added a unique image
      testimonial: "Everything about my rental experience was seamless. The car selection was great, and the customer support was top-notch." 
    },
  ];

  return (
    <div className="py-28 px-6 md:px-16 lg:px-20 xl:px-44">
      <Title 
        title="What Our Customers Say" 
        subTitle="Discover why discerning travelers choose StayVenture for their luxury accommodations around the world."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
        {testimonials.map((testimonial, index) => (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.3 }}
            key={index} 
            className="bg-white p-6 rounded-xl shadow-lg hover:-translate-y-1 transition-all duration-500"
          >
            {/* Profile Section */}
            <div className="flex items-center gap-3">
              <img
                className="w-12 h-12 rounded-full object-cover"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <p className="text-xl font-semibold">{testimonial.name}</p>
                <p className="text-gray-500 text-sm">{testimonial.location}</p>
              </div>
            </div>

            {/* Star Rating */}
            <div className="flex items-center gap-1 mt-4">
              {Array(5).fill(0).map((_, index) => (
                <img key={index} src={assets.star_icon} alt="Star rating" />
              ))}
            </div>

            {/* Testimonial Text */}
            <p className="text-gray-500 max-w-90 mt-4 font-light">
              "{testimonial.testimonial}"
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
