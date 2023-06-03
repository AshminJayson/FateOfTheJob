'use client';

import { Container } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';


function MyDropzone() {
  const [files, setFiles] = React.useState<File[]>([]);
  const [fileNames, setFileNames] = React.useState<string[]>([]);
  // [
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
    setFiles(acceptedFiles);
    setFileNames(acceptedFiles.map((file) => file.name));
    
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Container {...getRootProps()} bg={'blackAlpha.300'}>
      <input {...getInputProps()}  />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag n drop some files here, or click to select files</p>
      )}
    </Container>
  );
}

export default MyDropzone;
