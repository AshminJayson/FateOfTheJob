import React from "react";
import Chatbox from "./Chatbox";
import { useDisclosure } from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Box,
} from "@chakra-ui/react";

export default function Chatdrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLButtonElement>(null);

  return (
    <>
      <Box position="fixed" bottom="2rem" right="2rem">
        <Button
          colorScheme="blue"
          variant="outline"
          mr={3}
          ref={btnRef}
          onClick={onOpen}
        >
          Open Chat
        </Button>
      </Box>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="lg"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Chat</DrawerHeader>
          <DrawerBody>
            <Chatbox />
          </DrawerBody>
          <DrawerFooter>
            <Button colorScheme="blue" variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
