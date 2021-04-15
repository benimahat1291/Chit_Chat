import { Avatar, IconButton } from "@material-ui/core";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import styled from "styled-components";
import { auth, db } from "../firebase"
import { useCollection } from "react-firebase-hooks/firestore";
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { useState } from "react";
import firebase from "firebase"
import Message from "./Message";
import getRecipientEmail from "../utils/getRecipientEmail";

const ChatScreen = ({ chat, messages }) => {
    console.log(chat, messages)
    const [user] = useAuthState(auth);
    const [input, setInput] = useState("");
    const router = useRouter();
    const [messagesSnapshot] = useCollection(
        db
            .collection("chats")
            .doc(router.query.id)
            .collection("messages")
            .orderBy("timestamp", "asc")
    );

    const showMessages = () => {
        if (messagesSnapshot) {
            return messagesSnapshot.docs.map((message) => (
                <Message
                    key={message.id}
                    user={message.data().user}
                    message={{
                        ...message.data(),
                        timestamp: message.data().timestamp?.toDate().getTime(),
                    }}
                />
            ));
        } else {
            return JSON.parse(messages).map(message => {
                <Message key={message.id} user={message.user} message={message} />
            });
        }
    }

    const sendMessage = (e) => {
        e.preventDefault();
        //update Last seen
        db.collection("users").doc(user.uid).set({
            lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        }, { merge: true })

        db.collection("chats").doc(router.query.id).collection("messages").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            user: user.email,
            photoURL: user.photoURL,

        })

        setInput("");

        const recipientEmail = getRecipientEmail(chat.users, user)

    }

    return (
        <Container>
            <Header>

                <Avatar />

                <HeaderInfo>
                    <h3>{recipientEmail}</h3>
                    <p>last sceen...</p>
                </HeaderInfo>

                <HeaderIcons>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </HeaderIcons>
            </Header>

            <MessageContainer>
                {showMessages()}
                <EndOfMessage />
            </MessageContainer>

            <InputContainer>
                <InsertEmoticonIcon />
                <ChatInput value={input} onChange={e => setInput(e.target.value)} />
                <button hidden disabled={!input} type="submit" onClick={sendMessage}>Send Message</button>
            </InputContainer>
        </Container>
    )
}

export default ChatScreen;

const Container = styled.div`

`;

const Header = styled.div`
    position: sticky;
    background-color:white;
    z-index: 100;
    top: 0;
    display: flex;
    padding: 11px;
    height: 80px;
    align-items: center;
    border-bottom: 1px solid whitesmoke;
`;

const HeaderInfo = styled.div`
    margin-left: 15px;
    flex: 1;

    h3 {
        margin-bottom: 3px
    }
    p {
        font-size: 14px;
        color: gray;
    }
`;


const HeaderIcons = styled.div`

`;

const MessageContainer = styled.div`
    padding: 30px;
    background-color: #e5ded8;
    min-height: 90vh;
`;

const EndOfMessage = styled.div`

`;

const InputContainer = styled.form`
    display: flex;
    align-items: center;
    padding: 10px;
    position: sticky;
    bottom: 0;
    background-color: white;
    z-index: 100;
`;

const ChatInput = styled.input`
    flex: 1;
    outline: 0;
    border: none;
    border-radius: 10px;
    background-color: whitesmoke;
    padding: 20px;
    margin-left: 15px;
    margin-right: 15px;
`;