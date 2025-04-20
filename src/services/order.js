import { addDoc,collection,doc,arrayUnion,updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';


export const createOrder = async (uId, cartItems, totalAmt, address, paymentId) => {
  
  try {
    
    console.log(uId, cartItems, totalAmt, address);
    const orderRef = await addDoc(collection(db, 'orders'), {
      userId: uId,
      items: cartItems,
      totalAmount: totalAmt,
      address: address,
      paymentId: paymentId,
      orderDate: new Date()
    });
  
    const userRef = doc(db, 'users', uId);
    await updateDoc(userRef, {
      ordersId: arrayUnion(orderRef.id)
    });
    return orderRef;
  } catch (error) {
    console.log(error);
    throw error;

  }  
}
