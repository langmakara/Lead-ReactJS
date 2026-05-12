import { useQuery } from "react-query";
import { getAllProduct, limitProduct } from "../api/product";

export const useGetProducts = (limit = 10) => {
    return useQuery({
        queryKey: ["products"],
        queryFn: () => limitProduct(limit),
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5,
        retry: 1,
        onSuccess: (data) => console.log("Data", data),
        onError: (error) => console.log("Error", error),
    });
}