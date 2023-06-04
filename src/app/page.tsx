"use client";

import { Flex, Text } from "@chakra-ui/react";
import Fileupload from "../Components/Fileupload";
import Chatbox from "../Components/Chatbox";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <Flex justify="center">
        <Text fontSize="2xl" fontStyle="italic" fontWeight="bold">
          FATE OF THE JOB
        </Text>
      </Flex>
      <Fileupload />
      <Chatbox />
    </main>
  );
}
