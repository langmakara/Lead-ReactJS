import { Box, Button, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, useToast, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useUpdateEmployee } from "../hooks/employee";
import { useEffect } from "react";

export const EditEmployee = ({ isOpen, onClose, selectId }) => {
  const { register, handleSubmit, reset } = useForm();
  const toast = useToast();
  const {id, firstName, lastName,}=selectId || {};
  useEffect(() => {
    if (selectId) {
      reset({
        ...selectId,
        address: selectId.address.address,
        city: selectId.address.city,
        state: selectId.address.state,
        country: selectId.address.country
      });
    }
  }, [selectId, reset]);
  const {mutateAsync: updateEmployee, isLoading: updateLoading} = useUpdateEmployee({
    onSuccess: () => {
      toast({
        title: "Employee updated successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    },
    onError: (error) => {
      toast({
        title: "Error updating employee",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    }
  });
  // submit function (send data to updateEmployee mutation)
  const onSubmit = async (data) => {
    const json = {
      firstName:data.firstName,
      lastName:data.lastName,
      email:data.email,
      phone:data.phone,
      address: {
        address:data.address,
        city:data.city,
        state:data.state,
        country:data.country
      }
    }
    await updateEmployee({ id, ...json });
    console.log(json);
  };

  return (
    <Box>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit {firstName + " " + lastName}</ModalHeader>
          <ModalCloseButton />
          <Box as="form" onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>

              <VStack>
                <FormControl>
                  <SimpleGrid columns={2} spacing={4}>
                    <Input {...register("firstName")}  mb={3} />
                    <Input {...register("lastName")} mb={3} />
                  </SimpleGrid> 
                </FormControl>
              </VStack>
              
              <Input {...register("email")}  mb={3} />
              <Input {...register("phone")}  mb={3} />
              <Input {...register("address")}  mb={3} />
              <Input {...register("city")}  mb={3} />
              <Input {...register("state")}  mb={3} />
              <Input {...register("country")}  mb={3} />
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button colorScheme="blue" type="submit" isLoading={updateLoading}>Submit</Button>
            </ModalFooter>
          </Box>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default EditEmployee;
