const BASE_URL = "http://127.0.0.1:8000/api/chemicals";

export const getChemicals = async (hazardType?: string) => {
  try {
    const url = hazardType
      ? `${BASE_URL}/get_chemicals/?hazard_type=${encodeURIComponent(hazardType)}`
      : `${BASE_URL}/get_chemicals/`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch chemicals");
    return await response.json();
  } catch (error) {
    console.error("Error fetching chemicals:", error);
    return null;
  }
};

export const addChemical = async (chemicalData: {
  chemical_name: string;
  mass: number;
  hazard_type: string;
  brand_name?: string;
  expiration_date?: string;
  location?: string;
}) => {
  try {
    const response = await fetch(`${BASE_URL}/add_chemical/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(chemicalData),
    });

    if (!response.ok) throw new Error("Failed to add chemical");
    return await response.json();
  } catch (error) {
    console.error("Error adding chemical:", error);
    return null;
  }
};

export const editChemical = async (chemicalData: {
  pk: number;
  [key: string]: any;
}) => {
  try {
    const response = await fetch(`${BASE_URL}/edit_chemical/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(chemicalData),
    });

    if (!response.ok) throw new Error("Failed to edit chemical");
    return await response.json();
  } catch (error) {
    console.error("Error editing chemical:", error);
    return null;
  }
};

export const deleteChemical = async (pk: number) => {
  try {
    const response = await fetch(`${BASE_URL}/delete_chemical/`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pk }),
    });

    if (!response.ok) throw new Error("Failed to delete chemical");
    return await response.json();
  } catch (error) {
    console.error("Error deleting chemical:", error);
    return null;
  }
};
