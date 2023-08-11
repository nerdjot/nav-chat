import logo from './logo.svg';
import './App.css';
import nav_data from './Data'
import { FaCheckDouble } from "react-icons/fa";
import { useState } from "react";

let myUserName = '1';
let messages = nav_data.messages;
let channels = nav_data.channels;
let users = nav_data.users;

const isToday = (someDate) => {
  const today = new Date()
  return someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
}
const isYesterday = (someDate) => {
  const today = new Date()
  return someDate.getDate()+1 == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
}

function getTimeFormat(date)
{
  return date.toLocaleString([], {
    hour: '2-digit',
    minute: '2-digit'});
}

function isSameDate(timestamp1, timestamp2)
{
  let date1 = new Date(Number(timestamp1)*1000);
  let date2 = new Date(Number(timestamp2)*1000);
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function getDateFormat(date)
{
  return date.getDate() + "/" + (Number(date.getMonth())+1) + "/" + String(date.getFullYear()).slice(-2);
}

function getChatDateString(timestamp) {
  let date = new Date(Number(timestamp)*1000);
  if (isToday(date))
  {
    return "Today";
  }
  else if (isYesterday(date))
  {
    return "Yesterday";
  }
  else
  {
    return getDateFormat(date);
  }
}

function getOtherUserName(members)
{
  if (members.length > 2)
  {
     return '';
  }
  let otherUserId = members.find((member) => member!==myUserName);
  return users.find((user)=> user.id === otherUserId).name;
}

function getUser(id)
{
  return users.find((user)=>user.id === id);
}

function getSenderName(message)
{
  return getUser(message.sender).name;
}

function isMyMessage(message)
{
  console.log("is my message: ", message.sender, myUserName);
  return (message.sender === myUserName);
}

function isMessageReadByMe(message)
{
  return (isMyMessage(message)||(message.read_by.find((user) => user === myUserName)));
}

function getMessagesUnreadByMe(channel)
{
  let messagesUnreadByMe = 0;
  let channelMessages = messages[channel.id];
  let numberOfMessages = channelMessages.length;
  for(let i=numberOfMessages; i>0; i--)
  {
    if (isMessageReadByMe(channelMessages[i-1]))
    {
      break;
    }
    else{
      messagesUnreadByMe++;
    }
  }
  return messagesUnreadByMe;
}

function isSentMessageReadByAll(message)
{
  if (isMyMessage(message))
  {
    let messageChannel = getChannel(message.channel);
    return messageChannel?(message.read_by.length === messageChannel.members.length-1):false;
  }
  return false
}

function isLastMessageReadByAll(channel)
{
  let lastMessage = getLastMessage(channel);
  return isSentMessageReadByAll(lastMessage);
}

function UnreadMessages({messages, channel})
{
  let messagesUnreadByMe = getMessagesUnreadByMe(channel);
  let noMessages = messages.length === 0;
  
  return (

    noMessages?<></>:
    messagesUnreadByMe?
    <div style={{height:"25px", width:"25px"}} className='font-weight-bold rounded-circle bg-danger text-light'>{messagesUnreadByMe}</div>:
    <div className={isLastMessageReadByAll(channel)?"text-primary":"text-secondary"}><FaCheckDouble/></div>
  );
}

function getChannel(channelID)
{
  return channels.find((channel) => channelID === channel.id);
}

function isChannelGroup(channel)
{
  return channel.name !== 'na';
}

function getChannelName(channel)
{
  let isChannel = isChannelGroup(channel);
  return isChannel?channel.name:getOtherUserName(channel.members);
}

function getLastMessage(channel)
{
  let channelMessages = messages[channel.id];
  if (channelMessages.length === 0)
  {
    return null;
  }
  return channelMessages[channelMessages.length - 1];
}

function getLastMessageContent(channel)
{
  let lastMessage = getLastMessage(channel);
  let isChannelGroup = channel.name != 'na';
  return lastMessage?((isChannelGroup?getUser(lastMessage.sender).name+': ':'')+lastMessage.content) : '';
}

function getLastMessageTimeString(channel)
{
  let lastMessage = getLastMessage(channel);
  if (lastMessage)
  {
    let date = new Date(Number(lastMessage.timestamp)*1000);
    if (isToday(date))
    {
      return getTimeFormat(date);
    }
    else if (isYesterday(date))
    {
      return "Yesterday";
    }
    else
    {
      return getDateFormat(date);
    }
  }
  return '';  
}

function ChannelsItem({channel, messages, openChat})
{
  return(
    <div onClick={() => openChat(channel)} className="bg-light border rounded">
      <div className ='row justify-content-around'>
        <div className='col-7 text-left '><h5>{getChannelName(channel)}</h5></div>
        <div className='col-4 text-right'>{getLastMessageTimeString(channel)}</div>
      </div>
      <div className ='row justify-content-around'>
        <div className='col-9'>{getLastMessageContent(channel)}</div>
        <UnreadMessages channel={channel} messages={messages} myUserName={myUserName}></UnreadMessages>
      </div>
    </div>
  );
}

function ChannelsList({channels, messages, users, openChat})
{
  return(
    channels.map(channel => <ChannelsItem openChat={openChat} key={channel.id} users={users} channel={channel} messages={messages[channel.id]}></ChannelsItem>)
  );
}

function Channels({channels, messages, users, openChat})
{
  return (
    <div className="col-4 h-100">
      <div><h2>Channels</h2></div>
      {
      <ChannelsList openChat={openChat} channels={channels} messages={messages} users={users}></ChannelsList>
      }
    </div>
  );
}

function ChatDateBubble({message, sameDate})
{
  return (
    <>
    {
      sameDate?<></>:<div className="row justify-content-around"><div style={{height:"30px"}} className='bg-light col-2 rounded text-secondary'>{getChatDateString(message.timestamp)}</div></div>
    }
    </>
  )
}

function MyChatBubble({message})
{
  return (
    <div className={"row justify-content-end"}>
      <div style={{backgroundColor:'darkgreen'}} className={"col-5 rounded text-left text-light justify-content-end"}>
        {message.content}
        <div style={{display:"flex", justifyContent:"flex-end"}}>
        <div className={'text-right'}>{getTimeFormat( new Date(Number(message.timestamp)*1000))}</div>
        <div className={isSentMessageReadByAll(message)?"text-info":"text-muted"}><FaCheckDouble/></div>
        </div>
      </div>
    </div>
  );
}

function OtherChatBubble({message})
{
  return (
    <div className={"row justify-content-start"}>
      <div className={"col-5 rounded text-left justify-content-start bg-light"}>
        {message.content}
        <div className={'text-right text-secondary'}>{getTimeFormat( new Date(Number(message.timestamp)*1000))}</div>
      </div>
    </div>
  );
}

function OtherGroupChatBubble({message, showName})
{
  return (
    <div className={"row justify-content-start "}>
      <div className='col-1'>
        {
          showName?
            <img style={{height:"50px"}} className='rounded-circle bg-danger' src={getUser(message.sender).picture} />:
            <div className='' style={{height:"60px", width:"60px"}}></div>}
        </div>
      <div className={"col-4 rounded text-left justify-content-start bg-light"}>
        {showName?<div><h6>{getSenderName(message)}</h6></div>:<></>}
        {message.content}
        <div className={'text-right text-secondary'}>{getTimeFormat( new Date(Number(message.timestamp)*1000))}</div>
      </div>
    </div>
  );
}


function ChatBox({messages, channel})
{
  let prevDate = '';
  let currDate = '';
  let prevSender = '';
  let currSender = '';
  let sameDate = false;
  let sameSender = false;
  let showNamePic = false;
  let myMessage = false;
  return (
    <div id="chatbox" className="col-8">
      <div><h3>{getChannelName(channel)}</h3></div>
      <div style={{height:"400px", 'overflow-y':"auto", display:"flex", "flex-direction":"column"}}>
        {messages.map((message) => 
        {
          currDate = message.timestamp;
          currSender = message.sender;
          sameDate = isSameDate(prevDate, currDate);
          sameSender = (currSender === prevSender);
          myMessage = isMyMessage(message);
          showNamePic = ( !sameDate || !sameSender) && !isMyMessage(message) && isChannelGroup(channel);
          prevDate = currDate;
          prevSender = currSender;
          return (
            <>
            <ChatDateBubble message={message} sameDate={sameDate}></ChatDateBubble>
            {
              myMessage?
              <MyChatBubble message={message}></MyChatBubble>:
              <>
                {
                  isChannelGroup(channel)?
                  <OtherGroupChatBubble message={message} showName={showNamePic}></OtherGroupChatBubble>:
                  <OtherChatBubble message={message}></OtherChatBubble>
                }
              </>
            }
            </>
          ); 
        }
        )}
      </div>
    </div>
  );
}

function App() {
  const [currentChannelID, setCurrentChanelID] = useState('home');
  function openChat(channel)
  {
    setCurrentChanelID(channel.id);
  }
  return (
    <div style={{}} className="App"> 
      <div className="row">
        <Channels openChat={openChat}  channels={nav_data['channels']} messages={nav_data.messages} users={nav_data.users}></Channels>      
        {(currentChannelID !== 'home')?<ChatBox messages={messages[currentChannelID]} channel={getChannel(currentChannelID)}></ChatBox>:<>Click on a Channel to start a chat!</>}
      </div>
    </div>
  );
}

export default App;
