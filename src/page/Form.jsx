import {
    Alert,
    AlertIcon, Box, Button, Card, CardBody, CardFooter, CardHeader, Checkbox, Flex, FormControl, HStack, Input, PinInput, PinInputField, SimpleGrid, Text, VStack
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";


const Form = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { register, handleSubmit, watch, } = useForm();
    // const toast = useToast()
    const onSubmit = (data) => {
        console.log(data);
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 3000);
    }

    console.log(watch("example"))


  return (
    <Box>
        {isSubmitted && (
            <Alert status='success'>
                <AlertIcon />
                Data uploaded to the server. Fire on!
            </Alert>
        )}
        <Card bg="gray.700" color="white" w="700px" h="600px" m="auto" mt={20} borderRadius={10}>
            <CardHeader>
                <Flex direction="column" align="center" justify="center" pt={10} h="10px">
                    <Text fontSize='3xl' color='blue.500' fontWeight='bold' mt={4}>
                        Registration Form
                    </Text>
                    <Text fontSize='md' color='gray.500'>
                        Please fill in the form below to create an account.
                    </Text>
                </Flex>
            </CardHeader>
            <CardBody >
                    <Box w="500px" h="400px" m="auto" mt={5}>
                        <Flex direction="column" h="400px" align="center" justify="center">
                            <VStack spacing={4} align='center' mt={4} as="form" onSubmit={handleSubmit(onSubmit)}>
                                <FormControl
                                >
                                    <SimpleGrid columns={2} spacing={4}>
                                        <Input {...register("firstName", )} placeholder="First Name"/>
                                        <Input {...register("lastName", )} placeholder="Last Name"/>
                                    </SimpleGrid>
                                </FormControl>
                                <FormControl>
                                    <Input {...register("email", )} placeholder="Email" mb={3}/>

                                    <Input {...register("password",)} placeholder="Password" type="password" />

                                    <Input {...register("confirmPassword", )} placeholder="Confirm Password" type="password" mt={3}/>
                                    <Checkbox {...register("terms")}>
                                        Checkbox
                                    </Checkbox>
                                    <HStack>
                                        <PinInput type='alphanumeric' mask>
                                            <PinInputField {...register("otpField1")} />
                                            <PinInputField {...register("otpField2")} />
                                            <PinInputField {...register("otpField3")} />
                                            <PinInputField {...register("otpField4")} />
                                        </PinInput>
                                    </HStack>
                                </FormControl>
                                {/* <Button
                                    onClick={() => {
                                        // Create an example promise that resolves in 5s
                                        const examplePromise = new Promise((resolve, reject) => {
                                        setTimeout(() => resolve(200), 5000)
                                        })

                                        // Will display the loading toast until the promise is either resolved
                                        // or rejected.
                                        toast.promise(examplePromise, {
                                        success: { title: 'Promise resolved', description: 'Looks great' },
                                        error: { title: 'Promise rejected', description: 'Something wrong' },
                                        loading: { title: 'Promise pending', description: 'Please wait' },
                                        })
                                    }}
                                    >
                                    Show Toast
                                    </Button> */}
                                <Button colorScheme='blue' size='md' width='500px' type="submit">
                                    Submit
                                </Button>
                            </VStack>
                        </Flex>
                    </Box> 
            </CardBody>
            <CardFooter align="center" justify="center">
                <Text fontSize='sm' color='gray.500' mt={4}>
                    Already have an account? <a href="/" style={{ color: 'blue.500' }}>Login here</a>.
                </Text>
            </CardFooter>
        </Card>
    </Box>
    
  )
}

export default Form