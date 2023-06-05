"use client";

import { useCallback, useState } from "react";
import axios from "axios";
import { Box, Button, Flex, Text, useToast } from "@chakra-ui/react";
import { useDropzone, DropzoneOptions, Accept } from "react-dropzone";
import { FaFile } from "react-icons/fa";

function MyDropzone() {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [jobRole, setJobRole] = useState<string | null>(null);

    const toast = useToast();

    const onDrop: DropzoneOptions["onDrop"] = useCallback(
        (acceptedFiles: File[]) => {
            setJobRole(null);
            if (acceptedFiles.length > 0) {
                const selectedFile = acceptedFiles[0];
                if (selectedFile.type === "application/pdf") {
                    setFile(selectedFile);
                }
            }
        },
        []
    );

    const uploadFile = () => {
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            setLoading(true);
            setJobRole(null);

            axios({
                method: "post",
                url: "http://localhost:8000/api/files",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then((response) => {
                    setLoading(false);
                    console.log(response.data.message);
                    setJobRole(response.data.message);
                })
                .catch((err) => {
                    setLoading(false);
                    toast({
                        title: "Error",
                        description: err.message,
                        status: "error",
                        duration: 3000,
                    });
                });
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
                m={8}
                w="28rem"
                h="28rem"
                rounded="md"
                border="2px dashed"
                borderColor={isDragActive ? "blue.500" : "gray.300"}
                cursor="pointer"
            >
                <Flex
                    direction="column"
                    align="center"
                    justify="center"
                    h="100%"
                >
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
            {jobRole && (
                <Text fontWeight="bold" fontSize="1xl" padding="1rem">
                    Suggested Job Role : {jobRole}
                </Text>
            )}
            <Button
                isLoading={loading}
                isDisabled={file == null}
                onClick={uploadFile}
            >
                Submit
            </Button>
        </>
    );
}

export default MyDropzone;
