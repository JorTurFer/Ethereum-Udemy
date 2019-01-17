pragma solidity ^0.4.24;

contract UsersContract {
    
    struct User{
        string name;
        string surname;
    }

    mapping(address => User) private users;

    function join(string name, string surname) public{
        User storage user = users[msg.sender];
        user.name = name;
        user.surname = surname;
    }

    function getUser(address addr) public view returns (string,string){
        User memory user = users[addr];
        return (user.name,user.surname);
    }

}