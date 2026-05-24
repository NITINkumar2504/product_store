import React, { useState } from 'react'
import { Box, Button, Container, Heading, Input, useToastStyles, VStack } from '@chakra-ui/react'
import { useColorModeValue } from '../components/ui/color-mode';
import { useProductStore } from '../store/product.js';
import { toaster } from '../components/ui/toaster';

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name : "",
    price : "",
    image : "",
  });

  const {createProduct} = useProductStore() 

  const handleAddProduct = async () => {
    const {success, message} = await createProduct(newProduct)
    if(!success){
      toaster.create({
        title : 'error',
        type : 'error',
        description : message,
        closable : true, 
      })
    }
    else{
      toaster.create({
        title : 'success',
        type : 'success',
        description : message,
        closable : true,
      })
    }

    setNewProduct({ name : "", price : "", image : ""})
  }

  return (
    <Container maxW={'800px'}>
      <VStack gap={'4'}>
        <Heading as={'h1'} size={'3xl'} textAlign={'center'} mb={8}>
          Create New Product
        </Heading>

        <Box w={'full'} bg={useColorModeValue('white', 'black')} p={6} rounded={'lg'} shadow={'md'} borderWidth={2}>
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
