pragma solidity ^0.4.18;

library Utilities {

  function convertStringToBytes32(string source) public pure returns (bytes32 output) {
    bytes memory tempEmptyStringTest = bytes(source);
    if (tempEmptyStringTest.length == 0) {
      return 0x0;
    }

    assembly {
      output := mload(add(source, 32))
    }
  }
}
