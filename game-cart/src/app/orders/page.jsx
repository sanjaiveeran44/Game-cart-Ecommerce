"use client";

const OrdersPage = () => {


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <h1 className="text-4xl font-extrabold text-indigo-900 mb-8 text-center">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          Orders Dashboard
        </span>
      </h1>

      {orders.length > 0 ? (
        <div>
          
        </div>
      ) : (
        <p>No orders found.</p>
      )}

    </div>
  );
};

export default OrdersPage;
