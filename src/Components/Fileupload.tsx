'use client';

import { Container, Input,Flex ,Text, FormControl} from "@chakra-ui/react";
import styles from "./page.module.css";
import {useDropzone} from 'react-dropzone'

export default function App(){
    return (
        <>
        <Flex justify='centre' rowGap={3} flexDir={'column'} margin={3}>
            
                <Text textAlign={'center'}>File Upload </Text>
                <p>Upload your files here</p>
                 <Container w={300} h={300} bg={"blackAlpha.300"} justifyItems={'center'} display={'flex'} alignItems={'center'}>
                     <FormControl >
                        <Input
                         type="file"
                         name="file"
                         id="file"
                         variant={'outline'}
                         aspectRatio={1/1}
                         outline={'none'}
                         w='100%'
                         h="100%"
                         opacity={0}
                        />
                     </FormControl>
                 </Container>
            
            
        </Flex>
        
        </>
    )
}