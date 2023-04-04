// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract DocumentSharing {
  
  struct UserAccess{
     address user; 
     bool granted; 
  }
  mapping(address=>string[]) private documentUrls;
  mapping(address=>mapping(address=>bool)) private documentOwners;
  mapping(address=>UserAccess[]) private userAccessList;
  mapping(address=>mapping(address=>bool)) private previousAccess;
  event Error(string message);

  function addDocument(address user, string memory url) external {
      documentUrls[user].push(url);
  }

  function grantAccess(address user) external {
    require(user != msg.sender, "You cannot grant access to yourself.");

    documentOwners[msg.sender][user] = true; 
    if(previousAccess[msg.sender][user]){
       for(uint i = 0; i < userAccessList[msg.sender].length; i++){
           if(userAccessList[msg.sender][i].user == user){
                userAccessList[msg.sender][i].granted = true; 
           }
       }
    } else {
        userAccessList[msg.sender].push(UserAccess(user, true));  
        previousAccess[msg.sender][user] = true;  
    }  
  }

  function revokeAccess(address user) public {
    require(user != msg.sender, "You cannot revoke access from yourself.");

    documentOwners[msg.sender][user] = false;
    for(uint i = 0; i < userAccessList[msg.sender].length; i++){
        if(userAccessList[msg.sender][i].user == user){ 
            userAccessList[msg.sender][i].granted = false;  
        }
    }
  }

  function viewDocuments(address _user) external view returns(string[] memory){
      require(_user == msg.sender || documentOwners[_user][msg.sender], "You do not have access to view this user's documents.");
      return documentUrls[_user];
  }

  function getAccessList() public view returns(UserAccess[] memory){
      return userAccessList[msg.sender];
  }
}