import { useMutation, useQuery, useQueryClient } from "react-query";
import { addNewUser, deleteSingleUser, getAllUser, updateSingleUser } from "../api/user";


const GET_EMPLOYEE = "GET_EMPLOYEE";
const ADD_EMPLOYEE = "ADD_EMPLOYEE";
const UPDATE_EMPLOYEE = "UPDATE_EMPLOYEE";
const DELETE_EMPLOYEE = "DELETE_EMPLOYEE";

export const useInvalidateEmployee = () => {
    const queryClient = useQueryClient();
    return () => queryClient.invalidateQueries(GET_EMPLOYEE);
}

export const useGetEmployee = ({payload, config} = {}) => {
    return useQuery({
        queryKey: [GET_EMPLOYEE, payload],
        queryFn: () => getAllUser(payload),
        ...config,
    })
}

export const useAddEmployee = (onSuccess, onError) => {
    const invalidateEmployee = useInvalidateEmployee();
    return useMutation({
        mutationKey: [ADD_EMPLOYEE],
        mutationFn: (userData) => addNewUser(userData),
        retry: 1,
        onSuccess: (data) => {
            invalidateEmployee();
            if (onSuccess) onSuccess(data);
        },
        onError: (error) => {
            if (onError) onError(error);
        }
    })
}

export const useUpdateEmployee = ({onSuccess, onError}) => {
  const invalidateEmployee = useInvalidateEmployee();
  return useMutation({
    mutationKey: [UPDATE_EMPLOYEE],
    mutationFn: (updatedUser) => updateSingleUser(updatedUser),
    onSuccess: (data) => {
      invalidateEmployee();
      if (onSuccess) onSuccess(data);
    },
    onError: (error) => {
      if (onError) onError(error);
    },
  });
}

export const useDeleteEmployee = ({onSuccess, onError}) => {
  const invalidateEmployee = useInvalidateEmployee();
  return useMutation({
    mutationKey: [DELETE_EMPLOYEE],
    mutationFn: (id) => deleteSingleUser(id),
    onSuccess: (data) => {
      invalidateEmployee();
      if (onSuccess) onSuccess(data);
    },
    onError: (error) => {
      if (onError) onError(error);
    },
  });
}
