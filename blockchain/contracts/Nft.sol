// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Nft is ERC721Enumerable, Ownable {
    struct NftItem {
        uint256 itemId;
        string description;
    }

    // Optional mapping for token URIs
    mapping(uint256 => string) private _tokenURIs;
    NftItem[] public nftItems;
    uint256 tokenCounter;

    event RequestedNftItem(
        uint256 indexed requestId,
        string description,
        string uri,
        address indexed requester
    );

    constructor(
        address initialOwner
    ) Ownable(initialOwner) ERC721("Nft New", "NFTA") {
        tokenCounter = 0;
    }

    function requestNftItem(
        string memory uri,
        string memory description,
        address owner
    ) public {
        _safeMint(owner, tokenCounter);
        nftItems.push(NftItem(tokenCounter, description));
        setTokenURI(tokenCounter, uri);
        emit RequestedNftItem(tokenCounter, description, uri, owner);
        tokenCounter = tokenCounter + 1;
    }

    function getTokenURI(uint256 itemId) public view returns (string memory) {
        return tokenURI(itemId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        string memory _tokenURI = _tokenURIs[tokenId];
        string memory base = _baseURI();

        // If there is no base URI, return the token URI.
        if (bytes(base).length == 0) {
            return _tokenURI;
        }
        // If both are set, concatenate the baseURI and tokenURI (via abi.encodePacked).
        if (bytes(_tokenURI).length > 0) {
            return string(abi.encodePacked(base, _tokenURI));
        }
        return super.tokenURI(tokenId);
    }

    function setTokenURI(
        uint256 tokenId,
        string memory _tokenURI
    ) internal virtual {
        require(
            ownerOf(tokenId) == msg.sender,
            "ERC721URIStorage: Not Owner of Token"
        );
        _tokenURIs[tokenId] = _tokenURI;
    }
}
