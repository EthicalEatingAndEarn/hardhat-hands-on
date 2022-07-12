pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract OneTwoThree {
    uint private _counter;
    uint public max;

    event Inc(address indexed);
    event GameOver(address indexed);

    constructor(uint _max) {
        _counter = 0;
        max = _max;
    }

    function inc(uint num) public {
        require(_counter < max, "the game was over. plrease create a new game.");
        require(num <= 3 && num > 0, "you can enter number 1 ~ 3");
        _counter += num;

        // console.log("the counter is %s", _counter);

        if(_counter >= max) {
            console.log("max reached");
            // _counter = 0;

            emit GameOver(msg.sender);

        } else {
            emit Inc(msg.sender);
       }
    }
}