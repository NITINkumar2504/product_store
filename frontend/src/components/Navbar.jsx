import React from 'react'
import { Button, Container, Flex, HStack, Text } from '@chakra-ui/react'
import { Link } from 'react-router'
import { Moon, ShoppingCart, SquarePlus, Sun } from 'lucide-react'
import { useColorMode, useColorModeValue } from './ui/color-mode'

const Navbar = () => {
  const {colorMode, toggleColorMode} = useColorMode();
  // const logoColor = useColorModeValue('black', 'white');

  return (
    <Container maxW={"1140px"} px={'4'}>
      <Flex h={'16'} alignItems={'center'} justifyContent={'space-between'} flexDirection={{base : 'column', sm : 'row'}}>
        <Link to={'/'}>
          <HStack as={'span'} spacing={'2'} alignItems={'center'} justifyContent={'center'}>
            <Text fontSize={{ base: '1rem', sm: '1.5rem' }} fontWeight={'bold'} textTransform={'uppercase'} color={useColorModeValue('black', 'white')}>
              Product Store
            </Text>
            <ShoppingCart />
          </HStack>
        </Link>

        <HStack gap={'2'} alignItems={'center'}>
          <Link to={'/create'}>
            <Button>
              <SquarePlus />
            </Button>
          </Link>

          <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? <Moon /> : <Sun />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  )
}

export default Navbar
