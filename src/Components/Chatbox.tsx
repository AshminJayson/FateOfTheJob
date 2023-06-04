"use client";

import React, { useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import { MessageDirection } from "@chatscope/chat-ui-kit-react/src/types/unions";

export default function Chatbox() {
  const [messages, setMessages] = useState([
    {
      message: "Hello my friend",
      sender: "bot",
      direction: "incoming",
    },
  ]);
  const [typing, setTyping] = useState(false);

  const handleSend = async (incomingmessage: string) => {
    const newmessage = {
      message: incomingmessage,
      sender: "user",
      direction: "outgoing",
    };

    const messageList = [...messages, newmessage];
    setMessages(messageList);
    setTyping(true);
  };

  const gptimage = {
    imagesrc:
      "https://img.uxwing.com/wp-content/themes/uxwing/download/communication-chat-call/chatbot-icon.svg",
  };

  return (
    <>
      <Box w="100%" p={4} h="500px">
        <MainContainer style={{ padding: "10px" }}>
          <ChatContainer>
            <MessageList
              autoScrollToBottomOnMount={false}
              typingIndicator={typing ? <TypingIndicator content={""} /> : null}
            >
              {messages.map((message, i) => {
                return message.direction === "outgoing" ? (
                  <Message
                    key={i}
                    model={{
                      message: message.message,
                      sender: message.sender,
                      direction: message.direction as MessageDirection,
                      position: "single",
                    }}
                  />
                ) : (
                  <>
                    <Avatar src={gptimage.imagesrc} name="John Doe" />
                    <Message
                      key={i}
                      model={{
                        message: message.message,
                        sender: message.sender,
                        direction: message.direction as MessageDirection,
                        position: "single",
                      }}
                    />
                  </>
                );
              })}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </Box>
    </>
  );
}
