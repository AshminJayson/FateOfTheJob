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
import axios from "axios";

const gptimage = {
    imagesrc:
        "https://img.uxwing.com/wp-content/themes/uxwing/download/communication-chat-call/chatbot-icon.svg",
};

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
        await getResponse(newmessage.message);
    };

    async function getResponse(chatmessage: string) {
        const responseGpt = await axios({
            method: "post",
            url: "http://localhost:8082/api/chat",
            data: JSON.stringify({ message: chatmessage }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });

        console.log(responseGpt.data.message);
    }

    return (
        <>
            <Box w="100%" p={4} h="500px">
                <MainContainer style={{ padding: "10px" }}>
                    <ChatContainer>
                        <MessageList
                            autoScrollToBottomOnMount={false}
                            typingIndicator={
                                typing ? <TypingIndicator content={""} /> : null
                            }
                        >
                            {messages.map((message, i) => {
                                return message.direction === "outgoing" ? (
                                    <Message
                                        key={i}
                                        model={{
                                            message: message.message,
                                            sender: message.sender,
                                            direction:
                                                message.direction as MessageDirection,
                                            position: "single",
                                        }}
                                    />
                                ) : (
                                    <>
                                        <Avatar
                                            src={gptimage.imagesrc}
                                            name="John Doe"
                                        />
                                        <Message
                                            key={i}
                                            model={{
                                                message: message.message,
                                                sender: message.sender,
                                                direction:
                                                    message.direction as MessageDirection,
                                                position: "single",
                                            }}
                                        />
                                    </>
                                );
                            })}
                        </MessageList>
                        <MessageInput
                            placeholder="Type message here"
                            onSend={handleSend}
                        />
                    </ChatContainer>
                </MainContainer>
            </Box>
        </>
    );
}
