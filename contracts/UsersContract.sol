pragma solidity ^0.4.24;

contract UsersContract {
    
    struct User{
        string name;
        string surName;
    }

    mapping(address => User) private users;
    mapping(address => bool) private joinedUsers;



    function join(string name, string surName) public {
        require(!joinedUsers[msg.sender]);
        User storage user = users[msg.sender];
        user.name = name;
        user.surName = surName;
        joinedUsers[msg.sender] = true;
    }

    function getUser(address addr) public view returns (string,string){
        require(joinedUsers[msg.sender]);
        User memory user = users[addr];
        return (user.name,user.surName);
    }

    function userJoined (address addr) private view returns (bool){
        return joinedUsers[addr];
    }
}