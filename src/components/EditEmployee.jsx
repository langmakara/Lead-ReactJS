import { Box, Button, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, useToast, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useUpdateEmployee } from "../hooks/employee";

export const EditEmployee = ({ isOpen, onClose, userId, firstName, lastName, userEmail, userPhone, userAddress, userCity, userState, userCountry }) => {
  const { register, handleSubmit } = useForm();
  const toast = useToast();
  
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
  const onSubmit = (data) => {
    updateEmployee({ id: userId, ...data });
    console.log(data);  
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
                    <Input {...register("firstName")} defaultValue={firstName} mb={3} />
                    <Input {...register("lastName")} defaultValue={lastName} mb={3} />
                  </SimpleGrid> 
                </FormControl>
              </VStack>
              
              <Input {...register("email")} defaultValue={userEmail} mb={3} />
              <Input {...register("phone")} defaultValue={userPhone} mb={3} />
              <Input {...register("address")} defaultValue={userAddress} mb={3} />
              <Input {...register("city")} defaultValue={userCity} mb={3} />
              <Input {...register("state")} defaultValue={userState} mb={3} />
              <Input {...register("country")} defaultValue={userCountry} mb={3} />
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
