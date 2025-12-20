"use client";

const OrdersPage = () => {
  // Sample order data
  const orders = [
    { id: 1, customer: 'John Doe', product: 'PlayStation 5', price: 499.99, status: 'Shipped' },
    { id: 2, customer: 'Jane Smith', product: 'Xbox Series X', price: 499.99, status: 'Delivered' },
    { id: 3, customer: 'Mike Johnson', product: 'Nintendo Switch', price: 299.99, status: 'Processing' },
    { id: 4, customer: 'Sarah Williams', product: 'Gaming PC', price: 1299.99, status: 'Pending' },
  ];

  return (
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          Orders Dashboard
        </span>
  );
};

export default OrdersPage;
