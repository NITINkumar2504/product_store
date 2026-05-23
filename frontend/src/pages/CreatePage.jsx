import React, { useState } from 'react'
import { Box, Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import { useColorModeValue } from '../components/ui/color-mode';

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name : "",
    price : "",
    image : "",
  });

  const handleAddProduct = () => {
    console.log(newProduct);
  }

  return (
    <Container maxW={'800px'}>
      <VStack gap={'4'}>
        <Heading as={'h1'} size={'3xl'} textAlign={'center'} mb={8}>
          Create New Product
        </Heading>

        <Box w={'full'} bg={useColorModeValue('white', 'black')} p={6} rounded={'lg'} shadow={'md'}>
          <VStack gap={4}>
            <Input placeholder='Product name' name='Product name' value={newProduct.name} 
            onChange={(e) => setNewProduct({...newProduct, name : e.target.value})}
            />

            <Input type='number' placeholder='Product price' name='Product price' value={newProduct.price} 
            onChange={(e) => setNewProduct({...newProduct, price : e.target.value})}
            />

            <Input placeholder='Product image url' name='Product image' value={newProduct.image} 
            onChange={(e) => setNewProduct({...newProduct, image : e.target.value})}
            />

            <Button bg={useColorModeValue('black', 'white')} onClick={handleAddProduct} w={'full'} textAlign={'center'}>
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default CreatePage
 