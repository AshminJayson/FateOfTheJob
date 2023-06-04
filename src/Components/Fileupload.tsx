"use client";

import { useCallback, useState } from "react";
import axios from "axios";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useDropzone, DropzoneOptions, Accept } from "react-dropzone";
import { FaFile } from "react-icons/fa";

function MyDropzone() {
    const [file, setFile] = useState<File | null>(null);
    const [buttonclicked, setButtonclicked] = useState(false);

    const onDrop: DropzoneOptions["onDrop"] = useCallback(
        (acceptedFiles: File[]) => {
            if (acceptedFiles.length > 0) {
                const selectedFile = acceptedFiles[0];
                if (selectedFile.type === "application/pdf") {
                    setFile(selectedFile);
                    
                }
            }
        },
        []
    );

    const uploadFile =  () => {
        if (file){
                    const formData = new FormData();
                    formData.append("file", file);

                    axios({
                        method: "post",
                        url: "http://localhost:8000/api/files",
                        data: formData,
                        headers: { "Content-Type": "multipart/form-data" },
                    }).then((response) => {console.log(response.data);});
                    setButtonclicked(true);
                }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: onDrop,
        multiple: false,
        accept: "application/pdf" as unknown as Accept,
    });

    return (
        <>
        <Box
            {...getRootProps()}
            bg="blackAlpha.300"
            m={10}
            w="28rem"
            h="28rem"
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
        <Button onClick={uploadFile}>Submit</Button>
        </>
    );
}

export default MyDropzone;
