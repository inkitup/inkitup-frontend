import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  ShoppingCart,
  Save,
  Loader,
  Plus,
  Minus,
  RotateCw,
  Trash2,
} from "lucide-react";
import Navbar from "./Navbar";
import ShoppingCartComponent from "./ShoppingCart";
import CustomizationPanel from "./CustomizationPanel";
import { useAuth } from "../context/AuthContext";

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === "success" ? "bg-green-500" : type === "error" ? "bg-red-500" : "bg-blue-500";

  return (
    <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 ${bgColor} text-white px-4 py-2 rounded-md shadow-lg flex items-center z-50`}>
      {type === "success" && <div className="mr-2">✓</div>}
      {type === "error" && <div className="mr-2">⚠️</div>}
      {message}
    </div>
  );
};

export const Product = () => {
  const [selectedProduct, setSelectedProduct] = useState("fullsleevesTshirt");
  const [selectedColor, setSelectedColor] = useState("white");
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [viewSide, setViewSide] = useState("front");
  const [customizations, setCustomizations] = useState([]);
  const [activeCustomization, setActiveCustomization] = useState(null);
  const [saving, setSaving] = useState(false);
  const [savedDesignId, setSavedDesignId] = useState(null);
  const [isAddToCartEnabled, setIsAddToCartEnabled] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [svgPath, setSvgPath] = useState('');
  const [svgViewBox, setSvgViewBox] = useState('0 0 1920 1280');
  const containerRef = useRef(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  const productAreaRef = useRef(null);
  const imageRef = useRef(null);
  const { user, cartItems, setCartItems, syncCartToBackend } = useAuth();

  const products = [
    {
      id: "fullsleevesTshirt",
      name: "Full Sleeves T-Shirt",
      price: 29.99,
      frontImage: "FullSleevesFront.png",
      backImage: "FullSleevesBack.png",
      frontSvg: "Fullsleeve T-shirt Front.svg",
      backSvg: "Fullsleeve T-shirt Back.svg"
    },
    {
      id: "halfsleevesTshirt",
      name: "Half Sleeves T-Shirt",
      price: 25.99,
      frontImage: "HalfSleevesFront.png",
      backImage: "HalfSleevesBack.png",
      frontSvg: "halfsleevesfront.svg",
      backSvg: "halfsleevesback.svg"
    },
    {
      id: "hoodieTshirt",
      name: "Hoodie T-Shirt",
      price: 49.99,
      frontImage: "HoodieFront.png",
      backImage: "HoodieBack.png",
      frontSvg: "hoodiefront.svg",
      backSvg: "hoodieback.svg"
    },
     {
      id: "zipperTshirt",
      name: "Zipper T-Shirt",
      price: 29.99,
      frontImage: "ZipperTShirtFront.png",
      backImage: "ZipperTShirtBack.png",
      frontSvg: "ZipperTShirtFront.svg",
      backSvg: "ZipperTShirtBack.svg"
    },
     {
      id: "oversizedTshirt",
      name: "Oversized T-Shirt",
      price: 29.99,
      frontImage: "OversizedTshirtFront.png",
      backImage: "OversizedTshirtBack.png",
      frontSvg: "OversizedTShirtFront.svg",
      backSvg: "OversizedTShirtBack.svg"
    },
     {
      id: "downshoulderTshirt",
      name: "Down Shoulder T-Shirt",
      price: 19.99,
      frontImage: "DownShoulderFront.png",
      backImage: "DownShoulderBack.png",
      frontSvg: "DownShoulderFront.svg",
      backSvg: "DownShoulderBack.svg"
    },
  ];

  const colors = [
    { name: "Black", value: "#454545" },
    { name: "White", value: "#FFFFFF" },
    { name: "Orange", value: "#FF6F00" },
    { name: "Blue", value: "#2196F3" },
    { name: "Red", value: "#F44336" },
    { name: "Gray", value: "#9E9E9E" },
    { name: "Yellow", value: "#FFEB3B" },
    { name: "Green", value: "#008000" },
    { name: "Navy Blue", value: "#000080" },
    { name: "Pink", value: "#FF8DA1" },
    { name: "Purple", value: "#9C27B0" },
  ];

  useEffect(() => {
    setHasUnsavedChanges(true);
    setIsAddToCartEnabled(false);
  }, [selectedProduct, selectedColor, customizations]);

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
  };

  const hideToast = () => {
    setToast({ ...toast, show: false });
  };

  useEffect(() => {
    const handleImageLoaded = () => {
      if (imageRef.current) {
        const { naturalWidth, naturalHeight } = imageRef.current;
        setImageSize({ width: naturalWidth, height: naturalHeight });
      }
    };

    const image = imageRef.current;
    if (image) {
      if (image.complete) {
        handleImageLoaded();
      } else {
        image.addEventListener('load', handleImageLoaded);
      }
    }
    return () => {
      if (image) {
        image.removeEventListener('load', handleImageLoaded);
      }
    };
  }, [viewSide, selectedProduct]);

  useEffect(() => {
    const fetchSvgPath = async () => {
      try {
        const currentProduct = products.find((p) => p.id === selectedProduct);
        if (!currentProduct) return;

        const svgFile = viewSide === "front" ? currentProduct.frontSvg : currentProduct.backSvg;
        if (!svgFile) return;

        const res = await fetch(`/products/${selectedProduct}/${svgFile}`);
        const svgText = await res.text();
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
        const svgElement = svgDoc.querySelector('svg');
        const path = svgDoc.querySelector('path');

        if (path) {
          setSvgPath(path.getAttribute('d'));
        }
        if (svgElement && svgElement.getAttribute('viewBox')) {
          setSvgViewBox(svgElement.getAttribute('viewBox'));
        }
      } catch (error) {
        console.error("Failed to load SVG path:", error);
      }
    };
    fetchSvgPath();
  }, [selectedProduct, viewSide]);

  const dataURLToBlob = (dataURL) => {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  const captureDesignAsImage = async (side) => {
    try {
      setActiveCustomization(null);
      const originalSide = viewSide;

      if (side !== originalSide) {
        setViewSide(side);
        await new Promise((resolve) => setTimeout(resolve, 300));
      }
      const canvas = document.createElement('canvas');
      const productRect = productAreaRef.current.getBoundingClientRect();
      canvas.width = productRect.width * 2;
      canvas.height = productRect.height * 2;
      const ctx = canvas.getContext('2d');

      const baseImg = new Image();
      baseImg.crossOrigin = "Anonymous";
      await new Promise((resolve) => {
        baseImg.onload = resolve;
        baseImg.src = `/products/${selectedProduct}/${side === "front" ? currentProduct.frontImage : currentProduct.backImage}`;
      });
      ctx.drawImage(baseImg, 0, 0, canvas.width, canvas.height);
      if (svgPath) {
        const svgString = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="${svgViewBox}">
            <path d="${svgPath}" fill="${selectedColor}" />
          </svg>`;
        const svgBlob = new Blob([svgString], { type: 'image/svg+xml' });
        const svgUrl = URL.createObjectURL(svgBlob);

        const svgImg = new Image();
        await new Promise((resolve) => {
          svgImg.onload = resolve;
          svgImg.src = svgUrl;
        });
        ctx.globalCompositeOperation = 'multiply';
        ctx.drawImage(svgImg, 0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'source-over';
        URL.revokeObjectURL(svgUrl);
      }

      const customizationsToDraw = customizations.filter(item => item.side === side);
      for (const item of customizationsToDraw) {
        if (item.type === 'sticker') {
          const img = new Image();
          img.crossOrigin = "Anonymous";
          await new Promise((resolve) => {
            img.onload = resolve;
            img.src = item.content;
          });
          const x = (item.position.x / 100) * canvas.width;
          const y = (item.position.y / 100) * canvas.height;
          const width = item.size?.width || 100;
          const height = item.size?.height || 100;

          ctx.save();
          ctx.translate(x, y);
          ctx.rotate((item.rotation || 0) * Math.PI / 180);
          ctx.drawImage(img, -width / 2, -height / 2, width, height);
          ctx.restore();
        } else if (item.type === 'text') {
          const x = (item.position.x / 100) * canvas.width;
          const y = (item.position.y / 100) * canvas.height;

          ctx.save();
          ctx.translate(x, y);
          ctx.rotate((item.rotation || 0) * Math.PI / 180);
          ctx.font = `${item.fontSize}px "${item.fontFamily}"`;
          ctx.fillStyle = item.color;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(item.content, 0, 0);
          ctx.restore();
        }
      }
      const dataUrl = canvas.toDataURL("image/png");
      if (side !== originalSide) {
        setViewSide(originalSide);
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      return { dataUrl, imageBlob: dataURLToBlob(dataUrl) };
    } catch (error) {
      console.error(`Error capturing ${side} design:`, error);
      return null;
    }
  };

  const uploadImageToServer = async (blob, designId, side) => {
    try {
      const file = new File(
        [blob],
        `${selectedProduct}_${side}_customized.png`,
        {
          type: "image/png",
        }
      );

      const formData = new FormData();
      formData.append("file", file);
      formData.append("entityType", "customized_product");
      formData.append("entityId", designId || Date.now().toString());
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/images/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
          },
        }
      );
      return {
        imageId: response.data.data.id,
        imageUrl: response.data.data.fileUrl,
      };
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const saveCustomizationsData = async (
    productId,
    color,
    customizationData,
    renderedImages
  ) => {
    if (customizationData.length === 0) {
      return savedDesignId || Date.now().toString();
    }
    try {
      const payload = {
        productId,
        color,
        customizations: customizationData,
        renderedImages,
        status: "saved",
      };
      if (savedDesignId) {
        payload.id = savedDesignId;
      }
      const response = await axios.post(
        "http://localhost:5000/customizations/save",
        payload
      );
      return response.data.data.id || null;
    } catch (error) {
      console.error("Error saving customization data:", error);
      return null;
    }
  };

  const saveDesign = async () => {
    try {
      setSaving(true);
      const originalSide = viewSide;
      const frontImageData = await captureDesignAsImage("front");
      const backImageData = await captureDesignAsImage("back");
      setViewSide(originalSide);
      if (!frontImageData || !backImageData) {
        throw new Error("Failed to capture design images");
      }
      const designId = savedDesignId || Date.now().toString();
      const frontUpload = await uploadImageToServer(
        frontImageData.imageBlob,
        designId,
        "front"
      );
      const backUpload = await uploadImageToServer(
        backImageData.imageBlob,
        designId,
        "back"
      );
      if (!frontUpload || !backUpload) {
        throw new Error("Failed to upload images");
      }
      const renderedImages = {
        front: frontUpload,
        back: backUpload,
      };
      const customizationId = await saveCustomizationsData(
        selectedProduct,
        selectedColor,
        customizations,
        renderedImages
      );
      if (customizationId) {
        setSavedDesignId(customizationId);
        setIsAddToCartEnabled(true);
        setHasUnsavedChanges(false);
        showToast("Design saved successfully!", "success");
        return customizationId;
      } else {
        showToast("Failed to save design. Please try again.", "error");
      }
    } catch (error) {
      console.error("Error saving design:", error);
      showToast("An error occurred while saving the design.", "error");
    } finally {
      setSaving(false);
    }
  };

  const resetDesign = () => {
    setCustomizations([]);
    setActiveCustomization(null);
    setHasUnsavedChanges(false);
    setIsAddToCartEnabled(false);
    setSavedDesignId(null);
  };

  const addToCart = async () => {
    try {
      if (hasUnsavedChanges && !isAddToCartEnabled) {
        showToast("Please save your design before adding to cart.", "error");
        return;
      }
      if (customizations.length > 0 && !savedDesignId) {
        await saveDesign();
        if (!savedDesignId) {
          showToast("Failed to save design. Please try again.", "error");
          return;
        }
      }
      const existingItemIndex = cartItems.findIndex(item =>
        item.product === selectedProduct &&
        item.color === selectedColor &&
        item.designId === savedDesignId
      );
      if (existingItemIndex !== -1) {
        const updatedCart = cartItems.map((item, index) => {
          if (index === existingItemIndex) {
            return {
              ...item,
              quantity: (item.quantity || 1) + 1
            };
          }
          return item;
        });
        setCartItems(updatedCart);
        await syncCartToBackend(updatedCart);
        showToast("Item quantity updated in cart!", "success");
      } else {
        const newItem = {
          product: selectedProduct,
          color: selectedColor,
          customizations: [...customizations],
          id: Date.now(),
          designId: savedDesignId,
          userId: user?._id || null,
          quantity: 1,
          createdAt: new Date().toISOString()
        };
        const updatedCart = [...cartItems, newItem];
        setCartItems(updatedCart);
        await syncCartToBackend(updatedCart);
        showToast("Item added to cart!", "success");
      }
      resetDesign();
    } catch (error) {
      console.error("Error adding to cart:", error);
      showToast("An error occurred while adding to cart.", "error");
    }
  };

  const removeFromCart = async (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
    await syncCartToBackend(updatedCart);
  };

  const startDragging = (e, id) => {
    e.preventDefault();
    setActiveCustomization(id);

    const item = customizations.find((c) => c.id === id);
    const startX = e.clientX;
    const startY = e.clientY;
    const startPosX = item.position.x;
    const startPosY = item.position.y;

    const handleMouseMove = (moveEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      const productRect = productAreaRef.current.getBoundingClientRect();
      let newX = Math.max(
        0,
        Math.min(100, startPosX + (dx / productRect.width) * 100)
      );
      let newY = Math.max(
        0,
        Math.min(100, startPosY + (dy / productRect.height) * 100)
      );
      updateCustomizationPosition(id, newX, newY);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const updateCustomizationPosition = (id, newX, newY) => {
    setCustomizations(
      customizations.map((item) =>
        item.id === id ? { ...item, position: { x: newX, y: newY } } : item
      )
    );
  };

  const deleteCustomization = (id) => {
    setCustomizations(customizations.filter((item) => item.id !== id));
    if (activeCustomization === id) {
      setActiveCustomization(null);
    }
  };
  const rotateCustomization = (id) => {
    setCustomizations(
      customizations.map((item) =>
        item.id === id ? { ...item, rotation: (item.rotation || 0) + 15 } : item
      )
    );
  };
  const resizeCustomization = (id, change) => {
    setCustomizations(
      customizations.map((item) => {
        if (item.id === id && item.type === "sticker") {
          const newWidth = Math.max(
            20,
            Math.min(200, (item.size?.width || 100) + change)
          );
          const newHeight = Math.max(
            20,
            Math.min(200, (item.size?.height || 100) + change)
          );
          return { ...item, size: { width: newWidth, height: newHeight } };
        } else if (item.id === id && item.type === "text") {
          const newSize = Math.max(
            12,
            Math.min(72, (item.fontSize || 24) + change / 2)
          );
          return { ...item, fontSize: newSize };
        }
        return item;
      })
    );
  };

  const handleAddText = (textItem) => {
    setCustomizations([...customizations, textItem]);
    setActiveCustomization(textItem.id);
  };
  const handleAddSticker = (stickerItem) => {
    setCustomizations([...customizations, stickerItem]);
    setActiveCustomization(stickerItem.id);
  };
  const handleClearActiveCustomization = () => {
    setActiveCustomization(null);
  };
  const handleUpdateText = (updatedText) => {
    setCustomizations(
      customizations.map((item) =>
        item.id === activeCustomization
          ? { ...item, ...updatedText }
          : item
      )
    );
  };

  const currentProduct = products.find((p) => p.id === selectedProduct);
  const imagePath = `/products/${selectedProduct}/${viewSide === "front" ? currentProduct.frontImage : currentProduct.backImage}`;
  const visibleCustomizations = customizations.filter((item) => item.side === viewSide);

  useEffect(() => {
    const fontFamilies = [...new Set(customizations
      .filter(item => item.type === 'text' && item.fontFamily)
      .map(item => item.fontFamily))];
        fontFamilies.forEach(fontFamily => {
      const link = document.createElement('link');
      link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/\s+/g, '+')}&display=swap`;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    });
  }, [customizations]);

  return (
    <>
      <Navbar />
      <ShoppingCartComponent
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        products={products}
      />
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}
      <div className="max-w-6xl mx-auto p-2 bg-gray-100">
        <div className="flex gap-4 mb-4 items-center">
          <div className="grid grid-cols-2 gap-2 mb-4 sm:grid-cols-5 sm:gap-4">
            {products.map((product) => (
              <button
                key={product.id}
                className={`px-4 py-2 rounded-md transition-colors w-full ${selectedProduct === product.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                  }`}
                onClick={() => {
                  setSelectedProduct(product.id);
                  setViewSide("front");
                }}
              >
                {product.name}
              </button>
            ))}
          </div>
          <div className="ml-auto">
            <button
              className="relative p-3 bg-blue-600 rounded-full shadow-lg text-white hover:bg-blue-700 transition-colors"
              onClick={() => setCartDrawerOpen(true)}
            >
              <ShoppingCart size={24} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
        </div>
        <div className="flex gap-4 mb-4">
          {colors.map((color) => (
            <button
              key={color.value}
              className={`w-8 h-8 rounded-full border-2 ${selectedColor === color.value
                ? "border-blue-500 ring-2 ring-blue-300"
                : "border-gray-300"
                }`}
              style={{ backgroundColor: color.value }}
              onClick={() => setSelectedColor(color.value)}
            />
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-8 gap-4 mb-4">
          <button
            onClick={() => setViewSide("front")}
            className={`px-4 py-2 rounded-md ${viewSide === "front"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
              }`}
          >
            Front
          </button>
          <button
            onClick={() => setViewSide("back")}
            className={`px-4 py-2 rounded-md ${viewSide === "back"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
              }`}
          >
            Back
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div
              ref={productAreaRef}
              className="relative w-full aspect-square bg-white rounded-md"
            >
              <div className="relative w-full h-full" ref={containerRef}>
                <img
                  ref={imageRef}
                  src={imagePath}
                  alt={currentProduct.name}
                  className="absolute inset-0 w-full h-full object-contain"
                  onLoad={(e) => {
                    setImageSize({
                      width: e.target.naturalWidth,
                      height: e.target.naturalHeight
                    });
                  }}
                />
                {svgPath && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute inset-0 w-full h-full"
                    viewBox={svgViewBox}
                    preserveAspectRatio="xMidYMid meet"
                    style={{
                      mixBlendMode: 'multiply',
                      pointerEvents: 'none'
                    }}
                  >
                    <path
                      d={svgPath}
                      fill={selectedColor}
                    />
                  </svg>
                )}
                {visibleCustomizations.map((item) => (
                  <div
                    key={item.id}
                    className={`absolute cursor-move ${activeCustomization === item.id
                      ? "ring-2 ring-blue-500"
                      : ""
                      }`}
                    style={{
                      left: `${item.position.x}%`,
                      top: `${item.position.y}%`,
                      transform: `translate(-50%, -50%) rotate(${item.rotation || 0}deg)`,
                      zIndex: 10
                    }}
                    onMouseDown={(e) => startDragging(e, item.id)}
                  >
                    {item.type === "sticker" && (
                      <img
                        src={item.content}
                        alt="Custom sticker"
                        style={{
                          width: `${item.size?.width || 100}px`,
                          height: `${item.size?.height || 100}px`,
                        }}
                      />
                    )}
                    {item.type === "text" && (
                      <div
                        style={{
                          color: item.color,
                          fontSize: `${item.fontSize}px`,
                          fontFamily: item.fontFamily,
                        }}
                      >
                        {item.content}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {activeCustomization && (
              <div className="mt-2 p-2 bg-gray-100 rounded-md flex items-center justify-between">
                <div className="flex gap-2">
                  <button
                    onClick={() => resizeCustomization(activeCustomization, -10)}
                    className="p-1 rounded-full bg-white shadow hover:bg-gray-200"
                    title="Decrease size"
                  >
                    <Minus size={16} />
                  </button>
                  <button
                    onClick={() => resizeCustomization(activeCustomization, 10)}
                    className="p-1 rounded-full bg-white shadow hover:bg-gray-200"
                    title="Increase size"
                  >
                    <Plus size={16} />
                  </button>
                  <button
                    onClick={() => rotateCustomization(activeCustomization)}
                    className="p-1 rounded-full bg-white shadow hover:bg-gray-200"
                    title="Rotate"
                  >
                    <RotateCw size={16} />
                  </button>
                </div>
                <button
                  onClick={() => deleteCustomization(activeCustomization)}
                  className="p-1 rounded-full bg-white shadow hover:bg-red-100"
                  title="Delete"
                >
                  <Trash2 size={16} className="text-red-500" />
                </button>
              </div>
            )}
            <div className="mt-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">{currentProduct.name}</h2>
                <p className="text-gray-600">
                  ${currentProduct.price.toFixed(2)}
                </p>
              </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 mt-3 w-full">
              <button
                  onClick={saveDesign}
                  className={`px-4 py-2 rounded-md flex items-center gap-1 ${saving
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 text-white"
                    }`}
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <Loader size={16} className="animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      {hasUnsavedChanges ? "Save Design" : "Design Saved"}
                    </>
                  )}
                </button>
                <button
                  onClick={addToCart}
                  className={`px-4 py-2 rounded-md flex items-center gap-1 ${isAddToCartEnabled
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-400 text-white cursor-not-allowed"
                    }`}
                  disabled={!isAddToCartEnabled}
                >
                  <ShoppingCart size={16} />
                  Add to Cart
                </button>
              </div>
            {hasUnsavedChanges && (
              <div className="mt-2 text-red-500 text-sm">
                Please save your design before adding to cart
              </div>
            )}
          </div>

          <CustomizationPanel
            viewSide={viewSide}
            activeCustomization={activeCustomization}
            customizations={customizations}
            onAddText={handleAddText}
            onAddSticker={handleAddSticker}
            onUpdateText={handleUpdateText}
            onClearActiveCustomization={handleClearActiveCustomization}
          />
        </div>
      </div>
    </>
  );
};

export default Product;