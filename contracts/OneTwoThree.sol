pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract OneTwoThree {
    uint private _counter;
    uint public max;

    event Inc(address);
    event GameOver(address);

    constructor(uint _max) {
        _counter = 0;
        max = _max;
    }

    function inc(uint num) public {
        // require(_counter < max, "the game was over. create new game");
        require(num <= 3, "you can enter number 3 or less.");
        _counter += num;

        // console.log("the counter is %s", _counter);

        if(_counter >= max) {
            console.log("max reached");
            _counter = 0;

            emit GameOver(msg.sender);

        } else {
            emit Inc(msg.sender);
       }
    }
}