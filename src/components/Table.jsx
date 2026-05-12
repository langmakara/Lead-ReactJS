import { Box, Button, HStack, Skeleton, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { useGetProducts } from "../hooks/product";

export default function BasicTable1() {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetProducts({
    payload: {page, limit:10},
    config: {
      enabled: true,
      staleTime: 1000 * 60 * 5,
    }
  });

  const totalPages = data ? Math.ceil(data.total / 10) : 0;

  const columns = useMemo(() => {
    return [
      { Header: "ID", accessor: "id" },
      { Header: "Title", accessor: "title" },
      { Header: "Price", accessor: "price" },
      { Header: "Stock", accessor: "stock" },
      { Header: "Description", accessor: "description" },
    ];
  }, []);

  return (
    <Box>
      <TableContainer shadow="2xl" rounded="lg">
        <Box>
          <Table variant="simple">
            <Thead>
              <Tr>
                {columns.map((column) => (
                  <Th key={column.accessor}>{column.Header}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {isLoading && (
                <Tr>
                  <Th colSpan={columns.length}>
                    <Stack w="full">
                      <Skeleton height="20px" />
                      <Skeleton height="20px" />
                      <Skeleton height="20px" />
                    </Stack>
                  </Th>
                </Tr>
              )}
              {data?.products?.map((products) => (
                <Tr key={products.id}>
                  {columns.map((column) => (
                    <Td key={column.accessor}>{products[column.accessor]}</Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </TableContainer>
      <HStack justify="center" mt={4} spacing={4}>
        <Button colorScheme="blue" onClick={() => setPage((p) => Math.max(1, p - 1))} isDisabled={page === 1}>
          Previous
        </Button>
        <Button colorScheme="blue" variant="outline" isDisabled>Page {page} of {totalPages}</Button>
        <Button colorScheme="blue" onClick={() => setPage((p) => p + 1)} isDisabled={page >= totalPages}>
          Next
        </Button> 
      </HStack>
    </Box>
  );
}
