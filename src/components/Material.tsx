import { useState } from "react";
import EditMaterialModal from "./EditMaterialModal";

interface MaterialProps {
  user_type: string;
  material: { id: number; name: string; quantity: number };
  refreshEquipmentList: () => void;
}

const Material = ({ user_type, material, refreshEquipmentList }: MaterialProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/equipment/delete_equipment/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pk: material.id }),
      });

      if (response.ok) {
        refreshEquipmentList(); // Refresh the list after deletion
      } else {
        console.error("Failed to delete material");
      }
    } catch (error) {
      console.error("Error deleting material:", error);
    }
  };

  return (
    <div>
      <div className="p-4 mb-2 bg-[#8C1931] shadow-md flex justify-between items-center rounded-lg">
        <div>
          <h2 className="text-white text-xl font-semibold mb-2 tracking-wide">{material.name}</h2>
          <p className="text-sm font-normal flex items-center gap-2">
            <span className={material.quantity > 0 ? "text-green-500" : "text-red-500"}>
              {material.quantity > 0 ? "Available" : "Out of Stock"}
            </span>
            <span className="text-white">| Quantity: {material.quantity}</span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-5">
          {user_type === "admin" ? (
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-[#8C1931] px-5 py-2 rounded hover:bg-gray-300"
            >
              Edit
            </button>
          ) : material.quantity > 0 ? (
            <button className="bg-[#04543C] text-white px-4 py-2 rounded hover:bg-green-700">
              Add to Cart
            </button>
          ) : (
            <button className="bg-gray-500 text-white px-4 py-2 rounded cursor-not-allowed" disabled>
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
    </div>
  );
};

export default Material;
