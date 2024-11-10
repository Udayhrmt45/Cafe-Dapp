// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

contract cafe{

    struct Memo{
        string name;
        string message;
        uint timestamp;
        address from;
    }

    Memo[] memos;
    address payable owner;
    constructor(){
        owner = payable(msg.sender);
    }

    function buyItem(string calldata name,string calldata message) external payable {
        require(msg.value>0,"Please pay more than 0 ether");
        owner.transfer(msg.value);
        memos.push(Memo(name,message,block.timestamp,msg.sender));
    }

    function getMemos() public view returns (Memo[] memory){
        return memos;
    }
}