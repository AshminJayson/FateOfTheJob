"use client";

import { useCallback, useState } from "react";
import axios from "axios";
import { Box, Button, Flex, Text, useToast } from "@chakra-ui/react";
import { useDropzone, DropzoneOptions, Accept } from "react-dropzone";
import { FaFile } from "react-icons/fa";

function MyDropzone() {
    const [file, setFile] = useState<File | null>(null);
    const [buttonLoading, setButtonLoading] = useState<boolean>(false);
    const [jobRole, setJobRole] = useState<string | null>(null);
    const [canSubmit, setCanSubmit] = useState<boolean>(true);
    const [remainingTime, setRemainingTime] = useState<number>(21);

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
        if (file && canSubmit) {
            const formData = new FormData();
            formData.append("file", file);
            setButtonLoading(true);
            setJobRole(null);
            setCanSubmit(false);
            setTimeout(() => {
                setCanSubmit(true);
            }, 20000);
            setRemainingTime(21);

            const timer = setInterval(() => {
                console.log(remainingTime);
                if (remainingTime <= 0) {
                    clearInterval(timer);
                }
                setRemainingTime((remainingTime) => remainingTime - 1);
            }, 1000);

            axios({
                method: "post",
                url: "http://localhost:8000/api/files",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then((response) => {
                    setButtonLoading(false);
                    // console.log(response.data.message);
                    setJobRole(response.data.message);
                })
                .catch((err) => {
                    setButtonLoading(false);
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
                isLoading={buttonLoading}
                isDisabled={file == null || !canSubmit}
                onClick={uploadFile}
                rightIcon={!canSubmit ? <p>{remainingTime}⏰</p> : <p>✅</p>}
            >
                Submit
            </Button>
        </>
    );
}

export default MyDropzone;
