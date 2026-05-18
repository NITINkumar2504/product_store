import React, { useState } from 'react'
import { Container, VStack } from '@chakra-ui/react'

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name : "",
    price : "",
    image : "",
  });

  return (
    <Container>
      <VStack >
        
      </VStack>
    </Container>
  )
}

export default CreatePage
 