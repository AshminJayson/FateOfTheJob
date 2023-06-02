'use client';

import { Container, Flex, Text, FormControl } from "@chakra-ui/react";
import { useState, ChangeEvent } from "react";

export default function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  return (
    <>
      <Flex justify="center" flexDir="column" margin={3}>
        <Text textAlign="center">File Upload</Text>
        <p>Upload your files here</p>
        <Container
          w={150}
          h={150}
          bg="blackAlpha.600"
          justifyItems="center"
          display="flex"
          alignItems="center"
          rounded="2xl"
          position="relative"
          textColor={'white'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
            style={{
              opacity : 1,
              width: selectedFile ? "20%" : "100%",
              transition: "opacity 0.3s, width 0.3s",
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
          </svg>
          {selectedFile && (
            <Text
              position="absolute"
              left={70}
              fontSize="sm"
              fontWeight="bold"
              color="white"
            >
              {selectedFile.name}
            </Text>
          )}
          <FormControl position="absolute" width="100%" height="100%" opacity={0}>
            <input
              type="file"
              name="file"
              onChange={handleFileChange}
              style={{ width: "100%", height: "100%", cursor: "pointer" }}
            />
          </FormControl>
          
        </Container>
      </Flex>
    </>
  );
}
