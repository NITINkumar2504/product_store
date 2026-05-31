import React, { useState } from 'react'
import { Box, Heading, HStack, Image, Text, Dialog, Portal, Button, VStack, Input } from '@chakra-ui/react'
import { Pencil, Trash } from 'lucide-react'
import { useColorModeValue } from './ui/color-mode'
import { useProductStore } from '../store/product'
import { toaster } from '../components/ui/toaster';

const ProductCard = ({product}) => {
    const {deleteProduct, updateProduct} = useProductStore()
    const [updatedProduct, setUpdatedProduct] = useState(product)
    const [open, setOpen] = useState(false)

    const handleDelete = async (pid) => {
        const {success, message} = await deleteProduct(pid)

        toaster.create({
            title: success ? "Success" : "Error",
            type: success ? "success" : "error",
            description: message,
            closable: true,
        })
    }

    const handleUpdate = async (pid, updatedProduct) => {
        const productToUpdate = {
            ...updatedProduct,
        }

        // Object.keys(productToUpdate).forEach((key) => {
        //     if (productToUpdate[key] === "") {
        //         delete productToUpdate[key]
        //     }
        // })

        const {success, message} = await updateProduct(pid, productToUpdate)

        if (success) {
            setOpen(false)
        }

        toaster.create({
            title: success ? "Success" : "Error",
            type: success ? "success" : "error",
            description: message,
            closable: true,
        })
    }

  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{ transform: "translateY(-5px)", shadow: "2xl" }}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w={"full"}
        objectFit={"cover"}
      />

      <Box p={4} bgColor={useColorModeValue("white", "gray.900")}>
        <Heading as={"h3"} size={"md"} mb={2}>
          {product.name}
        </Heading>

        <Text fontWeight={"bold"} fontSize={"xl"} mb={4}>
          ${product.price}
        </Text>

        <HStack>
          <Dialog.Root lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
            <Dialog.Trigger asChild>
              <Pencil color="green" cursor="pointer" />
            </Dialog.Trigger>

            <Portal>
              <Dialog.Backdrop />

              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>Update Product</Dialog.Title>
                  </Dialog.Header>

                  <Dialog.Body>
                    <VStack gap={4}>
                      <Input
                        placeholder="Product Name"
                        value={updatedProduct.name}
                        onChange={e => setUpdatedProduct({...updatedProduct, name : e.target.value})}
                      />

                      <Input
                        placeholder="Price"
                        type='number'
                        value={updatedProduct.price}
                        onChange={e => setUpdatedProduct({...updatedProduct, price : e.target.value})}
                      />

                      <Input
                        placeholder="Image URL"
                        value={updatedProduct.image}
                        onChange={e => setUpdatedProduct({...updatedProduct, image : e.target.value})}
                      />
                    </VStack>
                  </Dialog.Body>

                  <Dialog.Footer>
                    <Dialog.CloseTrigger asChild>
                      <Button variant="outline">Close</Button>
                    </Dialog.CloseTrigger>

                    <Button colorPalette="blue" onClick={() => handleUpdate(product._id, updatedProduct)}>
                        Update
                    </Button>
                  </Dialog.Footer>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
          <Trash color="red" onClick={() => handleDelete(product._id)} />
        </HStack>
      </Box>
    </Box>
  );
}

export default ProductCard
