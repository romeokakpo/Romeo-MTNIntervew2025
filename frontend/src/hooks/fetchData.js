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

export const usePutData = (mutationKey, func, id) => {
  return useMutation({
    mutationKey: [mutationKey],
    mutationFn: (values) => func(id, values),
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
