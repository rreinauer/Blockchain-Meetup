pragma solidity ^0.5.8

contract SignatureList {

  struct Signature {
    string name;
    uint256 key;
    uint256 signature;
    uint256 date;
  }

  Signature[] signatures;

  function createSignature(string memory name, uint256 key, uint256 signature)

}
