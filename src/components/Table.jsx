import { Box, Button, Input, Skeleton, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { limitProduct } from "../api/product";

export default function BasicTable1() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   getAllProduct().then((res) => {
  //     setData(res);
  //     setLoading(false);
  //   }).catch((err) => {
  //     setError(err);
  //     setLoading(false);
  //   });
  // }, []);

  // const [name, setName] = useState("");
  // const [searchData, setSearchData] = useState([]);

  // const handleSearch = () => {
  //   searchProduct(name).then((res) => {
  //     setSearchData(res);
  //     setLoading(false);
  //   }).catch((err) => {
  //     setError(err);
  //     setLoading(false);
  //   });
  // }

  const [limit, setLimit] = useState(10);
  const [limitData, setLimitData] = useState([]);

  const handleLimit = () => {
    limitProduct(limit)
      .then((res) => {
        setLimitData(res);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };
  console.log(loading);

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
      {/* <Input
        placeholder="Search"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onBlur={handleSearch}
      /> */}
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
              {loading && (
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
              {limitData?.map((products) => (
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
