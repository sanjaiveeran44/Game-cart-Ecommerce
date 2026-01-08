import React from 'react';
import Link from 'next/link';
import { assets } from '../../assets/assets';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const SideBar = () => {
    const pathname = usePathname()
    const menuItems = [
        { name: 'Add Product', path: '/seller', icon: assets.add_icon, description: 'Create new products' },
        { name: 'Product List', path: '/seller/product-list', icon: assets.product_list_icon, description: 'View all products' },
        { name: 'Orders', path: '/seller/orders', icon: assets.order_icon, description: 'Manage orders' },
        { name: 'Analytics', path: '/seller/analytics', icon: assets.order_icon, description: 'View statistics' },
        { name: 'Settings', path: '/seller/settings', icon: assets.order_icon, description: 'Account settings' },
    ];

    return (
        <div className='w-20 md:w-72 bg-white/95 backdrop-blur-sm shadow-lg border-r border-gray-200/50 py-6 flex flex-col flex-shrink-0'>
            {/* Sidebar Header */}
            <div className="px-4 mb-8 hidden md:block">
                <h2 className="text-lg font-bold text-gray-800">Seller Panel</h2>
                <p className="text-xs text-gray-500">Manage your store</p>
            </div>

            {/* Menu Items */}
            <div className="flex-1 px-2 md:px-4">
                {menuItems.map((item, index) => {
                    const isActive = pathname === item.path;

                    return (
                        <Link href={item.path} key={item.name} passHref>
                            <div
                                className={`group relative flex items-center py-3 px-4 gap-4 md:gap-3 rounded-r-xl text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-700 transition-all duration-300 mb-2
                                ${isActive
                                    ? "bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border-l-4 border-indigo-600 font-semibold shadow-sm"
                                    : ""
                                }`}
                            >
                                {/* Active Indicator */}
                                {isActive && (
                                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-indigo-600 rounded-r-full"></div>
                                )}
                                
                                {/* Icon */}
                                <div className={`relative ${isActive ? 'text-indigo-600' : 'text-gray-500 group-hover:text-indigo-600'} transition-colors duration-300`}>
                                    <Image
                                        src={item.icon}
                                        alt={`${item.name.toLowerCase()}_icon`}
                                        className="w-6 h-6 md:w-7 md:h-7"
                                    />
                                    {isActive && (
                                        <div className="absolute inset-0 bg-indigo-600 rounded-full opacity-20 animate-ping"></div>
                                    )}
                                </div>
                                
                                {/* Text Content */}
                                <div className='hidden md:block flex-1'>
                                    <p className='text-base font-medium'>{item.name}</p>
                                    {isActive && (
                                        <p className='text-xs text-indigo-600 mt-0.5'>{item.description}</p>
                                    )}
                                </div>

                                {/* Hover Tooltip for Mobile */}
                                <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap md:hidden">
                                    {item.name}
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Sidebar Footer */}
            <div className="px-4 mt-auto hidden md:block">
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-200/50">
                    <p className="text-sm font-semibold text-indigo-800 mb-1">Need Help?</p>
                    <p className="text-xs text-indigo-600 mb-3">Check our seller guide</p>
                    <button className="w-full bg-indigo-600 text-white text-xs font-medium py-2 rounded hover:bg-indigo-700 transition-colors duration-200">
                        Get Help
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
