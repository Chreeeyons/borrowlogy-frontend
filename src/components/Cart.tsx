import { clearCart, getCart } from "@/services/cartService";
import { addHistory } from "@/services/historyService";
import { use, useEffect, useState } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState<any>([]);
  const [remarks, setRemarks] = useState<string>("");
  const fetchCartData = async () => {
    try {
      const data = await getCart(1); // Assuming user_id is 1 for demo purposes
      setCartItems(data);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const handleSubmit = async () => {
    await addHistory({
      user_id: 1, // Assuming user_id is 1 for demo purposes
      cart_id: cartItems?.cart_id, // Assuming cart_id is available in cartItems
      borrower_date: new Date(), // Current date
      remarks: remarks ?? "",
    }); // Replace with actual remarks input
    fetchCartData(); // Refresh cart data after submission
    setRemarks(""); // Clear remarks input
  };

  const handleClearCart = async () => {
    await clearCart(cartItems?.cart_id); // Assuming cart_id is available in cartItems
    fetchCartData(); // Refresh cart data after clearing
  };

return (
  <div
    className="p-4 text-white"
    style={{
      backgroundColor: '#83191c',
      borderRadius: '16px',
      boxShadow: '6px 6px 4px 0px rgba(0, 0, 0, 0.25) inset',
    }}
  >
    {/* Transaction number placeholder */}
    <p className="text-4xl font-semibold tracking-normal">
      Transaction #{cartItems?.cart_id}
    </p>

      {/* Items in cart placeholder */}
      <ul className="mt-2 list-disc pl-20">
        {cartItems?.items?.map((item: any, index: any) => (
          <li key={index} className="py-2 flex items-center">
            <span className="w-64 truncate">{item.equipment_name}</span>
            <span className="w-20 text-right">{item.total_quantity} pcs</span>
          </li>
        ))}
      </ul>

  {/* Remarks input placeholder */}
  <label className="font-bold block mt-4 text-white">
    REMARKS:
    <textarea
      style={{
        width: '100%',
        height: '100px',
        borderRadius: '10px',
        background: '#FFF',
        boxShadow: '3px 3px 2.886px 0px rgba(0, 0, 0, 0.25) inset',
        padding: '0.5rem',
        marginTop: '0.5rem',
        color: '#000',
        fontWeight: '400',
        fontFamily: 'inherit',
        resize: 'vertical', // optional, allows resizing
      }}
      placeholder="Enter remarks here..."
      onChange={(e) => setRemarks(e.target.value)}
      value={remarks}
    />
  </label>

      {/* Action buttons (styled per Figma) */}
      <div className="flex justify-between mt-4 gap-4">
        <button
          onClick={handleClearCart}
          style={{
            width: '138.509px',
            height: '38.234px',
            flexShrink: 0,
            borderRadius: '5.771px',
            background: '#FFF',
            boxShadow: '0px 2.886px 2.886px 0px rgba(0, 0, 0, 0.25) inset',
            color: '#8C1931',
            textAlign: 'center',
            textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            fontFamily: 'Jost, sans-serif',
            fontSize: '21.139px',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: 'normal',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.background = '#5e0708';
            (e.currentTarget as HTMLButtonElement).style.color = '#FFF';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '6px 6px 8px 0px rgba(0, 0, 0, 0.4) inset';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background = '#FFF';
            (e.currentTarget as HTMLButtonElement).style.color = '#8C1931';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0px 2.886px 2.886px 0px rgba(0, 0, 0, 0.25) inset';
          }}
        >
          REMOVE
        </button>

        <button
          onClick={handleSubmit}
          style={{
            width: '138.509px',
            height: '38.234px',
            flexShrink: 0,
            borderRadius: '5.771px',
            background: '#FFF',
            boxShadow: '0px 2.886px 2.886px 0px rgba(0, 0, 0, 0.7) inset',
            color: '#8C1931',
            textAlign: 'center',
            textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            fontFamily: 'Jost, sans-serif',
            fontSize: '21.139px',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: 'normal',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.background = '#03aa6c';
            (e.currentTarget as HTMLButtonElement).style.color = '#FFF';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '6px 6px 8px 0px rgba(0, 0, 0, 0.4) inset';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background = '#FFF';
            (e.currentTarget as HTMLButtonElement).style.color = '#8C1931';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0px 2.886px 2.886px 0px rgba(0, 0, 0, 0.7) inset';
          }}
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
};

export default Cart;

