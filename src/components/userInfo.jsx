import { useQuery } from "react-query";
import { getSingleUser } from "../api/user";
import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, IconButton, Text, Image } from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiChat, BiLike, BiShare } from "react-icons/bi";
import { Spinner } from '@chakra-ui/react'

const UserInfo = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => getSingleUser(1),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    onSuccess: (data) => console.log("Data", data),
    onError: (error) => console.log("Error", error),
  });

  if (isLoading) return <Box textAlign="center" p={10}><Spinner thickness='4px' emptyColor='gray.200' size='xl' color='blue.500' /></Box>;
  if (error) return <Box color="red.500" textAlign="center" p={10}>Error: {error.message}</Box>;

  return (
    <Box w="100%" align="center" justify="center">
      <Card maxW="md" mt={20} borderRadius={10} boxShadow="2xl">
        <CardHeader>
          <Flex spacing="4">
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar name={`${data?.firstName} ${data?.lastName}`} src={data?.image} />

              <Box>
                <Heading size="sm">{data?.firstName} {data?.lastName}</Heading>
                <Text>{data?.company?.title}</Text>
              </Box>
            </Flex>
            <IconButton variant="ghost" colorScheme="gray" aria-label="See menu" icon={<BsThreeDotsVertical />} />
          </Flex>
        </CardHeader>
        <CardBody>
          <Text>{data?.company?.address .address}, {data?.company?.address.city}, {data?.company?.address.postalCode}</Text>
        </CardBody>
        <Image objectFit="cover" src={data?.image} alt={`${data?.firstName} ${data?.lastName}`} />
        <CardFooter
          justify="space-between"
          flexWrap="wrap"
          sx={{
            "& > button": {
              minW: "136px",
            },
          }}
        >
          <Button flex="1" variant="ghost" leftIcon={<BiLike />}>Like</Button>
          <Button flex="1" variant="ghost" leftIcon={<BiChat />}>Comment</Button>
          <Button flex="1" variant="ghost" leftIcon={<BiShare />}>Share</Button>
        </CardFooter>
      </Card>
    </Box>
  );
};

export default UserInfo
