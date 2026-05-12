import { Box, Button, Input, Skeleton, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { limitProduct } from "../api/product";
import { useGetProducts } from "../hooks/product";

export default function BasicTable1() {
  const {data,isLoading } = useGetProducts();
console.log(data);


  const [limit, setLimit] = useState(10);
  const [limitData, setLimitData] = useState([]);

  const handleLimit = () => {
    limitProduct(limit)
      .then((res) => {
        setLimitData(res);
      })
      .catch((err) => {
      });
  };

  const columns = useMemo(() => {
    return [
      { Header: "ID", accessor: "id" },
      { Header: "Title", accessor: "title" },
      { Header: "Price", accessor: "price" },
      { Header: "Action", accessor: "action" },
      { Header: "Description", accessor: "description" },
    ];
  }, []);

  return (
    <Box>
      <TableContainer shadow="2xl">
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
                <>
                  <Tr>
                    <Th colSpan={columns.length}>
                      <Stack w="full">
                        <Skeleton height="20px" />
                        <Skeleton height="20px" />
                        <Skeleton height="20px" />
                      </Stack>
                    </Th>
                  </Tr>
                </>
              )}
              {data?.map((products) => (
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
      <Input mt={4} bg="AccentColorText" placeholder="Limit" value={limit} onChange={(e) => setLimit(e.target.value)} onBlur={handleLimit} />
      <Button onClick={handleLimit} m={4} variant="solid" colorScheme="blue">
        Show 10 Product
      </Button>
    </Box>
  );
}
