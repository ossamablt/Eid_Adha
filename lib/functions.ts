import { api } from "./api";

export const getstatus = async (id: string) => {
  try {
    const response = await api.get(`/donations/${id}/status`);
    return response.data;
  } catch (error) {
    console.error("Error fetching donation status:", error);
    throw error;
  }
}