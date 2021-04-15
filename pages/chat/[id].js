import styled from "styled-components";
import Head from "next/head";
import Sidebar from "../../components/Sidebar";
import ChatScreen from "../../components/ChatScreen";
import {db, auth} from "../../firebase"
import getRecipientEmail from "../../utils/getRecipientEmail";
import { useAuthState } from "react-firebase-hooks/auth";

function Chat({chat, messages}) {
    const [user] = useAuthState(auth);
    return (
        <Container>
            <Head>
                <title>Chat with {getRecipientEmail(chat.users, user)}</title>
            </Head>
            <Sidebar/>
            <ChatContainer>
                <ChatScreen chat={chat} messages={messages}/>
            </ChatContainer>
        </Container>
    )
}

export default Chat;

export async function getServerSideProps(context) {
    const ref = db.collection("chats").doc(context.query.id)
    //prep message on server
    const messageRes = await ref.collection("messages").orderBy("timeStamp", "asc").get();
    const messages = messageRes.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })).map(messages => ({
        ...message,
        timestamp: messages.timestamp.toDate().getTime(),
    }) )

    // prep chats on server
    const chatRes = await ref.get();
    const chat = {
        id: chatRes.id,
        ...chatRes.data(),
    }

    return{
        props: {
            messages: JSON.stringify(messages),
            chat: chat,
        }
    }
}

const Container = styled.div`
    display: flex;
`;

const ChatContainer = styled.div`
    flex: 1;
    overflow: scroll;
    height: 100vh;
    //hide scroll bar
    ::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width:none;
`;