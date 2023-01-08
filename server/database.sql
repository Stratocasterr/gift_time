CREATE DATABASE santa;

CREATE TABLE santa_users(
    id SERIAL PRIMARY KEY,
    user_data JSON,
    user_presents JSON,
    user_messages JSON
);


CREATE TABLE presents(
    id SERIAL PRIMARY KEY,
    present_name VARCHAR(255)
  );



/*
{
    "user_data" : 
    {
        "username": "child1",
        "password": "123",
        "account_type": "Child"
    },

    "user_presents": 
    [
        {
            "id":"1",
            "present_name":"minecraft"
        },
        {
            "id":"2",
            "present_name":"iphone"
        }
       
    ],

    "user_messages":
    [
        {
            "id":"1",
            "subject":"dear santa",
            "text":"blablabla1",
            "date":"01.02.2003",
            "from":"santa"
        },
        {
            "id":"2",
            "subject":"hello",
            "text":"blablabla2",
            "date":"02.12.2003",
            "from":"john"
        }
       
    ]
}

*/