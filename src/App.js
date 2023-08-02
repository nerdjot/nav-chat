import logo from './logo.svg';
import './App.css';
import Data from './Data'

function changeTimeFormat(date) {
  let n = date.toLocaleString([], {
      hour: '2-digit',
      minute: '2-digit'
  });

  return n
}

function ChatsItem({chatData})
{
  let timeObj = new Date(Number(chatData.messages[chatData.messages.length - 1].time));
  return(
    <div>
      <div className ='row'>
        <div className='col-8 text-left '>{chatData.name}</div>
        <div className='col-4 text-right'>{changeTimeFormat(timeObj)}</div>
      </div>
      <div className ='row'>
        <div className='col-8'>{chatData.messages[chatData.messages.length - 1].message}</div>
        <div className='col-4'>unread</div>
      </div>
    </div>
  );
}

function ChatsList({data})
{
  return(
    data.map(dataItem => <ChatsItem id={dataItem.id} chatData={dataItem}></ChatsItem>)
  );
}

function Chats({data})
{
  return (
    <div className="col-4 h-100">
      <div>Chats Navbar</div>
      <ChatsList data={data}></ChatsList>
    </div>
  );
}

function ChatBubble({messageData})
{
  let myMessage = messageData.sender !== 'you';
  return (
    <div className={myMessage?"row justify-content-start":"row justify-content-end"}>
      <div className={"col-5 rounded text-left "+ (myMessage?"justify-content-start bg-light":" text-light justify-content-end bg-primary")}>
        {messageData.message}
      </div>
    </div>
  );
}

function ChatBox({chatData})
{
  return (
    <div className="col-6">
      <div>{chatData.name}</div>
      {chatData.messages.map(messageData => <ChatBubble messageData={messageData}></ChatBubble>)}
    </div>
  );
}

function App() {
  return (
    <div className="App"> 
      <div className="row">
        <Chats data={Data}></Chats>
        <ChatBox chatData={Data[0]}></ChatBox>
      </div>
    </div>
  );
}

export default App;
