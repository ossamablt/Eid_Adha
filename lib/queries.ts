import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getstatus, updateDonationStatus } from "./functions";

export interface DonorDetails {
  fullName: string;
  phoneNumber: string;
  wilaya: string;
  amount: number;
}

export interface ProofDetails {
  images: string[];
  video?: string;
  description?: string;
  uploadDate?: string;
}

export interface DonationRecord {
  _id: string;
  donorsDetails: DonorDetails[];
  status: string;
  statusHistory: string[];
  trackingCode: string;
  assignedTo: string;
  preuveDetails?: ProofDetails;
  animalType: string;
  createdAt: string;
  updatedAt: string;
}

// API Response wrapper
export interface DonationRecordResponse {
  status: string;
  data: DonationRecord;
  message: string;
}

// Custom hook for fetching donation record
export const useDonationRecord = (trackingCode: string) => {
  return useQuery<DonationRecordResponse>({
    queryKey: ['donationRecord', trackingCode],
    queryFn: () => getstatus(trackingCode),
    enabled: !!trackingCode,
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 60 * 1000, // Refetch every minute
    refetchOnWindowFocus: true,
    retry: 3,
  });
};

// Custom hook for updating donation status
export const useDonationStatusUpdate = (trackingCode: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ status, feedback }: { status: string; feedback?: string }) => 
      updateDonationStatus(trackingCode, status, feedback),
    onSuccess: () => {
      // Invalidate and refetch the donation record
      queryClient.invalidateQueries({ queryKey: ['donationRecord', trackingCode] });
    },
    onError: (error) => {
      console.error("Error updating donation status:", error);
    }
  });
};

// Query keys factory for better organization
export const donationQueries = {
  all: ['donations'] as const,
  records: () => [...donationQueries.all, 'records'] as const,
  record: (trackingCode: string) => [...donationQueries.records(), trackingCode] as const,
};
