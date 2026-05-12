import { Alert, AlertIcon, Box, Button, Card, CardBody, CardFooter, CardHeader, Checkbox, Flex, FormControl, HStack, Input, PinInput, PinInputField, SimpleGrid, Spinner, Text, VStack, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "react-query";
import { getSingleUser, updateSingleUser } from "../api/user";

export const EditProfileInfo = () => {
  const toast = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => getSingleUser(1),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    onSuccess: (data) => console.log("Data", data),
    onError: (error) => console.log("Error", error),
  });

  const mutation = useMutation({
    mutationFn: (updatedUser) => updateSingleUser(data.id, updatedUser),
    onSuccess: () => {
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
    },
    onError: (error) => {
      toast({
        title: "Error updating profile",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const onSubmit = (formData) => {
    mutation.mutate(formData);
  };

  if (isLoading) return <Box textAlign="center" p={10}><Spinner thickness='4px' emptyColor='gray.200' size='xl' color='blue.500' /></Box>;
  if (error) return <Box color="red.500" textAlign="center" p={10}>Error: {error.message}</Box>;

  return (
    <Box>
      {isSubmitted && (
        <Alert status="success">
          <AlertIcon />
          Data uploaded to the server. Fire on!
        </Alert>
      )}
      <Card bg="gray.700" color="white" w="700px" h="600px" m="auto" mt={20} borderRadius={10}>
        <CardHeader>
          <Flex direction="column" align="center" justify="center" pt={10} h="10px">
            <Text fontSize="3xl" color="blue.500" fontWeight="bold" mt={4}>
              Registration Form
            </Text>
            <Text fontSize="md" color="gray.500">
              Please fill in the form below to create an account.
            </Text>
          </Flex>
        </CardHeader>
        <CardBody>
          <Box w="500px" h="400px" m="auto" mt={5}>
            <Flex direction="column" h="400px" align="center" justify="center">
              <VStack spacing={4} align="center" mt={4} as="form" onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                  <SimpleGrid columns={2} spacing={4}>
                    <Input {...register("firstName")} placeholder="First Name" defaultValue={data?.firstName} />
                    <Input {...register("lastName")} placeholder="Last Name" defaultValue={data?.lastName} />
                  </SimpleGrid>
                </FormControl>
                <FormControl>
                  <Input {...register("email")} placeholder="Email" mb={3} defaultValue={data?.email} />
                  <Input {...register("password")} placeholder="Password" type="password" defaultValue={data?.password} />
                  <Input {...register("confirmPassword")} placeholder="Confirm Password" type="password" mt={3} defaultValue={data?.password} />
                  <Checkbox {...register("terms")} defaultChecked={data?.terms}>Checkbox</Checkbox>
                  <HStack>
                    <PinInput type="alphanumeric" mask>
                      <PinInputField {...register("otpField1")} />
                      <PinInputField {...register("otpField2")} />
                      <PinInputField {...register("otpField3")} />
                      <PinInputField {...register("otpField4")} />
                    </PinInput>
                  </HStack>
                </FormControl>
                <Button colorScheme="blue" size="md" width="500px" type="submit" isLoading={mutation.isLoading}>
                  Submit
                </Button>
              </VStack>
            </Flex>
          </Box>
        </CardBody>
        <CardFooter align="center" justify="center">
          <Text fontSize="sm" color="gray.500" mt={4}>
            Already have an account?{" "}
            <a href="/" style={{ color: "blue.500" }}>
              Login here
            </a>
            .
          </Text>
        </CardFooter>
      </Card>
    </Box>
  );
};

export default EditProfileInfo;
