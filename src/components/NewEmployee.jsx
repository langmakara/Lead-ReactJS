import { Box, Button, HStack, Skeleton, Stack, Table, TableContainer, Tbody, Td, Th, Thead, useToast, Tr, useDisclosure } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { useDeleteEmployee, useGetEmployee } from "../hooks/employee";
import EditEmployee from "./EditEmployee";

export const NewEmployee = () => {
  const { data, isLoading } = useGetEmployee();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userId, setUserId] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userPhone, setUserPhone] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const [userCity, setUserCity] = useState(null);
  const [userState, setUserState] = useState(null);
  const [userCountry, setUserCountry] = useState(null);
  const toast = useToast();

  const { mutateAsync: deleteEmployee, isLoading: deleteLoading } = useDeleteEmployee({
    onSuccess: () => {
      toast({
        title: "Employee deleted successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
    onError: (error) => {
      toast({
        title: "Error deleting employee",
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
                      <Skeleton height="20px" />
                      <Skeleton height="20px" />
                      <Skeleton height="20px" />
                      <Skeleton height="20px" />
                      <Skeleton height="20px" />
                    </Stack>
                  </Th>
                </Tr>
              )}
              {data?.map((user) => (
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
                          setUserId(user.id);
                          setFirstName(user.firstName);
                          setLastName(user.lastName);
                          setUserEmail(user.email);
                          setUserPhone(user.phone);
                          setUserAddress(user.address.address);
                          setUserCity(user.address.city);
                          setUserState(user.address.state);
                          setUserCountry(user.address.country);
                          onOpen();
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        isLoading={deleteLoading}
                        onClick={() => deleteEmployee(user.id)}
                        colorScheme="red"
                        size="sm"
                      >
                        Delete
                      </Button>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </TableContainer>
      <EditEmployee isOpen={isOpen} onClose={onClose} userId={userId} firstName={firstName} lastName={lastName} userEmail={userEmail} userPhone={userPhone} userAddress={userAddress} userCity={userCity} userState={userState} userCountry={userCountry} />
    </Box>
  );
};

export default NewEmployee;
