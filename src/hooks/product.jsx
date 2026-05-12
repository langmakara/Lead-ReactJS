import { useQuery, useQueryClient } from "react-query";
import { getAllProduct, limitProduct } from "../api/product";

const GET_PRODUCT = "GET_PRODUCT";

export const useInvalidateProduct = () => {
    const queryClient = useQueryClient();
    return () => queryClient.invalidateQueries(GET_PRODUCT);
};

export const useGetProducts = ({payload, config }) => {
    return useQuery({
        queryKey: [GET_PRODUCT, payload],
        queryFn: () => getAllProduct(payload),
        ...config,
        retry: 1,
    })
};

export const useLimitProducts = (limit) => {
    return useQuery({
        queryKey: ["products",limit],
        queryFn: () => limitProduct(limit),
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5,
        retry: 1,
        onSuccess: (data) => console.log("Data", data),
        onError: (error) => console.log("Error", error),
    });
}
