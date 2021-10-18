const ChatHistory = [
    {
      type: 'chat',
      payload: {
        senderId: 'user1',
        senderDisplayName: 'Kat Larsson',
        messageId: Math.random().toString(),
        content: 'Hi everyone, I created this awesome group chat for us!',
        createdOn: new Date('2019-04-13T00:00:00.000+08:10'),
        mine: true,
        attached: false,
        status: 'seen',
        type: 'text'
      }
    },
    {
      type: 'chat',
      payload: {
        senderId: 'user2',
        senderDisplayName: 'Robert Tolbert',
        messageId: Math.random().toString(),
        content: 'Nice! This looks great!',
        createdOn: new Date('2019-04-13T00:00:00.000+08:09'),
        mine: false,
        attached: false,
        type: 'text'
      }
    },
    {
      type: 'chat',
      payload: {
        senderId: 'user3',
        senderDisplayName: 'Carole Poland',
        messageId: Math.random().toString(),
        content: "Yeah agree, let's chat here from now on!",
        createdOn: new Date('2019-04-13T00:00:00.000+08:09'),
        mine: false,
        attached: false,
        type: 'text'
      }
    }
  ];

  export default ChatHistory;