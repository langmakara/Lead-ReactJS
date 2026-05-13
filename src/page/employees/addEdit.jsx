import { Box, Button, FormControl, Input, SimpleGrid, useToast, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateEmployee, useGetUser, useAddEmployee } from "../../hooks/employee";

const AddEdit = () => {
  const { register, handleSubmit, reset } = useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const { isLoading } = useGetUser(id, {
    onSuccess: (data) => {
      reset({
        ...data,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address?.address,
        city: data.address?.city,
        state: data.address?.state,
        country: data.address?.country,
      });
    },
    onError: (error) => {
      toast({
        title: "Error fetching employee",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  }, { enabled: !id });

  const { mutateAsync: updateEmployee, isLoading: updateLoading } = useUpdateEmployee({
    onSuccess: () => {
      toast({
        title: "Employee updated successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
    onError: (error) => {
      toast({
        title: "Error updating employee",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const { mutateAsync: addEmployee, isLoading: addLoading } = useAddEmployee(
    () => {
      toast({
        title: "Employee added successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
    (error) => {
      toast({
        title: "Error adding employee",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  );

  


  const onSubmit = async (data) => {
    const json = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      address: {
        address: data.address,
        city: data.city,
        state: data.state,
        country: data.country,
      },
    };
    if (id) {
      await updateEmployee({ id, ...json });
    } else {
      await addEmployee(json);
    }
    console.log(json);
  };

  return (
    <Box p={8} shadow="2xl" rounded="lg">
      <Button onClick={() => navigate(-1)} colorScheme="blue" mb={3}>
        Back
      </Button>

      <Box as="form" onSubmit={handleSubmit(onSubmit)}>
        <VStack>
          <FormControl>
            <SimpleGrid columns={2} spacing={4}>
              <Input {...register("firstName")} mb={3} />
              <Input {...register("lastName")} mb={3} />
            </SimpleGrid>
          </FormControl>
        </VStack>
        <Box>
          <FormControl>
            <Input {...register("email")} mb={3} />
          </FormControl>
          <FormControl>
            <Input {...register("phone")} mb={3} />
          </FormControl>
          <FormControl>
            <Input {...register("address")} mb={3} />
          </FormControl>
          <FormControl>
            <Input {...register("city")} mb={3} />
          </FormControl>
          <FormControl>
            <Input {...register("state")} mb={3} />
          </FormControl>
          <Input {...register("country")} mb={3} />
        </Box>
        <Button colorScheme="blue" type="submit" isLoading={updateLoading}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default AddEdit;
