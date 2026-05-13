import { Box, Button, HStack, Input, InputGroup, InputLeftElement, Skeleton, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useToast } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { IoSearchCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useGetEmployee, useSearchUser } from "../../hooks/employee";

const List = () => {
  const { data, isLoading } = useGetEmployee();
  const [searchData, setSearchData] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();

  const { mutateAsync: searchEmployee, isLoading: searchLoading } = useSearchUser({
    onSuccess: (data) => {
      setSearchData(data);
    },
    onError: (error) => {
      toast({
        title: "Error searching employee",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const columns = useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      { Header: "Name", accessor: "name" },
      { Header: "Email", accessor: "email" },
      { Header: "Actions", accessor: "actions" },
    ],
    [],
  );

  const displayData = searchData ?? data;

  return (
    <Box p={8}>
      <Button onClick={() => navigate(-1)} colorScheme="blue" mb={3}>
        Back
      </Button>
      <Button
        colorScheme="blue"
        size="sm"
        onClick={() => {
          navigate(`/employee/add`);
        }}
      >
        Add
      </Button>
      <TableContainer shadow="2xl" rounded="lg">
        <Box p={4}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <IoSearchCircleOutline size="20px" color="gray.300" />
            </InputLeftElement>
            <Input
              isInvalid={searchLoading}
              outline="2px solid blue"
              placeholder="Search employee"
              onChange={(e) => {
                const value = e.target.value;
                if (!value) {
                  setSearchData(null);
                  return;
                }
                searchEmployee(value);
              }}
            />
          </InputGroup>
        </Box>

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
                      <Skeleton height="20px" />
                      <Skeleton height="20px" />
                      <Skeleton height="20px" />
                      <Skeleton height="20px" />
                      <Skeleton height="20px" />
                    </Stack>
                  </Th>
                </Tr>
              )}
              {displayData?.map((user) => (
                <Tr key={user.id}>
                  <Td>{user.id}</Td>
                  <Td>
                    {user.firstName} {user.lastName}
                  </Td>
                  <Td>{user.email}</Td>
                  <Td>
                    <HStack spacing={2}>
                      <Button
                        colorScheme="blue"
                        size="sm"
                        onClick={() => {
                          navigate(`/employee/edit/${user.id}`);
                        }}
                      >
                        Edit
                      </Button>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </TableContainer>
    </Box>
  );
};

export default List;
