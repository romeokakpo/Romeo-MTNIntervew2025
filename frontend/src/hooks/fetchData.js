import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";

export const useFetchData = (queryKey, func) => {
  return useQuery({
    queryKey: [queryKey],
    queryFn: func,
  });
};

export const usePostData = (mutationKey, func) => {
  return useMutation({
    mutationKey: [mutationKey],
    mutationFn: func,
  });
};

export const usePutData = (endpoint, mutationKey) => {
  return useMutation({
    mutationKey: [mutationKey],
    mutationFn: async (data) => {
      const response = await axiosInstance.put(endpoint, data);
      return response.data;
    },
  });
};

export const useDeleteData = (mutationKey) => {
  return useMutation({
    mutationKey: [mutationKey],
    mutationFn: async ({ endpoint }) => {
      const response = await axiosInstance.delete(endpoint);
      return response.data;
    },
  });
};
