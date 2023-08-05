let Data = [
  {
    'id': '1',
    'name': 'Swapnil More',
    'image': 'url',
    'messages': [
      {
        'sender':'you',
        'time': '1690999511',
        'message': 'Hey',
        'read': 'read'
      },
      {
        'sender':'them',
        'time': '1690999520',
        'message': 'Hey',
        'read': 'read'
      },
      {
        'sender':'you',
        'time': '1690999600',
        'message': 'Supports Unix timestamps in seconds, milliseconds, microseconds and nanoseconds.',
        'read': 'read'
      },
      {
        'sender':'them',
        'time': '1690999711',
        'message': 'Auto-layout for flexbox grid columns also means you can set the width of one column and have the sibling columns automatically resize around it. You may use predefined grid classes (as shown below), grid mixins, or inline widths. Note that the other columns will resize no matter the width of the center column.',
        'read': 'read'
      },
      {
        'sender':'you',
        'time': '1691000511',
        'message': 'Okay Bye',
        'read': 'received'
      },
    ]
  },
  { 
    'id': '2',
    'name': 'Samantha Ruthprabhu',
    'image': 'url',
    'messages': [
      {
        'sender':'you',
        'time': '1690999511',
        'message': 'Hey'
      },
      {
        'sender':'them',
        'time': '1690999520',
        'message': 'Hey'
      },
      {
        'sender':'you',
        'time': '1690999600',
        'message': 'Supports Unix timestamps in seconds, milliseconds, microseconds and nanoseconds.'
      },
      {
        'sender':'them',
        'time': '1690999711',
        'message': 'Auto-layout for flexbox grid columns also means you can set the width of one column and have the sibling columns automatically resize around it. You may use predefined grid classes (as shown below), grid mixins, or inline widths. Note that the other columns will resize no matter the width of the center column.'
      },
      {
        'sender':'you',
        'time': '1691000511',
        'message': 'Okay Bye'
      },
    ]
  },
  {
    'id': '3',
    'name': 'Aalu Arjun',
    'image': 'url',
    'messages': [
      {
        'sender':'you',
        'time': '1690999511',
        'message': 'Hey'
      },
      {
        'sender':'them',
        'time': '1690999520',
        'message': 'Hey'
      },
      {
        'sender':'you',
        'time': '1690999600',
        'message': 'Supports Unix timestamps in seconds, milliseconds, microseconds and nanoseconds.'
      },
      {
        'sender':'them',
        'time': '1690999711',
        'message': 'Auto-layout for flexbox grid columns also means you can set the width of one column and have the sibling columns automatically resize around it. You may use predefined grid classes (as shown below), grid mixins, or inline widths. Note that the other columns will resize no matter the width of the center column.'
      },
      {
        'sender':'you',
        'time': '1691000511',
        'message': 'Okay Bye'
      },
    ]
  }
]

let users = [
  {
    id: '1',
    name: 'Navjot Singh',
    email: 'navjot@gmail.com',
    picture: 'abc.jpeg',
    channels: ['1', '2', '3']
  },
  {
    id: '2',
    name: 'Swapnil More',
    email: 'swapnil@gmail.com',
    picture: 'abc.jpeg',
    channels: ['1', '3']
  },
  {
    id: '3',
    name: 'Raavi',
    email: 'raavi@gmail.com',
    picture: 'abc.jpeg',
    channels: ['2', '3']
  }
]

let channels = [
  {
    id: '1',
    name: 'na',
    description: 'na',
    creator_id: 'na',
    members: ['1', '2']
  },
  {
    id: '2',
    name: 'na',
    description: 'na',
    creator_id: 'na',
    members: ['1', '3']
  },
  {
    id: '3',
    name: 'Friends',
    description: 'Friends description',
    creator_id: '1',
    members: ['1', '2', '3']
  }
]

let messages = 
  {
    '1': //channel id
    [
      {
        id: '1',
        sender: '1',
        content: 'Hey',
        timestamp: '1690999511',
        read_by:
        [
          '2'
        ]
      },
      {
        id: '2',
        sender: '2',
        content: 'Heyloo',
        timestamp: '1691099511',
        read_by:
        [
          '1'
        ]
      },
      {
        id: '3',
        sender: '2',
        content: 'Wassuppp',
        timestamp: '1691399511',
        read_by:
        [
          '1'
        ]
      },
      {
        id: '4',
        sender: '1',
        content: 'Nm man sup widya',
        timestamp: '1691699511',
        read_by:
        [
          '2'
        ]
      },
      {
        id: '5',
        sender: '2',
        content: 'Nm man sup widya NAVVVVV',
        timestamp: '1691176455',
        read_by:
        [
        ]
      }
    ],

    '2':[
      {
        id: '11',
        sender: '1',
        content: 'Hey',
        timestamp: '1690999511',
        read_by:
        [
        ]
      },
    ],

    '3': //channel id
    [
      {
        id: '6',
        sender: '1',
        content: 'Hey',
        timestamp: '1690999511',
        read_by:
        [
          '2', '3'
        ]
      },
      {
        id: '7',
        sender: '2',
        content: 'Heyloo',
        timestamp: '1691099511',
        read_by:
        [
          '1', '3'
        ]
      },
      {
        id: '8',
        sender: '3',
        content: 'Wassuppp',
        timestamp: '1691399511',
        read_by:
        [
          '1', '2'
        ]
      },
      {
        id: '9',
        sender: '2',
        content: 'Nm man sup widya',
        timestamp: '1691699511',
        read_by:
        [
          '3'
        ]
      },
      {
        id: '10',
        sender: '3',
        content: 'Nm man sup widya',
        timestamp: '1691091139',
        read_by:
        [
          '2'
        ]
      }
    ]
  }


let nav_data = {
  'users':  users,
  'channels': channels,
  'messages': messages
}

export default nav_data;