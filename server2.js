/* ************************************** */
const options2 = {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${accessTokenAzure}` },
    url: "https://graph.microsoft.com/v1.0/me/calendars",
};
const result2 = await axios(options2);
console.log(result2.data.value)
return res.send(result2.data.value)
// [
//     {
//       id: 'AQMkADAwATM3ZmYAZS0wMmIxLTczMwA3LTAwAi0wMAoARgAAA6ff2qnCPwlNlq5XDoFJyvIHAEYg0JrBN7BGju758rMnI5gAAAIBBgAAAEYg0JrBN7BGju758rMnI5gAAAIgqQAAAA==',
//       name: 'My Calendars',
//       classId: '0006f0b7-0000-0000-c000-000000000046',
//       changeKey: 'RiDQmsE3sEaO7vnysycjmAAAAAAmTA=='
//     },
//     {
//       id: 'AQMkADAwATM3ZmYAZS0wMmIxLTczMwA3LTAwAi0wMAoARgAAA6ff2qnCPwlNlq5XDoFJyvIHAEYg0JrBN7BGju758rMnI5gAAAIBBgAAAEYg0JrBN7BGju758rMnI5gAAAIgqwAAAA==',
//       name: 'Other Calendars',
//       classId: '0006f0b8-0000-0000-c000-000000000046',
//       changeKey: 'RiDQmsE3sEaO7vnysycjmAAAAAAmTg=='
//     },]

/* ********************list calendar Group****************** */
const options2 = {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${accessTokenAzure}` },
    url: "https://graph.microsoft.com/v1.0/me/calendarGroups",
};
const result2 = await axios(options2);
console.log(result2.data.value)
return res.send(result2.data.value)
// [
//     {
//       id: 'AQMkADAwATM3ZmYAZS0wMmIxLTczMwA3LTAwAi0wMAoARgAAA6ff2qnCPwlNlq5XDoFJyvIHAEYg0JrBN7BGju758rMnI5gAAAIBBgAAAEYg0JrBN7BGju758rMnI5gAAAIgqQAAAA==',
//       name: 'My Calendars',
//       classId: '0006f0b7-0000-0000-c000-000000000046',
//       changeKey: 'RiDQmsE3sEaO7vnysycjmAAAAAAmTA=='
//     },
//     {
//       id: 'AQMkADAwATM3ZmYAZS0wMmIxLTczMwA3LTAwAi0wMAoARgAAA6ff2qnCPwlNlq5XDoFJyvIHAEYg0JrBN7BGju758rMnI5gAAAIBBgAAAEYg0JrBN7BGju758rMnI5gAAAIgqwAAAA==',
//       name: 'Other Calendars',
//       classId: '0006f0b8-0000-0000-c000-000000000046',
//       changeKey: 'RiDQmsE3sEaO7vnysycjmAAAAAAmTg=='
//     },]
/* ******************calendar******************** */
const data = {
    "name": "Create calendar123456"
}
const options2 = {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'Authorization': `Bearer ${accessTokenAzure}` },
    data: JSON.stringify(data),
    url: "https://graph.microsoft.com/v1.0/me/calendars",
};
const result2 = await axios(options2);
console.log(result2.data)
return res.send(result2.data)
/* {
    '@odata.context': "https://graph.microsoft.com/v1.0/$metadata#users('xdatgd%40gmail.com')/calendars/$entity",
    id: 'AQMkADAwATM3ZmYAZS0wMmIxLTczMwA3LTAwAi0wMAoARgAAA6ff2qnCPwlNlq5XDoFJyvIHAEYg0JrBN7BGju758rMnI5gAAAIBBgAAAEYg0JrBN7BGju758rMnI5gAA-q1O88AAAA=',
    name: 'Create calendar7',
    color: 'auto',
    hexColor: '',
    isDefaultCalendar: false,
    changeKey: 'RiDQmsE3sEaO7vnysycjmAAD+seigg==',
    canShare: true,
    canViewPrivateItems: true,
    canEdit: true,
    allowedOnlineMeetingProviders: [ 'skypeForConsumer' ],
    defaultOnlineMeetingProvider: 'skypeForConsumer',
    isTallyingResponses: false,
    isRemovable: true,
    owner: {
      name: 'Nguyễn Đạt',
      address: 'outlook_27553438A307B184@outlook.com'
    }
  } */
/* *******************Calendar group******************* */
const data = {
    "name": "Calendar group test 2"
}
const options2 = {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'Authorization': `Bearer ${accessTokenAzure}` },
    data: JSON.stringify(data),
    url: "https://graph.microsoft.com/v1.0/me/calendarGroups",
};
const result2 = await axios(options2);
console.log(result2.data)
return res.send(result2.data)

/* ************************************** */
const data = {
    "subject": "My birthday ",
    "body": {
        "contentType": "HTML",
        "content": "what are you doing ?"
    },
    "start": {
        "dateTime": "2021-01-17T15:30:00.0000000",
        "timeZone": "Asia/Bangkok"
    },
    "end": {
        "dateTime": "2021-01-17T16:00:00.0000000",
        "timeZone": "Asia/Bangkok"
    },
    "location": {
        "displayName": "Harry's Bar"
    },
    "attendees": [
        {
            "emailAddress": {
                "address": "xdatgd3@gmail.com",
                "name": "Nguyen Van Dat"
            },
            "type": "required"
        }
    ],
    "allowNewTimeProposals": true,
}
const options2 = {
    method: 'POST',
    headers: { 'Content-type': 'application/json', 'Authorization': `Bearer ${accessTokenAzure}` },
    data: JSON.stringify(data),
    url: "https://graph.microsoft.com/v1.0/me/events",
};
const result2 = await axios(options2);
console.log(result2.data)
return res.send(result2.data)
