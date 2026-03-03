import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { AlertCircle, CheckCircle, Loader } from "lucide-react";

const PaymentGateway = ({
  isOpen,
  onClose,
  cartItems,
  totalAmount,
  products,
}) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [paypalOrderId, setPaypalOrderId] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "United States",
  });
  const [showAddressForm, setShowAddressForm] = useState(false);
  const paypalButtonsContainer = useRef(null);

  useEffect(() => {
    if (isOpen && window.paypal && paypalOrderId) {
      // Load PayPal buttons after order is created
      loadPayPalButtons();
    }
  }, [isOpen, paypalOrderId]);

  const loadPayPalButtons = () => {
    // Clear existing buttons
    if (paypalButtonsContainer.current) {
      paypalButtonsContainer.current.innerHTML = "";
    }

    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return paypalOrderId;
        },
        onApprove: async (data, actions) => {
          setLoading(true);
          try {
            const response = await axios.post(
              `${process.env.REACT_APP_API_BASE_URL}/api/payment/capture-payment`,
              {
                paypalOrderId: data.orderID,
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token") || user?.token}`,
                },
              },
            );

            if (response.data.success) {
              setPaymentStatus("success");
              // Clear cart after successful payment
              setTimeout(() => {
                onClose();
              }, 2000);
            }
          } catch (error) {
            console.error("Payment capture error:", error);
            setPaymentStatus("error");
          } finally {
            setLoading(false);
          }
        },
        onError: (err) => {
          console.error("PayPal error:", err);
          setPaymentStatus("error");
        },
      })
      .render(paypalButtonsContainer.current);
  };

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare items for backend
      const itemsForPayment = cartItems.map((item) => {
        const product = products.find((p) => p.id === item.product);
        return {
          product: item.product,
          color: item.color,
          quantity: item.quantity,
          price: product?.price || 0,
          customizations: item.customizations,
        };
      });

      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/payment/create-order`,
        {
          items: itemsForPayment,
          totalAmount: totalAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || user?.token}`,
          },
        },
      );

      if (response.data.success) {
        setPaypalOrderId(response.data.id);
        setOrderId(response.data.orderId);
        setShowAddressForm(false);
      }
    } catch (error) {
      console.error("Error creating order:", error);
      setPaymentStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveAddress = async () => {
    if (!orderId) return;

    try {
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/api/payment/order/${orderId}/shipping`,
        { shippingAddress },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || user?.token}`,
          },
        },
      );
      setShowAddressForm(false);
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Checkout</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-blue-700 p-2 rounded-full"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {paymentStatus === "success" ? (
            <div className="flex flex-col items-center justify-center py-8">
              <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
              <h3 className="text-xl font-bold text-green-600">
                Payment Successful!
              </h3>
              <p className="text-gray-600 mt-2">
                Your order has been confirmed. You will receive an email
                shortly.
              </p>
            </div>
          ) : paymentStatus === "error" ? (
            <div className="flex flex-col items-center justify-center py-8">
              <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
              <h3 className="text-xl font-bold text-red-600">Payment Failed</h3>
              <p className="text-gray-600 mt-2">
                Something went wrong. Please try again.
              </p>
              <button
                onClick={() => {
                  setPaymentStatus(null);
                  setPaypalOrderId(null);
                }}
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Try Again
              </button>
            </div>
          ) : paypalOrderId && !showAddressForm ? (
            <div>
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-3">Order Summary</h3>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  {cartItems.map((item, idx) => {
                    const product = products.find((p) => p.id === item.product);
                    return (
                      <div
                        key={idx}
                        className="flex justify-between items-center py-2 border-b last:border-b-0"
                      >
                        <span className="text-gray-700">
                          {product?.name} x{item.quantity}
                        </span>
                        <span className="font-semibold">
                          ${(product?.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    );
                  })}
                  <div className="mt-3 pt-3 border-t-2 flex justify-between items-center font-bold text-lg">
                    <span>Total:</span>
                    <span className="text-blue-600">
                      ${totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold mb-2">Shipping Address</h4>
                  <p className="text-sm text-gray-700">
                    {shippingAddress.firstName} {shippingAddress.lastName}
                  </p>
                  <p className="text-sm text-gray-700">
                    {shippingAddress.address}
                  </p>
                  <p className="text-sm text-gray-700">
                    {shippingAddress.city}, {shippingAddress.state}{" "}
                    {shippingAddress.postalCode}
                  </p>
                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-semibold"
                  >
                    Edit Address
                  </button>
                </div>
              </div>

              <div ref={paypalButtonsContainer} className="my-6"></div>

              <button
                onClick={() => setPaypalOrderId(null)}
                className="w-full bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Back
              </button>
            </div>
          ) : showAddressForm ? (
            <div>
              <h3 className="font-bold text-lg mb-4">Shipping Address</h3>
              <form className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={shippingAddress.firstName}
                    onChange={handleAddressChange}
                    className="border rounded px-3 py-2 w-full text-sm"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={shippingAddress.lastName}
                    onChange={handleAddressChange}
                    className="border rounded px-3 py-2 w-full text-sm"
                  />
                </div>

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={shippingAddress.email}
                  onChange={handleAddressChange}
                  className="border rounded px-3 py-2 w-full text-sm"
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={shippingAddress.phone}
                  onChange={handleAddressChange}
                  className="border rounded px-3 py-2 w-full text-sm"
                />

                <input
                  type="text"
                  name="address"
                  placeholder="Street Address"
                  value={shippingAddress.address}
                  onChange={handleAddressChange}
                  className="border rounded px-3 py-2 w-full text-sm"
                />

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={shippingAddress.city}
                    onChange={handleAddressChange}
                    className="border rounded px-3 py-2 w-full text-sm"
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={shippingAddress.state}
                    onChange={handleAddressChange}
                    className="border rounded px-3 py-2 w-full text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    name="postalCode"
                    placeholder="Postal Code"
                    value={shippingAddress.postalCode}
                    onChange={handleAddressChange}
                    className="border rounded px-3 py-2 w-full text-sm"
                  />
                  <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={shippingAddress.country}
                    onChange={handleAddressChange}
                    className="border rounded px-3 py-2 w-full text-sm"
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <button
                    type="button"
                    onClick={handleSaveAddress}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Save Address
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddressForm(false)}
                    className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-3">Order Summary</h3>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  {cartItems.map((item, idx) => {
                    const product = products.find((p) => p.id === item.product);
                    return (
                      <div
                        key={idx}
                        className="flex justify-between items-center py-2 border-b last:border-b-0"
                      >
                        <span className="text-gray-700">
                          {product?.name} x{item.quantity}
                        </span>
                        <span className="font-semibold">
                          ${(product?.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    );
                  })}
                  <div className="mt-3 pt-3 border-t-2 flex justify-between items-center font-bold text-lg">
                    <span>Total:</span>
                    <span className="text-blue-600">
                      ${totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCreateOrder}
                disabled={loading}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Proceed to Payment"
                )}
              </button>

              <button
                onClick={onClose}
                className="w-full mt-2 bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;
