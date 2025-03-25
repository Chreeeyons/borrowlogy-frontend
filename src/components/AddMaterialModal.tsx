"use client";

import { addEquipment } from "@/services/equipmentService";
import { useState, useEffect } from "react";

interface AddMaterialModalProps {
  onClose: () => void;
  onSave: () => void; // Simplified to just trigger refresh
}

const AddMaterialModal: React.FC<AddMaterialModalProps> = ({ onClose, onSave }) => {
  const [form, setForm] = useState({ name: "", quantity: "" });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Enter") handleSave();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [form]);

  const handleSave = async () => {
    if (form.name.trim() && !isNaN(Number(form.quantity))) {
      try {
        const response = await addEquipment({ name: form.name, quantity: Number(form.quantity) });

        if (response?.equipment) {
          onSave(); // Refresh the list
          onClose();
        } else {
          console.error("Unexpected API response:", response);
        }
      } catch (error) {
        console.error("Error adding equipment:", error);
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white p-8 rounded-lg shadow-lg w-[420px]" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">Add Material</h2>

        <input
          type="text"
          placeholder="Material Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#04543C]"
        />

        <input
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#04543C]"
        />

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-5 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">
            Cancel
          </button>
          <button onClick={handleSave} className="px-5 py-2 bg-[#04543C] text-white rounded-lg hover:bg-green-700">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMaterialModal;
