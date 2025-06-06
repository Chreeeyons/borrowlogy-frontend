import { useState, useEffect, useRef } from "react";

const hazardTypeOptions = [
  { value: "No GHS", label: "No GHS" },
  { value: "Flammable", label: "Flammable" },
  { value: "Harmful", label: "Harmful" },
  { value: "Health Hazard", label: "Health Hazard" },
  { value: "Acute Toxicity", label: "Acute Toxicity" },
  { value: "Environmental Hazard", label: "Environmental Hazard" },
];

interface Chemical {
  id: number;
  chemical_name: string;
  mass: number;
  brand_name: string;
  hazard_type?: string;
  expiration_date?: string;
  location?: string;
}

interface EditChemicalModalProps {
  chemical: Chemical;
  onClose: () => void;
  onSave: (updatedChemical: Chemical) => void;  // Changed to accept the updated chemical
  onDelete: () => void;
}

const handleEditChemical = async (id: number, updatedData: Partial<Chemical>) => {
  try {
    const response = await fetch("http://localhost:8000/api/chemicals/edit_chemical/", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pk: id, ...updatedData }),
    });

    if (!response.ok) throw new Error("Failed to update chemical.");
    return response.json();
  } catch (error) {
    console.error("Error updating chemical:", error);
    return null;
  }
};

const EditChemicalModal: React.FC<EditChemicalModalProps> = ({ chemical, onClose, onSave, onDelete }) => {
  const [form, setForm] = useState<Chemical>(chemical);
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const prevOpenRef = useRef(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    if (prevOpenRef.current !== false) {
      document.body.style.overflow = false ? "hidden" : "unset";
      prevOpenRef.current = false;
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  const handleMassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setForm({ ...form, mass: 0 });
      return;
    }
    if (/^\d+(\.\d{0,2})?$/.test(value)) {
      setForm({ ...form, mass: parseFloat(value) });
    }
  };

  const handleSave = async () => {
    setLoading(true);
    const updatedChemical = await handleEditChemical(chemical.id, form);
    if (updatedChemical) {
      onSave({ ...form, id: chemical.id });  // Pass the updated chemical data back
      onClose();
    }
    setLoading(false);
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    setShowDeleteConfirmation(false);
    onDelete();
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50" onClick={onClose}>
        <div className="relative bg-white p-8 rounded-lg shadow-lg w-[450px]" onClick={(e) => e.stopPropagation()}>
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">Edit Chemical</h2>

          <input
            type="text"
            className="w-full p-3 mb-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#8C1931]"
            placeholder="Chemical Name"
            value={form.chemical_name}
            onChange={(e) => setForm({ ...form, chemical_name: e.target.value })}
            disabled={loading}
          />

          <input
            type="text"
            className="w-full p-3 mb-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#8C1931]"
            placeholder="Brand Name"
            value={form.brand_name}
            onChange={(e) => setForm({ ...form, brand_name: e.target.value })}
            disabled={loading}
          />

          <input
            type="text"
            className="w-full p-3 mb-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#8C1931]"
            placeholder="Mass (g/ml)"
            value={form.mass === 0 ? "" : form.mass.toString()}
            onChange={handleMassChange}
            disabled={loading}
            inputMode="decimal"
          />

          <select
            className="w-full p-3 mb-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#8C1931]"
            value={form.hazard_type || ""}
            onChange={(e) => setForm({ ...form, hazard_type: e.target.value })}
            disabled={loading}
          >
            <option value="">Select Hazard Type</option>
            {hazardTypeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <input
            type="date"
            className="w-full p-3 mb-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#8C1931]"
            value={form.expiration_date || ""}
            onChange={(e) => setForm({ ...form, expiration_date: e.target.value })}
            disabled={loading}
          />

          <input
            type="text"
            className="w-full p-3 mb-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#8C1931]"
            placeholder="Location"
            value={form.location || ""}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            disabled={loading}
          />

          <div className="flex justify-between mt-6">
            <button 
              onClick={handleDeleteClick} 
              className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
              disabled={loading}
            >
              Delete
            </button>
            <div className="flex gap-3">
              <button onClick={onClose} className="px-5 py-2 bg-gray-300 rounded-lg hover:bg-gray-400" disabled={loading}>
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2 bg-[#8C1931] text-white rounded-lg hover:bg-[#6f1427]"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur bg-opacity-50 z-50">
          <div
            className="bg-white rounded-lg p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-semibold mb-4 text-center">Confirm Deletion</h2>
            <p className="text-center mb-6">Are you sure you want to delete this chemical?</p>
            
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditChemicalModal;