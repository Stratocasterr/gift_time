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
        {
            "0":"minecraft"
            "1":"lego",
            "2":"csgo"
        },


    "user_messages":
        {
            id:"0"
            text:"abcd",
            subject:"xzy",
            sender:"xxx"
        }
            ...
           
        },

*/