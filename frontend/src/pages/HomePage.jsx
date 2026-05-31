import React, { useEffect } from 'react'
import { Container, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import { Link } from 'react-router'
import { useColorModeValue } from '../components/ui/color-mode'
import { useProductStore } from '../store/product'
import ProductCard from '../components/ProductCard.jsx'

const HomePage = () => {
  const {fetchProducts, products} = useProductStore()
  // const products = useProductStore((s) => s.products)
  // const fetchProducts = useProductStore((s) => s.fetchProducts)

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return (
    <Container maxW={Container.xl} py={12}>
      <VStack gap={8}>
        <Text fontSize={{ base: '1rem', sm: '1.3rem' }} fontWeight={'bold'} textAlign={'center'}>
          Current Products 🚀
        </Text>

        <SimpleGrid columns={{base : '1', md : '2', lg : '3'}} gap={10} width={'full'}>
          {products.map((product) => (
            <ProductCard key={product._id} product={product}/> 
          ))}
        </SimpleGrid>

        {products.length === 0 && 
        <Text fontSize={{ base : '0.8rem', sm : '1rem'}} textAlign={'center'} fontWeight={'bold'}>
          No Product Found 😢{" "}
          <Link to={'/create'}>
            <Text as={'span'} _hover={{textDecoration : 'underline'}} color={useColorModeValue('red', 'red.300')}>
              Create a Product
            </Text>
          </Link>
        </Text>}

      </VStack>
    </Container>
  )
}

export default HomePage
