'use client';

import { Container, Input,Flex } from "@chakra-ui/react";
import styles from "./page.module.css";

export default function App(){
    return (
        <>
        <Flex justify='centre' rowGap={3} flexDir={'column'} margin={3}>
            
                <h1>File Upload</h1>
                <p>Upload your files here</p>
                 <form action="">
                    <Input
                     type="file" 
                     name="file" 
                     id="file" 
                     variant={'outline'}
                    />
                 </form>
            
            
        </Flex>
        
        </>
    )
}