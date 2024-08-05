import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { createChatApi, createUserApi } from '../apis/custom';
import { useParams } from 'react-router-dom';
import { GetMessage, UserResponse } from '../typescript-axios';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

const ChatContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f0f4f8;
`;

const MessagesList = styled.ul`
    list-style: none;
    padding: 5px; /* 패딩을 줄여서 전체 간격을 줄임 */
    width: 100%;
    height: 60%;
    overflow-y: auto;
    background-color: #ffffff;
    margin-bottom: 20px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const MessageItem = styled.li<{ isSender: boolean }>`
    background-color: ${({ isSender }) => (isSender ? '#00509e' : '#87CEFA')};
    color: ${({ isSender }) => (isSender ? 'white' : 'black')};
    padding: 10px;
    margin: 5px 0; /* 위아래 간격을 줄임 */
    border-radius: 8px;
    max-width: 80%;
    width: auto;
    word-wrap: break-word;
    display: inline-block;
    align-self: ${({ isSender }) => (isSender ? 'flex-end' : 'flex-start')};
`;

const SenderName = styled.span`
    font-size: 0.8em; /* 작게 표시 */
    color: #555; /* 색상 설정 */
    margin-bottom: 5px; /* 아래쪽 여백 */
    display: block; /* 블록으로 설정하여 이름과 메시지 사이에 여백을 줌 */
`;

const InputContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 80%;
    max-width: 600px;
`;

const Input = styled.input`
    flex: 1;
    padding: 10px;
    border: 1px solid #cccccc;
    border-radius: 8px 0 0 8px;
    outline: none;
`;

const Button = styled.button`
    padding: 10px 20px;
    border: none;
    background-color: #00509e;
    color: white;
    cursor: pointer;
    border-radius: 0 8px 8px 0;
    transition: background-color 0.3s;

    &:hover {
        background-color: #003366;
    }
`;

interface ChatMessagePayload {
    chatRoomId: number;
    senderId: string;
    content: string;
}

const Chat: React.FC = () => {
    const userApi = createUserApi();
    const chatApi = createChatApi();
    const { chatRoomId } = useParams<{ chatRoomId: string }>();
    const [user, setUser] = useState<UserResponse>();
    const [messageList, setMessageList] = useState<GetMessage[]>([]);
    const [message, setMessage] = useState<string>('');
    const [client, setClient] = useState<Client | null>(null);

    useEffect(() => {
        const loadUser = async () => {
            const userResponse = await userApi.getUser();
            setUser(userResponse.data);
        };

        const loadMessages = async () => {
            if (chatRoomId) {
                const response = await chatApi.getChatMessages(parseInt(chatRoomId));
                setMessageList(response.data.messages || []);
            }
        };

        loadUser();
        loadMessages();

        const stompClient = new Client({
            webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
            onConnect: (frame) => {
                console.log('Connected: ' + frame);
                stompClient.subscribe(`/topic/chat/${chatRoomId}`, (message) => {
                    const newMessage = JSON.parse(message.body);
                    console.log("Received message:", newMessage);
                    setMessageList((prevMessages) => [...prevMessages, newMessage]);
                });
            },
            onStompError: (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
            }
        });

        stompClient.activate();
        setClient(stompClient);

        return () => {
            if (stompClient) {
                stompClient.deactivate();
            }
        };
    }, [chatRoomId]);

    const handleSendMessage = () => {
        if (chatRoomId && message.trim() && client && user && user.userId) {
            const messagePayload: ChatMessagePayload = {
                chatRoomId: parseInt(chatRoomId),
                senderId: user.userId,
                content: message
            };

            console.log('Sending message:', messagePayload);

            client.publish({
                destination: '/app/send',
                body: JSON.stringify(messagePayload)
            });
            setMessage('');
        } else {
            console.error('User or userId is not defined');
        }
    };

    return (
        <ChatContainer>
            {chatRoomId ? (
                <>
                    <h3>Chat Room {chatRoomId}</h3>
                    <MessagesList>
                        {messageList.map((msg, index) => (
                            <MessageItem key={index} isSender={msg.senderId === user?.userId}>
                                {msg.senderId !== user?.userId && (
                                    <SenderName>{msg.senderName}</SenderName>
                                )}
                                {msg.content}
                            </MessageItem>
                        ))}
                    </MessagesList>
                    <InputContainer>
                        <Input
                            type="text"
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                        />
                        <Button onClick={handleSendMessage}>Send</Button>
                    </InputContainer>
                </>
            ) : (
                <p>Loading chat room...</p>
            )}
        </ChatContainer>
    );
};

export default Chat;
