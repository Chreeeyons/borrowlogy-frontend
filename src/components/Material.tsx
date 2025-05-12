import { useState } from "react";
import EditMaterialModal from "./EditMaterialModal";
import { addtoCart } from "@/services/cartService";

interface MaterialProps {
  user_type: string;
  material: { id: number; name: string; quantity: number };
  refreshEquipmentList: () => void;
}

const Material = ({
  user_type,
  material,
  refreshEquipmentList,
}: MaterialProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleDelete = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/equipment/delete_equipment/",
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pk: material.id }),
        }
      );

      if (response.ok) {
        refreshEquipmentList(); // Refresh the list after deletion
      } else {
        console.error("Failed to delete material");
      }
    } catch (error) {
      console.error("Error deleting material:", error);
    }
  };

  const handleIncrease = () => {
    if (quantity < material.quantity) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const [successMessage, setSuccessMessage] = useState("");

  const handleSave = async () => {
    try {
      const response = await addtoCart({
        user_id: 1,
        quantity: quantity,
        equipment_id: material.id,
      });
  
      setSuccessMessage("Item added to cart!");
  
      setTimeout(() => setSuccessMessage(""), 3000); // Auto-hide
  
      refreshEquipmentList();
    } catch (error) {
      console.error("Error adding equipment:", error);
    }
  };  

  return (
    <div>
      <div className="p-4 mb-2 bg-[#8C1931] shadow-md flex justify-between items-center rounded-lg">
        <div>
          <h2 className="text-white text-xl font-semibold mb-2 tracking-wide">
            {material.name}
          </h2>
          <p className="text-sm font-normal flex items-center gap-2">
            <span
              className={
                material.quantity > 0 ? "text-green-500" : "text-red-500"
              }
            >
              {material.quantity > 0 ? "Available" : "Out of Stock"}
            </span>
            <span className="text-white">| Quantity: {material.quantity}</span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-5">
          {user_type !== "admin" && material.quantity > 0 && (
            <div className="flex items-center bg-gray-200 rounded-lg overflow-hidden text-white">
              <button
                onClick={handleDecrease}
                className="px-3 py-2 text-[#8C1931] hover:bg-gray-300"
              >
                -
              </button>
              <input
                type="text"
                value={quantity}
                readOnly
                className="w-12 h-9 text-center bg-gray-200 text-[#8C1931]"
              />
              <button
                onClick={handleIncrease}
                className="px-3 py-2 text-[#8C1931] hover:bg-gray-300"
              >
                +
              </button>
            </div>
          )}

          {user_type === "admin" ? (
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-[#8C1931] px-5 py-2 rounded hover:bg-gray-300"
            >
              Edit
            </button>
          ) : material.quantity > 0 ? (
            <div className="flex flex-col items-start">
              <button
                className="bg-[#04543C] text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={handleSave}
              >
                Add to Cart
              </button>
            </div>
          ) : (
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded cursor-not-allowed"
              disabled
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <EditMaterialModal
          material={material}
          onClose={() => setIsModalOpen(false)}
          onSave={refreshEquipmentList}
          onDelete={handleDelete}
        />
      )}
      {successMessage && (
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        <div className="bg-white/70 px-6 py-4 rounded-lg shadow-lg text-center backdrop-blur-sm">
          <div className="flex flex-col items-center justify-center">
            <span className="text-3xl text-green-700 mb-2">✓</span>
            <p className="text-lg font-semibold text-[#04543C]">{successMessage}</p>
          </div>
        </div>
      </div>
    )}
    </div>
  );
};

export default Material;
