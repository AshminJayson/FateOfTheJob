"use client";


import { useCallback, useState } from "react";
import axios from "axios";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useDropzone, DropzoneOptions } from "react-dropzone";
import { FaFile } from "react-icons/fa";

function MyDropzone() {
    const [file, setFile] = useState<File | null>(null);


    const onDrop: DropzoneOptions["onDrop"] = useCallback(
        (acceptedFiles: File[]) => {
            if (acceptedFiles.length > 0) {
                const selectedFile = acceptedFiles[0];
                if (selectedFile.type === "application/pdf") {
                    setFile(selectedFile);
                    const formData = new FormData();
                    formData.append("file", selectedFile);

                    axios({
                        method: "post",
                        url: "http://localhost:8000/api/files",
                        data: formData,
                        headers: { "Content-Type": "multipart/form-data" },
                    });
                }
            }
        },
        []
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: onDrop,
        multiple: false,
        // accept: "application/pdf",
    });

    return (
        <Box
            {...getRootProps()}
            bg="blackAlpha.300"
            m={10}
            w="30rem"
            h="30rem"
            rounded="md"
            border="2px dashed"
            borderColor={isDragActive ? "blue.500" : "gray.300"}
            cursor="pointer"
        >
            <Flex direction="column" align="center" justify="center" h="100%">
                <Box mb={4}>
                    <FaFile size={48} />
                </Box>
                {file ? (
                    <Text>{file.name}</Text>
                ) : (
                    <Text>
                        {isDragActive
                            ? "Drop the PDF file here..."
                            : "Drag and drop a PDF file here, or click to select"}
                    </Text>
                )}
            </Flex>
            <input {...getInputProps()} />
        </Box>
    );
}

export default MyDropzone;
