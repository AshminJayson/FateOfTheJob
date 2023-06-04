'use client';

import React, { useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput } from '@chatscope/chat-ui-kit-react';


export default function Chatbox() {

    const customMessage = {
        message: 'Hello my friend',
        sentTime: 'just now',
        sender: 'Joe',
       

      };
    

    return (
        <>
            <Box  style={{ position:"relative", height: "500px" }}>
                <MainContainer>
                <ChatContainer>       
                <MessageList>
                    <Message model={{
                            message: customMessage.message,
                            sentTime: customMessage.sentTime,
                            sender: customMessage.sender,
                            direction: 'incoming',
                            position: 'single',
                            
                        }} />

                    </MessageList>
                <MessageInput placeholder="Type message here" />        
                </ChatContainer>
            </MainContainer>
            </Box>
        </>
    );
}