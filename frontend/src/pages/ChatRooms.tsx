import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { createChatApi } from '../apis/custom';
import { ChatRoomInfo, ChatRoomsResponse } from '../typescript-axios';
import emptyImg from '../assets/images/NoMessage.png'

const ChatRoomsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f0f4f8;
`;

const Title = styled.h2`
    color: #003366;
    margin-bottom: 20px;
`;

const ChatRoomList = styled.ul`
    list-style: none;
    padding: 0;
`;

const ChatRoomItem = styled.li`
    background-color: #00509e;
    color: white;
    padding: 15px;
    margin: 10px 0;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: background-color 0.3s;

    &:hover {
        background-color: #003366;
    }
`;

const NoChatRooms = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #003366;
    font-size: 20px;
`;

const ChatRooms: React.FC = () => {
    const chatApi = createChatApi();
    const [chatRooms, setChatRooms] = useState<ChatRoomInfo[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadChatRooms = async () => {
            try {
                const response = await chatApi.getUserChatRooms();
                setChatRooms(response.data.chatRooms || []);
            } catch (error) {
                console.error('Failed to load chat rooms:', error);
            }
        };

        loadChatRooms();
    }, []);

    const handleChatRoomClick = (chatRoomId: number) => {
        navigate(`/chat/${chatRoomId}`);
    };

    return (
        <ChatRoomsContainer>
            <Title>Your Chat Rooms</Title>
            {chatRooms.length === 0 ? (
                <img src={emptyImg} alt="no chatRoom Image"/>
                // <NoChatRooms>현재 진행중인 채팅이 없어요. 채팅을 시작해보세요!</NoChatRooms>
            ) : (
                <ChatRoomList>
                    {chatRooms.map(room => (
                        <ChatRoomItem
                        key={room.chatRoomId}
                        onClick={() => {
                            if (room.chatRoomId !== undefined) {
                                handleChatRoomClick(room.chatRoomId);
                            }
                        }}
                    >
                        {room.chatRoomUser} (Last Message: {room.lastChatMsg})
                    </ChatRoomItem>
                    ))}
                </ChatRoomList>
            )}
        </ChatRoomsContainer>
    );
};

export default ChatRooms;
