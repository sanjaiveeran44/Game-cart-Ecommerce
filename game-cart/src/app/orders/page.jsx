"use client";

import { useState } from 'react';
import { FiDollarSign, FiPackage, FiTruck, FiClock, FiCheckCircle } from 'react-icons/fi';

const OrdersPage = () => {
 
  const [orders] = useState([
    { id: 1, customer: 'John Doe', product: 'PlayStation 5', price: 499.99, status: 'Shipped' },
    { id: 2, customer: 'Jane Smith', product: 'Xbox Series X', price: 499.99, status: 'Delivered' },
    { id: 3, customer: 'Mike Johnson', product: 'Nintendo Switch', price: 299.99, status: 'Processing' },
    { id: 4, customer: 'Sarah Williams', product: 'Gaming PC', price: 1299.99, status: 'Pending' },
    { id: 5, customer: 'Alex Brown', product: 'VR Headset', price: 399.99, status: 'Shipped' },
    { id: 6, customer: 'Emily Davis', product: 'Gaming Chair', price: 249.99, status: 'Delivered' },
    { id: 7, customer: 'Michael Wilson', product: 'Mechanical Keyboard', price: 129.99, status: 'Processing' },
    { id: 8, customer: 'Jessica Lee', product: 'Gaming Mouse', price: 79.99, status: 'Shipped' },
  ]);

  const totalRevenue = orders.reduce((sum, order) => sum + order.price, 0);
  const shippedOrders = orders.filter(order => order.status === 'Shipped').length;
  const processingOrders = orders.filter(order => order.status === 'Processing').length;
  const deliveredOrders = orders.filter(order => order.status === 'Delivered').length;

  
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <h1 className="text-4xl font-extrabold text-indigo-900 mb-8 text-center">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          Orders Dashboard
        </span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 transform transition-all hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-indigo-700">{formatCurrency(totalRevenue)}</p>
              <p className="text-xs text-green-600 mt-1">+12.5% from last month</p>
            </div>
            <div className="p-3 bg-indigo-100 rounded-full">
              <FiDollarSign className="h-6 w-6 text-indigo-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 transform transition-all hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Shipped</p>
              <p className="text-2xl font-bold text-blue-700">{shippedOrders} orders</p>
              <p className="text-xs text-blue-600 mt-1">+2 from yesterday</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <FiTruck className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

          <div className="bg-white rounded-lg shadow-md p-6 transform transition-all hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Processing</p>
              <p className="text-2xl font-bold text-yellow-700">{processingOrders} orders</p>
              <p className="text-xs text-yellow-600 mt-1">-1 from yesterday</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <FiClock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 transform transition-all hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Delivered</p>
              <p className="text-2xl font-bold text-green-700">{deliveredOrders} orders</p>
              <p className="text-xs text-green-600 mt-1">+5 from last week</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <FiCheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {currentOrders.length > 0 ? (
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No orders found.</p>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;