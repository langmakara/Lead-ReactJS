import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Flex, Text, VStack, Input, Button, SimpleGrid, Image } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import heroImg from '../assets/hero.png'
import Building from '../assets/Building.jpg'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const toast = useToast()


  const handleLogin = () => {
    const toastId = 'login-toast'
    const validUser = username.trim() === 'admin'
    const validPassword = password === '1234'

    if (toast.isActive(toastId)) return;
    if (validUser && validPassword) {
      toast({
        id: toastId,
        title: 'Login successful.',
        description: "Welcome back, admin!",
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      setTimeout(() => {
        navigate('/Home')
      }, 3000)
    }
    else {
      toast({
        id: toastId,
        title: 'Login failed.',
        description: "Invalid username or password.",
        status: 'error',  
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <div>
      <SimpleGrid columns={2}>
        <Flex direction="column" align="center" justify="center" p={10} h="100vh">
          <Image src={Building} alt="Building" w="full" h="full" objectFit="cover" />
        </Flex>
        <Flex direction="column" align="center" justify="center" p={10} h="100vh">
          <VStack spacing={4} align='center' mt={4}>
            <Image src={heroImg} alt="Hero" className="w-full h-auto" boxSize='100px' center />
            <Text fontSize='3xl' color='blue.500' fontWeight='bold' mt={4}>
              Welcome!
            </Text>
            <Text fontSize='md' color='gray.500'>
              You can customize it as needed.
            </Text>
            <Input
              placeholder='Enter your name'
              size='md'
              width='300px'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type='password'
              placeholder='Enter your password'
              size='md'
              width='300px'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              colorScheme='blue' 
              size='md' 
              width='300px'
              onClick={handleLogin} // Simply call the function here
            >
              Login
            </Button>
          </VStack>
        </Flex>
      </SimpleGrid>
    </div>
  )
}
