"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { toast } from 'react-hot-toast';

const AddAddress = () => {
    const router = useRouter();
    const { addUserAddress } = useAppContext();
    
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        area: '',
        city: '',
        state: '',
        pincode: '',
        landmark: ''
    });
    
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation
        if (!formData.fullName || !formData.phone || !formData.area || !formData.city || !formData.state || !formData.pincode) {
            toast.error('Please fill all required fields');
            return;
        }

        if (formData.phone.length !== 10) {
            toast.error('Please enter a valid 10-digit phone number');
            return;
        }

        if (formData.pincode.length !== 6) {
            toast.error('Please enter a valid 6-digit pincode');
            return;
        }

        setLoading(true);
        try {
            await addUserAddress(formData);
            toast.success('Address added successfully!');
            router.back();
        } catch (error) {
            console.error('Error adding address:', error);
            toast.error('Failed to add address. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-8 py-6">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => router.back()}
                                className="text-white/80 hover:text-white transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <h1 className="text-2xl font-bold text-white">Add New Address</h1>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Full Name */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200 placeholder:text-black text-black"
                                    required
                                />
                            </div>

                            {/* Phone Number */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Phone Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="10-digit phone number"
                                    maxLength="10"
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200 placeholder:text-black text-black"
                                    required
                                />
                            </div>

                            {/* Area/Street */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Area/Street <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="area"
                                    value={formData.area}
                                    onChange={handleChange}
                                    placeholder="House no., building name, street name"
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200 placeholder:text-black text-black"
                                    required
                                />
                            </div>

                            {/* City */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    City <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="Enter your city"
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200 placeholder:text-black text-black"
                                    required
                                />
                            </div>

                            {/* State */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    State <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    placeholder="Enter your state"
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200 placeholder:text-black text-black"
                                    required
                                />
                            </div>

                            {/* Pincode */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Pincode <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="pincode"
                                    value={formData.pincode}
                                    onChange={handleChange}
                                    placeholder="6-digit pincode"
                                    maxLength="6"
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200 placeholder:text-black text-black"
                                    required
                                />
                            </div>

                            {/* Landmark */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Landmark (Optional)
                                </label>
                                <input
                                    type="text"
                                    name="landmark"
                                    value={formData.landmark}
                                    onChange={handleChange}
                                    placeholder="Nearby landmark"
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200 placeholder:text-black text-black"
                                />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 pt-6">
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-all duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                        <span>Saving...</span>
                                    </>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
                                        </svg>
                                        <span>Save Address</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddAddress;