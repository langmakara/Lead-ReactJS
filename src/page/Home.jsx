import { Box, Flex, Heading, Button, Spacer, HStack, VStack, Text, SimpleGrid, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Stack, Skeleton } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import BasicTable1 from "../components/Table";
import BasicTable from "../components/ReactTable";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <Box minH="100vh" bg="gray.50">
      <Flex as="nav" bg="tomato" color="white" p={4} align="center">
        <Heading size="lg">Lead-ReactJS</Heading>
        <Spacer />
        <HStack spacing={6}>
          <Button variant="ghost" color="white" _hover={{ bg: "whiteAlpha.200" }} onClick={() => navigate("/Home")}>
            Home
          </Button>
          <Button variant="ghost" color="white" _hover={{ bg: "whiteAlpha.200" }} onClick={() => navigate("/Profile")}>
            Profile
          </Button>
          <Button variant="solid" colorScheme="whiteAlpha" onClick={handleLogout}>
            Logout
          </Button>
        </HStack>
      </Flex>

      <Box p={8}>
        <VStack spacing={8} align="stretch">
          <Box>
            <Heading size="xl" color="gray.700">
              Welcome back!
            </Heading>
            <Text color="gray.500">Here's what's happening with your account today.</Text>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            <Stat bg="white" p={6} rounded="lg" shadow="sm">
              <StatLabel>Total Users</StatLabel>
              <StatNumber>1,245</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                +12% this week
              </StatHelpText>
            </Stat>
            <Stat bg="white" p={6} rounded="lg" shadow="sm">
              <StatLabel>Active Sessions</StatLabel>
              <StatNumber>342</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                +5% this week
              </StatHelpText>
            </Stat>
            <Stat bg="white" p={6} rounded="lg" shadow="sm">
              <StatLabel>Pending Tasks</StatLabel>
              <StatNumber>28</StatNumber>
              <StatHelpText>
                <StatArrow type="decrease" />
                -3% this week
              </StatHelpText>
            </Stat>
          </SimpleGrid>
        </VStack>
      </Box>
      <Box p={8}>
        <BasicTable />
      </Box>
      <Box p={8}>
        <BasicTable1 />
      </Box>
    </Box>
  );
};

export default Home;
