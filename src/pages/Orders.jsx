import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { db } from '../firebase/config';

function Orders() {
  const user = useSelector((state) => state.profile.user);

  const [allOrders, setAllOrders] = useState([]);
  const fetchOrders = async () => {


    
    try {
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        const userData = userSnap.data();
        console.log('userData',userData)
        const ordersIds = userData.ordersId;
        console.log('ordersIds', ordersIds)
        
        const orders = [];
        for (const orderId of ordersIds) {
          const orderRef = doc(db, 'orders', orderId);
          const orderSnap = await getDoc(orderRef);
          console.log('orderSnap', orderSnap.data());
          if (orderSnap.exists()) {
            // console.log(orderId, '->', orderSnap.data());
            // orders.push(orderSnap.data());
            orders.push({
              id:orderId,...orderSnap.data()
            })
          }
        }

        setAllOrders(orders);
        console.log('orders', orders);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>

      {allOrders.length === 0 ? (
        <p className="text-gray-500">No orders yet.</p>
      ) : (
        <div className="space-y-6">
          {allOrders.map((order, index) => (
            <div key={order.id || index} className="border border-gray-200 rounded-lg p-4 shadow-md">
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Order Date:</span>{' '}
                {order.orderDate?.toDate().toLocaleString()}
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Address:</span> {order.address}
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Total Amount:</span> ₹{order.totalAmount}
              </p>
              <div className="mt-2">
                <p className="font-semibold mb-1">Items:</p>
                <ul className="list-disc list-inside text-gray-600">
                  {order.items.map((item, i) => (
                    <li key={i}>
                      {item.title} - ₹{item.price} , Quantity = {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders