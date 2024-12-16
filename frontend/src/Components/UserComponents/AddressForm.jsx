import React, { useState, useEffect } from 'react';
import axioInstence from '../../utils/axioInstence';
import toast, { Toaster } from "react-hot-toast";

const AddressForm = ({ onSubmit, initialAddress }) => {
  const [addressData, setAddressData] = useState({
    fullName: "",
    mobile:"",
    address: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
        if (initialAddress) {
          setAddressData(initialAddress);
        }
      }, [initialAddress]);


      const handleSubmit = async(e) => {
            e.preventDefault();
            try {
          
              const response = await axioInstence.post('/user/add-address',addressData) 
                console.log(response.data);
                toast.success(response.data.message);
                
              } catch (error) {
                toast.error(error.response.data.message);
                console.log(error);
              }
            onSubmit(addressData);
          };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <Toaster position="top-right" reverseOrder={false}/>
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap- items-center">
        <div className="hidden md:block">
          <img
            src="/src/assets/images/location-img.jpg"
            alt="Address Form"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Edit Address</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">fullName</label>
                <input
                  id="name"
                  name="fullName"
                  type="text"
                  value={addressData.fullName}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full h-8 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300 focus:ring-opacity-50"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Mobile</label>
                <input
                  id="mobile"
                  name="mobile"
                  type="number"
                  value={addressData.mobile}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full h-8 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300 focus:ring-opacity-50"
                />
              </div>
            <div className="space-y-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <input
                id="address"
                name="address"
                type="text"
                value={addressData.address}
                onChange={handleChange}
                required
                className="mt-1 block w-full h-8 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300 focus:ring-opacity-50"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                <select
                  id="country"
                  name="country"
                  value={addressData.country}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full h-8 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300 focus:ring-opacity-50"
                >
                  <option value="">Select country</option>
                  <option value="us">United States</option>
                  <option value="uk">United Kingdom</option>
                  <option value="ca">Canada</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                <select
                  id="state"
                  name="state"
                  value={addressData.state}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full h-8 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300 focus:ring-opacity-50"
                >
                  <option value="">Select state</option>
                  <option value="ny">New York</option>
                  <option value="ca">California</option>
                  <option value="tx">Texas</option>
                </select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  value={addressData.city}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full h-8 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300 focus:ring-opacity-50"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">Pincode</label>
                <input
                  id="pincode"
                  name="pincode"
                  type="text"
                  value={addressData.pincode}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full h-8 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300 focus:ring-opacity-50"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
          {initialAddress ? 'Update Address' : 'Add Address'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddressForm;





// import React, { useState, useEffect } from 'react';

// function AddressForm({ onSubmit, initialAddress }) {
//   const [address, setAddress] = useState({
//     name: '',
//     phone: '',
//     street: '',
//     houseNumber: '',
//     city: '',
//     postCode: '',
//     floor: ''
//   });

//   useEffect(() => {
//     if (initialAddress) {
//       setAddress(initialAddress);
//     }
//   }, [initialAddress]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setAddress(prevAddress => ({ ...prevAddress, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(address);
//   };

//   const inputStyle = {
//     backgroundColor: '#bca89f',
//     borderColor: '#8b6c5c',
//     color: '#3d251e',
//     '::placeholder': {
//       color: '#6a4a3a'
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <input
//           type="text"
//           name="name"
//           value={address.name}
//           onChange={handleChange}
//           placeholder="Name"
//           className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#6a4a3a]"
//           style={inputStyle}
//           required
//         />
//       </div>
//       <div>
//         <input
//           type="tel"
//           name="phone"
//           value={address.phone}
//           onChange={handleChange}
//           placeholder="Phone"
//           className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#6a4a3a]"
//           style={inputStyle}
//           required
//         />
//       </div>
//       <div>
//         <input
//           type="text"
//           name="street"
//           value={address.street}
//           onChange={handleChange}
//           placeholder="Street"
//           className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#6a4a3a]"
//           style={inputStyle}
//           required
//         />
//       </div>
//       <div className="flex space-x-2">
//         <input
//           type="text"
//           name="houseNumber"
//           value={address.houseNumber}
//           onChange={handleChange}
//           placeholder="House Number"
//           className="w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#6a4a3a]"
//           style={inputStyle}
//           required
//         />
//         <input
//           type="text"
//           name="floor"
//           value={address.floor}
//           onChange={handleChange}
//           placeholder="Floor"
//           className="w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#6a4a3a]"
//           style={inputStyle}
//         />
//       </div>
//       <div>
//         <input
//           type="text"
//           name="city"
//           value={address.city}
//           onChange={handleChange}
//           placeholder="City"
//           className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#6a4a3a]"
//           style={inputStyle}
//           required
//         />
//       </div>
//       <div>
//         <input
//           type="text"
//           name="postCode"
//           value={address.postCode}
//           onChange={handleChange}
//           placeholder="Post Code"
//           className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#6a4a3a]"
//           style={inputStyle}
//           required
//         />
//       </div>
//       <button
//         type="submit"
//         className="w-full font-bold py-2 px-4 rounded-md transition-colors"
//         style={{ 
//           backgroundColor: '#3d251e',
//           color: '#d8cbc4'
//         }}
//       >
//         {initialAddress ? 'Update Address' : 'Add Address'}
//       </button>
//     </form>
//   );
// }

// export default AddressForm;

