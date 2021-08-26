pragma solidity ^0.5.16;
pragma experimental ABIEncoderV2;

contract luxMarketplace {

  uint public liquidTokens = 0;

  struct MarketEntry {
    uint id;
    string token;
    address owner;
    string state;
    string physicalAddress;
    uint typeToken;
    uint price;
    uint changes;
    uint editTime;
  }

  //uint == ID
  mapping (uint => MarketEntry) public marketplace;
  mapping (string => MarketEntry[]) public history;

  constructor () public {
    genesis();
  }


  function genesis() public {

    uint currentTime = now;

    marketplace[liquidTokens] = MarketEntry(0, "Water Token", msg.sender, "OR", "123 Main Street", 1, 99, 0, currentTime);
    liquidTokens++;
  }


  function addToken(string memory name, string memory state, string memory pAddress, uint typeToken, uint price) public {

    uint currentTime = now;

    marketplace[liquidTokens] = MarketEntry(liquidTokens, name, msg.sender, state, pAddress, typeToken, price, 0, currentTime);
    liquidTokens++;

  }

  function updateMarketEntry(uint id, string memory state, string memory pAddress, uint typeToken, uint price) public {

    //make sure msg.sender is owner

    string memory name = marketplace[id].token;

    string memory oldState = marketplace[id].state;
    string memory oldAddress = marketplace[id].physicalAddress;
    uint oldtypeToken = marketplace[id].typeToken;
    uint oldPrice = marketplace[id].price;

    storeOldTokens(id, name, msg.sender, oldState, oldAddress, oldtypeToken, oldPrice);

    storeNewTokens(id, name, msg.sender, state, pAddress, typeToken, price);
  }

  function storeNewTokens(uint id, string memory name, address owner, string memory state, string memory pAddress, uint typeToken, uint price) private {

    uint currentTime = now;
    uint numRevisions = (marketplace[id].changes + 1);

    marketplace[id] = MarketEntry(id, name, owner, state, pAddress, typeToken, price, numRevisions, currentTime);
  }

  function storeOldTokens(uint id, string memory token, address owner, string memory oldState, string memory oldAddress, uint oldTypeToken, uint oldPrice) private {

    MarketEntry memory tokenHistory = MarketEntry(id, token, owner, oldState, oldAddress, oldTypeToken, oldPrice, marketplace[id].changes, marketplace[id].editTime);

    history[token].push(tokenHistory);

  }

  function returnMarketCount (uint id) public view returns (uint) {

    uint editCount = marketplace[id].changes;

    return editCount;
  }


  function returnToken (uint index, string memory name) public view returns (MarketEntry memory) {

    return history[name][index];
  }

}
