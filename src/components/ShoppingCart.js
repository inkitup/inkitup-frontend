import React, { useState, useEffect } from "react";
import {
  X,
  ShoppingCart as CartIcon,
  Check,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const ShoppingCartComponent = ({
  isOpen,
  onClose,
  removeFromCart,
  products,
}) => {
  const { user, cartItems, syncCartToBackend, updateItemQuantity } = useAuth();
  const [customizedImages, setCustomizedImages] = useState({});
  const [customizedNames, setCustomizedNames] = useState({});
  const [imageView, setImageView] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [allImages, setAllImages] = useState([]);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    if (isOpen) {
      fetchCustomizedImages();
    }
  }, [isOpen]);

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ ...toast, show: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
  };

  const fetchCustomizedImages = async () => {
    setIsLoading(true);
    try {
      if (user && user.email) {
        const response = await axios.get(
          `http://localhost:5000/images/getimages?userEmail=${user.email}`
        );

        if (response.data && response.data.data) {
          setAllImages(response.data.data);
          const imageMap = {};
          const productNameMap = {};
          response.data.data.forEach(image => {
            const namePart = image.fileName.split("_")[0];
            if (!imageMap[image.entityId]) {
              imageMap[image.entityId] = {};
              productNameMap[image.entityId] = namePart; 
            }
            if (image.fileName.includes('_front_')) {
              imageMap[image.entityId].front = image.fileUrl;
            } else if (image.fileName.includes('_back_')) {
              imageMap[image.entityId].back = image.fileUrl;
            }
          });
          setCustomizedImages(imageMap);
          setCustomizedNames(productNameMap)
          const initialViews = {};
          cartItems.forEach(item => {
            initialViews[item.id] = "front";
          });
          setImageView(initialViews);
        }
      } else {
        setCustomizedImages({});
        setAllImages([]);
      }
    } catch (error) {
      console.error("Error fetching customized images:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const handleRemoveItemWithImages = async (item, index) => {
    const entityId = getEntityIdForItem(item, index);
    const imagesToDelete = allImages.filter(img => img.entityId === entityId);

    try {
      for (const img of imagesToDelete) {
        await axios.post("http://localhost:5000/images/delete", {
          id: img._id
        }, {
          headers: {
            Authorization: `Bearer ${user?.token}`
          }
        });
      }
      await fetchCustomizedImages();
    } catch (err) {
      console.error("Failed to delete image(s):", err);
      showToast("Failed to remove item", "error");
      return;
    }

    removeFromCart(item.id);
    showToast("Item removed from the cart", "success");
  };

  const totalPrice = cartItems
    .reduce((total, item) => {
      const product = products.find((p) => p.id === item.product);
      return total + (product ? product.price * (item.quantity || 1) : 0);
    }, 0)
    .toFixed(2);

  const toggleItemView = (itemId) => {
    setImageView(prev => ({
      ...prev,
      [itemId]: prev[itemId] === "back" ? "front" : "back"
    }));
  };

  const getEntityIdForItem = (item, index) => {
    if (item.entityId) {
      return item.entityId;
    }

    if (Object.keys(customizedImages).length === 1) {
      return Object.keys(customizedImages)[0];
    }

    if (item.customizedImages) {
      const matchingImage = allImages.find(img => img.fileUrl === item.customizedImages);
      if (matchingImage) {
        return matchingImage.entityId;
      }
    }
    const uniqueEntityIds = Object.keys(customizedImages);
    if (uniqueEntityIds.length > 0) {
      return uniqueEntityIds[index % uniqueEntityIds.length];
    }
  };

  const getImageForItem = (item, index) => {
    const entityId = getEntityIdForItem(item, index);
    const currentView = imageView[item.id] || "front";
    if (entityId && customizedImages[entityId] && customizedImages[entityId][currentView]) {
      return customizedImages[entityId][currentView];
    }
  };

  const handleIncreaseQuantity = (itemId) => {
    updateItemQuantity(itemId, 1);
  };

  const handleDecreaseQuantity = (itemId) => {
    const item = cartItems.find(item => item.id === itemId);
    if (item && item.quantity > 1) {
      updateItemQuantity(itemId, -1);
    }
  };

  const Toast = () => {
    if (!toast.show) return null;
    
    const bgColor = toast.type === "success" ? "bg-green-500" : toast.type === "error" ? "bg-red-500" : "bg-blue-500";

    return (
      <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 ${bgColor} text-white px-4 py-2 rounded-md shadow-lg flex items-center z-50`}>
        {toast.type === "success" && <Check size={16} className="mr-2" />}
        {toast.type === "error" && <div className="mr-2">⚠️</div>}
        {toast.message}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <Toast />      
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      <div className="absolute top-0 right-0 h-full w-full md:w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <CartIcon size={20} />
            {user ? `${user.firstName} ${user.lastName}'s Cart` : "Your Cart"} (
            {cartItems.length})
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4">
          {cartItems.length > 0 ? (
            <>
              <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pb-2">
                {cartItems.map((item, index) => {
                  const product = products.find((p) => p.id === item.product);
                  const hasCustomizations = item.customizations?.length > 0;
                  const entityId = getEntityIdForItem(item, index);
                  const currentView = imageView[item.id] || "front";
                  const hasMultipleViews = entityId &&
                    customizedImages[entityId] &&
                    customizedImages[entityId].front &&
                    customizedImages[entityId].back;
                  const itemQuantity = item.quantity || 1;

                  return (
                    <div
                      key={item.id}
                      className="relative flex flex-col p-3 bg-gray-50 rounded"
                    >
                      {hasCustomizations && (
                        <div className="absolute -top-1 -right-1 bg-blue-500 text-white p-1 rounded-full">
                          <Check size={12} />
                        </div>
                      )}

                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{customizedNames[entityId] || product?.name}</div>
                        <button
                          onClick={() => handleRemoveItemWithImages(item, index)}
                          className="text-gray-500 hover:text-red-500 transition-colors"
                          aria-label="Remove item"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="relative w-24 h-24 bg-white rounded overflow-hidden border border-gray-200 group">
                          {isLoading ? (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100">
                              <div className="animate-pulse h-16 w-16 rounded-full bg-gray-200"></div>
                            </div>
                          ) : (
                            <img
                              src={getImageForItem(item, index)}
                              className="w-full h-full object-contain"
                              alt={`${product?.name} ${currentView} view`}
                            />
                          )}

                          {hasMultipleViews && !isLoading && (
                            <button
                              onClick={() => toggleItemView(item.id)}
                              className="absolute bottom-0 right-0 p-1 bg-gray-200 hover:bg-gray-300 rounded-tl-md opacity-80 hover:opacity-100 transition-opacity"
                              aria-label={`View ${currentView === "front" ? "back" : "front"} side`}
                            >
                              {currentView === "front" ? (
                                <ChevronRight size={16} />
                              ) : (
                                <ChevronLeft size={16} />
                              )}
                            </button>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <div className="font-medium text-gray-900">
                              ${(product?.price * itemQuantity).toFixed(2)}
                            </div>
                            <div className="flex items-center border rounded">
                              <button
                                onClick={() => handleDecreaseQuantity(item.id)}
                                className={`px-2 py-1 text-gray-500 hover:bg-gray-100 ${itemQuantity <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={itemQuantity <= 1}
                                aria-label="Decrease quantity"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="px-2 py-1 min-w-[24px] text-center">{itemQuantity}</span>
                              <button
                                onClick={() => handleIncreaseQuantity(item.id)}
                                className="px-2 py-1 text-gray-500 hover:bg-gray-100"
                                aria-label="Increase quantity"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          </div>                          
                          <div className="text-sm text-gray-500">
                            {Object.entries(item.color ? { Color: item.color } : {})
                              .map(([key, value]) => (
                                <div key={key} className="flex items-center gap-1">
                                  <span className="font-medium">{key}:</span>
                                  {key.toLowerCase() === "color" ? (
                                    <span className="flex items-center">
                                      <span
                                        className="inline-block w-3 h-3 rounded-full mr-1 border border-gray-300"
                                        style={{ backgroundColor: value }}
                                      />
                                      {value}
                                    </span>
                                  ) : (
                                    <span>{value}</span>
                                  )}
                                </div>
                              ))}
                          </div>
                          {hasCustomizations && (
                            <div
                              className="text-xs text-blue-600 mt-1 font-medium cursor-pointer"
                              onClick={() => hasMultipleViews && toggleItemView(item.id)}
                            >
                              Customized • view
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 border-t pt-4">
                <div className="flex justify-between items-center text-lg font-semibold mb-4">
                  <span>Total:</span>
                  <span>${totalPrice}</span>
                </div>
                <button
                  className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
                  onClick={() => alert("Checkout functionality to be implemented")}
                >
                  Checkout
                </button>
                <button
                  className="w-full py-2 mt-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors text-sm font-medium"
                  onClick={onClose}
                >
                  Continue Shopping
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-center text-gray-500 py-12">
              <CartIcon size={48} className="text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-1">Your cart is empty</h3>
              <p className="text-sm text-gray-500 mb-6">Add some items to get started</p>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Browse Products
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartComponent;