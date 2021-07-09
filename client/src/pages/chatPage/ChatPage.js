import React, {useState, useEffect, useRef} from 'react';
import {io} from 'socket.io-client';
import {useProfile} from "../../hooks/profile.hook";
import Message from "../../components/message/Message";
import "./chatPage.css";

const ChatPage = () => {
    const userData = useProfile();
    const scrollRef = useRef();
    const socket = useRef();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        socket.current = io('http://localhost:5001/',{transports: ['websocket']});
        socket.current.on('history', (getMessages) => {
            setMessages(getMessages);
        });
    }, []);

    useEffect(() => {
        socket.current.on('message', (newMessage) => {
            setMessages([...messages, newMessage]);
      });
    }, [messages])

    const handleSubmit = async () => {
        const msg = {
            sender: userData.username,
            avatar: userData.avatar,
            text: newMessage,
            date: Date.now()
        };
        socket.current.emit("sendMessage", msg);
        setNewMessage("");
    };

    const handleKeypress = event => {
        if (event.key === "Enter") {
            handleSubmit();
        }
    };

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    return (
        <React.Fragment>
            <div className="messenger">
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        <div className="chatBoxTop">
                            {messages.map((m, idx) => (
                                <div ref={scrollRef}  key={idx}>
                                    <Message message={m} own={m.sender === userData.username}/>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>



            <form>
                <div className="message-submit">
                    <div className="card-action">
                        <button
                            type="submit"
                            className="modal-action btn waves-effect"
                            onClick={handleSubmit}
                        >
                            Отправить
                        </button>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s6">
                        <i className="material-icons prefix">mode_edit</i>
                        <textarea
                            id="icon_prefix2"
                            className="materialize-textarea"
                            onChange={(event) => setNewMessage(event.target.value)}
                            onKeyPress={handleKeypress}
                            value={newMessage}
                        />
                        <label htmlFor="icon_prefix2">Текст сообщения</label>
                    </div>
                </div>
            </form>
        </React.Fragment>
    )
}

export default ChatPage;
