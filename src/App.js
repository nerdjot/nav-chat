import logo from './logo.svg';
import './App.css';
import nav_data from './Data'
import { FaCheckDouble } from "react-icons/fa";

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

function isMyMessage(message)
{
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

function isSentMessageReadByAll(channel)
{
  let channelMessages = messages[channel.id];
  let numberOfMessages = channelMessages.length;
  let lastMessage = getLastMessage(channel);
  return lastMessage?(lastMessage.read_by.length === channel.members.length-1):false;
}

function UnreadMessages({messages, channel})
{
  let messagesUnreadByMe = getMessagesUnreadByMe(channel);
  let noMessages = messages.length === 0;
  
  return (

    noMessages?<></>:
    messagesUnreadByMe?
    <div style={{height:"25px", width:"25px"}} className='font-weight-bold rounded-circle bg-danger text-light'>{messagesUnreadByMe}</div>:
    <div className={isSentMessageReadByAll(channel)?"text-primary":"text-secondary"}><FaCheckDouble/></div>
  );
}

function getChannel(channelID)
{
  return channels.find((channel) => channelID === channel.id);
}

function getChannelName(channel)
{
  let isChannel = channel.name != 'na';
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

function ChannelsItem({channel, messages})
{
  return(
    <div className="bg-light border rounded">
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

function ChannelsList({channels, messages, users})
{
  return(
    channels.map(channel => <ChannelsItem key={channel.id} users={users} channel={channel} messages={messages[channel.id]}></ChannelsItem>)
  );
}

function Channels({channels, messages, users})
{
  return (
    <div className="col-4 h-100">
      <div>Channels Navbar</div>
      {
      <ChannelsList channels={channels} messages={messages} users={users}></ChannelsList>
      }
    </div>
  );
}

function ChatDateBubble({message})
{
  return (
    <div className="row col-12 justify-content-around"><div className='bg-light col-2 rounded text-secondary'>{getChatDateString(message.timestamp)}</div></div>
  )
}

function ChatBubble({message})
{
  let myMessage = isMyMessage(message);
  return (
    <div className={!myMessage?"row justify-content-start":"row justify-content-end"}>
      <div className={"col-5 rounded text-left "+ (!myMessage?"justify-content-start bg-light":" text-light justify-content-end bg-primary")}>
        {message.content}
        <div className={'text-right '+(!myMessage?'text-secondary':'')}>{getTimeFormat( new Date(Number(message.timestamp)*1000))}</div>
      </div>
    </div>
  );
}

function ChatBox({messages, channel})
{
  return (
    <div className="col-8">
      <div><h3>{getChannelName(channel)}</h3></div>
      {messages.map(message => <><ChatDateBubble message={message}></ChatDateBubble><ChatBubble message={message}></ChatBubble></>)}
    </div>
  );
}

function App() {
  let currentChannelId = '1';
  return (
    <div className="App"> 
      <div className="row">
        <Channels channels={nav_data['channels']} messages={nav_data.messages} users={nav_data.users}></Channels>      
        <ChatBox messages={messages[currentChannelId]} channel={getChannel(currentChannelId)}></ChatBox>
      </div>
    </div>
  );
}

export default App;
