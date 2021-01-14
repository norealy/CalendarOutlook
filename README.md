# Outlook calendars tutorials
Outlook calendar cho phép bạn quản lý email và danh bạ, tìm thông tin về người dùng trong tổ chức, sắp xếp thời gian cho công việc, gia đình và các hoạt động cá nhân.

## Luồng Authentication

*Bước 1. Nhận ủy quyền*
![alt](../image/Picture.png)
*Bước 2. Nhận Access token*
![alt](../image/Picture.png)
*Bước 3. Gọi Microsoft Graph bằng accessToken*
![alt](../image/Picture.png)
## Thực hiện tạo lịch với outlook calendars
1. **Đăng ký ứng dụng với Azure AD**
- Truy cập [Azure portal](https://portal.azure.com/)
- >App registrations > New registration
- >Link redirect > save
- >Certificates & secrets > New client secret
2. **Thực hiện authentication**
 Sau khi tạo tài khoản Azure ta cần một số thông tin như sau : `AZURE_SECRET`, `AZURE_ID`, `AZURE_REDIRECT`, `AZURE_STATE`.

**Bước 1.** Thực hiện phượng thức GET đến `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${azureIdAzure}&response_type=code&redirect_uri=${redirectUrlAzure}&response_mode=query&scope=${scopeAzure}&state=${stateAzure}`;
-  Trong đó 
`azureIdAzure` là Client ID của app khi tạo tài khoản Azure.
`response_type` là "code" để nhận được code gửi về.
`redirectUrlAzure` là redirect đăng ký trên Azure.
`scopeAzure` là quyền thực thi app trên tài khoản sử dụng app (Ở đây dùng đến Outlook calendar lên sẽ để là `calendars.readwrite` )
`stateAzure` là một dạng `key` của app và máy chủ ủy quyền tương tác xác thực.

_Sau khi thực hiện chuyển hướng đến máy chủ ủy quyền ta nhận được `code` trên link url `AZURE_REDIRECT`_

**Bước 2.** Sau khi có được `Code` ta thực hiện POST code sang máy chủ khác và xử lý.

**Bước 3.** Thực hiện POST một form-post đến `URL https://login.microsoftonline.com/common/oauth2/v2.0/token` với nội dung data như sau :
```	
const data = {
    client_id: azureIdAzure,
    scope: scopeAzure,
    code: code,
    redirect_uri: redirectUrlAzure,
    grant_type: "authorization_code",
    client_secret: secretAzure,
    response_mode: "form_post"
};
```
Sau khi gửi form-data thành công thì ta nhận được Access Token và một số thông tin nằm trong data gửi về.
**Bước 4.** Có được Access token ta thực hiện gọi đến Microsoft Graph bằng accessToken Bằng cách
```
method: GET.
Authorization : `Bearer ${accessTokenAzure}`,
URL https://graph.microsoft.com/v1.0/me
```

Ngoài ra còn một số url sau:

- https://graph.microsoft.com/v1.0/me/calendarGroups 
Method: `GET` _thì sẽ get all group calendars_
Method: `POST` _thì sẽ tạo ra group calendars_ với data={"name":"Calendar group name"}
```
// [
//     {
//       id: 'AQMkADAwATM3ZmYAZS0wMmIxLTczMwA3LTAwAi0wMAoARgAAA6ff2qnCPwlNlq5XDoFJyvI7BGju758rMnI5gAAAIBBgAAAEYg0JrBN7BGju75=rMnI5gAAAIgqQA',
//       name: 'My Calendars',
//       classId: '0006f0b7-0000-0000',
//       changeKey: 'RiDQmsE3sEaO7vnysycjmAAAAAAm'
//     },
//     {
//       id: 'AQMkADAwATM3ZmYAZS0wMmIxLTczMwA3LTAwAi0wMAoARgAAA6ff2qnCPwlNlq5XDoFJBN7BGju758rMnI5gAAAIBBgAAAEYg0JrBN=ju758rMnI5gAAAIgqwA',
//       name: 'Other Calendars',
//       classId: '0006f0b8-0000',
//       changeKey: 'RiDQmsE3sEaO7vnysycjmAAAAAA'
//     },]
```
- https://graph.microsoft.com/v1.0/me/calendars thực hiện tạo calendars ,phương thức POST 
data = {"name": "Calendar name" }
```
// [
//     {
//       id: 'AQMkADAwATM3ZmYAZS0wMmIxLTczMwA3LTAwAi0wMAoARgAAA6ff2qnCPwlNlq5XDoFJyvI7BGju758rMnI5gAAAIBBgAAAEYg0JrBN7BGju75=rMnI5gAAAIgqQA',
//       name: 'My Calendars',
//       classId: '0006f0b7-0000-0000',
//       changeKey: 'RiDQmsE3sEaO7vnysycjmAAAAAAm'
//     },
//     {
//       id: 'AQMkADAwATM3ZmYAZS0wMmIxLTczMwA3LTAwAi0wMAoARgAAA6ff2qnCPwlNlq5XDoFJBN7BGju758rMnI5gAAAIBBgAAAEYg0JrBN=ju758rMnI5gAAAIgqwA',
//       name: 'Other Calendars',
//       classId: '0006f0b8-0000',
//       changeKey: 'RiDQmsE3sEaO7vnysycjmAAAAAA'
//     },]
```
- https://graph.microsoft.com/v1.0/me/events thực hiện tạo sự kiện hẹn lịch ,phương thức POST 
```
// data post
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
```
```
// Return
  start: { dateTime: '2021-01-17T15:30:00.0000000', timeZone: 'Asia/Bangkok' },
  end: { dateTime: '2021-01-17T16:00:00.0000000', timeZone: 'Asia/Bangkok' },
  location: {
    displayName: "Harry's Bar",
    locationType: 'default',
    uniqueId: "Harry's Bar",
    uniqueIdType: 'private'
  },
  locations: [
    {
      displayName: "Harry's Bar",
      locationType: 'default',
      uniqueId: "Harry's Bar",
      uniqueIdType: 'private'
    }
  ],
  attendees: [ { type: 'required', status: [Object], emailAddress: [Object] } ],
  organizer: {
    emailAddress: {
      name: 'Nguyễn Đạt',
      address: 'outlook_27553438A307B184@outlook.com'
    }
  }
}
```
~ Continue...