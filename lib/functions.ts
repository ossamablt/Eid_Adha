import { api } from "./api";

export const getstatus = async (id: string) => {
  try {
    const response = await api.get(`/donationRecord/tracking/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching donation status:", error);
    throw error;
  }
}

export const updateDonationStatus = async (id: string, status: string, feedback?: string) => {
  try {
    const payload: any = { status };
    if (feedback) {
      payload.feedback = feedback;
    }
    const response = await api.put(`/donationRecord/tracking/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error("Error updating donation status:", error);
    throw error;
  }
}