import React, { useEffect, useState } from 'react';
import { ChevronLeft, Edit2, Trash2, X,User,Phone,MapPin } from 'lucide-react';
import AddressForm from '../../Components/UserComponents/AddressForm';
import axioInstence from '../../utils/axioInstence';
import toast, { Toaster } from "react-hot-toast";

function AddressPage() {
  const [addresses, setAddresses] = useState([]);


     
     const fetchAddres = async() =>{
        try {

          const response = await axioInstence('/user/address-details')
            console.log(response.data);
            
            setAddresses(response.data)
          
        } catch (error) {
          console.log(error);
        }
      }
      
 useEffect(()=>{
       
  fetchAddres()
        
  },[])

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const deleteAddress = async(id) => {

    try {
      
      const response = await axioInstence.delete(`/user/delete-address/${id}`)
        console.log(response.data);
        toast.success(response.data.message)

        setAddresses(addresses.filter(address => address._id !== id));
      } catch (error) {
        console.log(error);
        toast.success(error.response.data.message)
      
    }
  };


  const addOrUpdateAddress = (newAddress) => {
    if (editingAddress) {
      setAddresses(addresses.map(addr => addr.id === editingAddress.id ? { ...newAddress, id: addr.id } : addr));
    } else {
      setAddresses([...addresses, { ...newAddress, id: Date.now() }]);
    }
    setIsFormOpen(false);
    setEditingAddress(null);
  };

  const openAddressForm = (address = null) => {
    setEditingAddress(address);
    setIsFormOpen(true);
  };

  const setDefaultAddress = async(id)=>{
     try {
      const response = await axioInstence.put(`/user/set-default-address/${id}`)
       await fetchAddres()
      toast.success(response.data.message)

      setAddresses(prevAddress =>
        prevAddress.map((address)=>({
          ...address,
          idDefault: address._id === id,
        }))
      )
      
     } catch (error) {
      console.error('Error setting default address:', error.response?.data || error.message);
      toast.error('Failed to set default address.');

     }
  }


  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="sticky top-0 shadow-sm px-4 py-3 flex items-center bg-white">
        <button className="mr-2">
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">My Addresses</h1>
      </header>

      {/* Address List */}
      <div className="p-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {addresses.map((address) => (
          <div
            key={address._id}
            className={`bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg ${
              address.isDefault ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600">
              <h2 className="text-white font-semibold text-lg mb-1 flex items-center">
                <User className="w-5 h-5 mr-2" />
                {address.fullName}
              </h2>
              <p className="text-blue-100 flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                {address.mobile}
              </p>
            </div>
            <div className="p-4">
              <div className="flex items-start mb-2">
                <MapPin className="w-5 h-5 text-gray-500 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-700">{address.address}</h3>
                  <p className="text-gray-600 text-sm">{address.city}, {address.state}</p>
                  <p className="text-gray-600 text-sm">{address.country} - {address.pincode}</p>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <div>
                  {address.isDefault ? (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      Default
                    </span>
                  ) : (
                    <button
                      className="text-blue-600 text-sm font-medium hover:underline"
                      onClick={() => setDefaultAddress(address._id)}
                    >
                      Set as default
                    </button>
                  )}
                </div>
                <div className="flex gap-2">
                  <button 
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    onClick={() => openAddressForm(address)}
                  >
                    <Edit2 className="w-4 h-4 text-gray-600" />
                  </button>
                  <button 
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    onClick={() => deleteAddress(address._id)}
                  >
                    <Trash2 className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Address Button */}
      <div className="fixed bottom-4 left-4 right-4">
        <button 
          className="w-full py-3 rounded-lg font-medium shadow-lg transition-colors bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
          onClick={() => openAddressForm()}
        >
          + Add New Address
        </button>
      </div>

      {/* Address Form Pop-up */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="relative  rounded-lg p-6 w-full max-w-6xl">
            <button 
              className="absolute top-[100px] right-2 text-white hover:text-gray-700 z-50"
              onClick={() => setIsFormOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              {editingAddress ? 'Edit Address' : 'Add New Address'}
            </h2>
            <AddressForm 
            onSubmit={addOrUpdateAddress} 
            initialAddress={editingAddress}
          />          
          </div>
        </div>
      )}
    </div>
  );
}

// {isFormOpen && (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//     <div className="relative  rounded-lg p-6 w-full max-w-6xl">
//       <button 
//         className="absolute top-[100px] text-white opacity-50  right-2 text-gray-500  z-50 hover:text-gray-700"
//         onClick={() => setIsFormOpen(false)}
//       >
//         <X size={24} />
//       </button>
//       <h2 className="text-xl font-semibold mb-4 text-gray-800">
//         {editingAddress ? 'Edit Address' : 'Add New Address'}
//       </h2>
//       <AddressForm 
//         onSubmit={addOrUpdateAddress} 
//         initialAddress={editingAddress}
//       />
//     </div>
//   </div>
// )}
// </div>

export default AddressPage;


