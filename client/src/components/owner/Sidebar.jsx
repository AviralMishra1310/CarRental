import React, { useState } from 'react';
import { assets, ownerMenuLinks } from '../../assets/assets';
import { NavLink, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { toast } from 'react-hot-toast';

const Sidebar = () => {
  const { user, axios, fetchUser } = useAppContext();
  const location = useLocation();
  const [image, setImage] = useState(null); 

  // Update profile image
  const updateImage = async () => {
    if (!image) return;

    try {
      const formData = new FormData();
      formData.append('image', image);

      const { data } = await axios.post('/api/owner/update-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (data.success) {
        fetchUser(); // refresh user data
        toast.success(data.message);
        setImage(null);
      } else {
        toast.error(data.message || 'Failed to update image');
      }
    } catch (error) {
      toast.error(error.message || 'Server error');
    }
  };

  return (
    <div className="relative min-h-screen md:flex flex-col items-center pt-8 max-w-60 w-full border-r border-borderColor text-sm">
      {/* Profile Image */}
      <div className="group relative">
        <label htmlFor="image" className="cursor-pointer relative">
          <img
            src={
              image
                ? URL.createObjectURL(image)
                : user?.image ||
                  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0'
            }
            alt="Profile"
            className="h-14 w-14 md:h-14 md:w-14 rounded-full mx-auto object-cover"
          />
          <input
            type="file"
            id="image"
            accept="image/*"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />

          {/* Hover Edit Icon */}
          <div className="absolute inset-0 hidden group-hover:flex bg-black/30 rounded-full items-center justify-center">
            <img src={assets.edit_icon} alt="edit" className="w-5 h-5" />
          </div>
        </label>
      </div>

      {/* Save Button */}
      {image && (
        <button
          onClick={updateImage}
          className="absolute top-0 right-0 flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded cursor-pointer"
        >
          Save
          <img src={assets.check_icon} width={13} alt="check" />
        </button>
      )}

      {/* Username */}
      {user?.name && <p className="mt-2 text-base max-md:hidden">{user.name}</p>}

      {/* Sidebar Links */}
      <div className="w-full mt-6">
        {ownerMenuLinks.map((link, index) => {
          const isActive = link.path === location.pathname;
          return (
            <NavLink
              key={index}
              to={link.path}
              className={`relative flex items-center gap-2 w-full py-3 pl-4 ${
                isActive ? 'bg-primary/10 text-primary' : 'text-gray-600'
              }`}
            >
              <img src={isActive ? link.coloredIcon : link.icon} alt={link.name} />
              <span className="max-md:hidden">{link.name}</span>

              {/* Active Indicator Bar */}
              {isActive && (
                <div className="bg-primary w-1.5 h-8 rounded-l absolute right-0" />
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
