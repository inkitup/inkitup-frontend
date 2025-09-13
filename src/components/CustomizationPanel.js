import React, { useState, useRef, useEffect } from "react";
import { Type, Image, Check } from "lucide-react";

const CustomizationPanel = ({
  viewSide,
  activeCustomization,
  customizations,
  onAddText,
  onAddSticker,
  onUpdateText,
  onClearActiveCustomization
}) => {
  const [customizationType, setCustomizationType] = useState("sticker");
  const [customText, setCustomText] = useState("");
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [fontSize, setFontSize] = useState(24);
  const [fontFamily, setFontFamily] = useState("Roboto");
  const [editMode, setEditMode] = useState(false);
  const [fonts, setFonts] = useState([]);
  const [loadingFonts, setLoadingFonts] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const fileInputRef = useRef(null);
  const colorInputRef = useRef(null);

  const textColors = [
    { name: "White", value: "#FFFFFF" },
    { name: "Black", value: "#000000" },
    { name: "Red", value: "#FF0000" },
    { name: "Blue", value: "#0000FF" },
    { name: "Yellow", value: "#FFFF00" },
  ];

  useEffect(() => {
    const loadFonts = async () => {
      setLoadingFonts(true);
      try {
        const response = await fetch(
          "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyCWaGQH2O_fBrZlexLecSxTtmskHm4W3ik&sort=popularity"
        );
        const data = await response.json();
        setFonts(data.items.slice(0, 25));
      } catch (error) {
        console.error("Failed to load fonts:", error);
        setFonts([
          { family: "Roboto" },
          { family: "Open Sans" },
          { family: "Lato" },
          { family: "Montserrat" },
          { family: "Poppins" },
          { family: "Oswald" },
          { family: "Raleway" },
          { family: "Ubuntu" },
          { family: "Playfair Display" },
          { family: "Merriweather" },
        ]);
      }
      setLoadingFonts(false);
    };

    loadFonts();
  }, []);

  useEffect(() => {
    if (activeCustomization) {
      const activeItem = customizations.find(c => c.id === activeCustomization);
      if (activeItem && activeItem.type === "text") {
        setCustomText(activeItem.content);
        setTextColor(activeItem.color);
        setFontSize(activeItem.fontSize);
        setFontFamily(activeItem.fontFamily || "Roboto");
        setCustomizationType("text");
        setEditMode(true);
      }
    } else {
      resetTextFields();
    }
  }, [activeCustomization, customizations]);

  const resetTextFields = () => {
    setCustomText("");
    setTextColor("#FFFFFF");
    setFontSize(24);
    setFontFamily("Roboto");
    setEditMode(false);
    onClearActiveCustomization?.();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      addSticker(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const addSticker = (imageUrl) => {
    const newSticker = {
      id: Date.now().toString(),
      type: "sticker",
      content: imageUrl,
      position: { x: 50, y: 50 },
      size: { width: 100, height: 100 },
      rotation: 0,
      side: viewSide,
    };
    onAddSticker(newSticker);
  };

  const handleAddText = () => {
    if (!customText.trim()) return;

    if (editMode && activeCustomization) {
      onUpdateText({
        content: customText,
        color: textColor,
        fontSize: fontSize,
        fontFamily: fontFamily,
      });
      resetTextFields();
    } else {
      const newText = {
        id: Date.now().toString(),
        type: "text",
        content: customText,
        color: textColor,
        fontSize: fontSize,
        fontFamily: fontFamily,
        position: { x: 50, y: 50 },
        rotation: 0,
        side: viewSide,
      };
      onAddText(newText);
      resetTextFields();
    }
  };

  const handleColorInputChange = (e) => {
    setTextColor(e.target.value);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">
          Customize Your T-Shirt
        </h2>

        <div className="mb-4">
          <p className="mb-2">Upload an image to add as a sticker:</p>
          <button
            onClick={() => {
              setCustomizationType("sticker");
              fileInputRef.current?.click();
            }}
            className={`w-full px-4 py-2 rounded-md flex items-center justify-center gap-2 ${customizationType === "sticker"
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-200 hover:bg-gray-300"
              }`}
          >
            <Image size={16} /> Upload Image
          </button>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        <div className="mb-4">
          <p className="mb-2">Add Your Text</p>
          <button
            className={`w-full flex items-center justify-center gap-1 px-4 py-2 rounded-md ${customizationType === "text"
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-200 hover:bg-gray-300"
              }`}
            onClick={() => setCustomizationType("text")}
          >
            <Type size={16} /> Text
          </button>
        </div>

        {customizationType === "text" && (
          <div>
            <div className="mb-4">
              <label className="block mb-1">Text Content:</label>
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="Enter your text here"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Text Color:</label>
              <div className="flex gap-2 flex-wrap mb-2">
                {textColors.map((color) => (
                  <button
                    key={color.value}
                    className={`w-8 h-8 rounded-full border-2 ${textColor === color.value
                      ? "border-blue-500 ring-2 ring-blue-300"
                      : "border-gray-300"
                      } focus:outline-none`}
                    style={{ backgroundColor: color.value }}
                    onClick={() => setTextColor(color.value)}
                    aria-label={`Select ${color.name} text`}
                  />
                ))}
              </div>
              <label htmlFor="color-input" className="text-gray-700 mt-1">Text Color Picker</label>
              <div className="flex items-center gap-2">
                <input
                  ref={colorInputRef}
                  type="color"
                  value={textColor}
                  onChange={handleColorInputChange}
                  className="w-8 h-8 cursor-pointer"
                />
                <span className="text-sm border px-2 py-1 rounded bg-gray-50">{textColor}</span>
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-1">Select Fonts:</label>
              {loadingFonts ? (
                <div className="animate-pulse">Loading fonts...</div>
              ) : (
                <select
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  {fonts.map((font) => (
                    <option key={font.family} value={font.family}>
                      {font.family}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-1">
                Font Size: {fontSize}px
              </label>
              <input
                type="range"
                min="12"
                max="72"
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            {editMode ? (
              <button
                onClick={handleAddText}
                disabled={!customText.trim()}
                className={`w-full px-4 py-2 rounded-md ${customText.trim()
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-300 cursor-not-allowed"
                  } flex items-center justify-center gap-2`}
              >
                <Check size={16} /> Apply Changes
              </button>
            ) : (
              <button
                onClick={handleAddText}
                disabled={!customText.trim()}
                className={`w-full px-4 py-2 rounded-md ${customText.trim()
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 cursor-not-allowed"
                  }`}
              >
                Add Text
              </button>
            )}
            <div className="mt-4 p-2 border rounded-md">
              <p className="text-sm text-gray-600 mb-2">Preview:</p>
              <div
                style={{
                  fontFamily: fontFamily,
                  fontSize: `${fontSize}px`,
                  color: textColor,
                  minHeight: '50px',
                  background: textColor === '#FFFFFF' ? '#f0f0f0' : 'white',
                  border: '1px dashed #ccc',
                  padding: '10px',
                }}
              >
                {customText || "Your text Preview"}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomizationPanel;