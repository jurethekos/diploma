// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/utils/Strings.sol";

contract SSI {
    uint256 public numUsers;
    uint256 public geoTolerance;
    uint public nonce = 1; //za generiranje random auth tokena

    mapping(uint256 => address) public usersID; //računi vseh študentov, prof, uni in admin
    mapping(address => bool) public users; //računi vseh študentov, prof, uni in admin

    struct Userdata {
        string accType; //admin, uni, prof, student
        string studentID;
        string name;
        string residentialAddress;
        uint16 day;
        uint16 month;
        uint16 year;
        string university;
        string email;
        uint16 latitude;
        uint16 longitude;
        string authToken;
    }
    mapping(address => Userdata) public address_to_userdata;

    constructor() {
        numUsers = 0;
        address_to_userdata[msg.sender] = Userdata(
            "admin",
            "",
            "NFTAPP Admin",
            "",
            1,
            1,
            1900,
            "",
            "jurac.kos@gmail.com",
            1000,
            1000,
            "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        );
        usersID[numUsers] = msg.sender;
        users[msg.sender] = true;
        numUsers++;
        geoTolerance = 3;
    }

    function userExists(address addr) external view returns (bool) {
        return users[addr];
    }

    function addUser(
        address userAddress,
        string memory accType,
        string memory studentID,
        string memory name,
        string memory residentialAddress,
        uint16 day,
        uint16 month,
        uint16 year,
        string memory university,
        string memory email
    ) external {
        address_to_userdata[userAddress] = Userdata(
            accType,
            studentID,
            name,
            residentialAddress,
            day,
            month,
            year,
            university,
            email,
            1000,
            1000,
            "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        );
        usersID[numUsers] = userAddress;
        users[userAddress] = true;
        numUsers++;
    }

    function editUser(
        string memory email,
        uint16 latitude,
        uint16 longitude
    ) external {
        require(users[msg.sender], "User does not exist");
        Userdata storage userData = address_to_userdata[msg.sender];
        address_to_userdata[msg.sender] = Userdata(
            userData.accType,
            userData.studentID,
            userData.name,
            userData.residentialAddress,
            userData.day,
            userData.month,
            userData.year,
            userData.university,
            email,
            latitude,
            longitude,
            userData.authToken
        );
    }

    function getUserData(
        address userAddr
    )
        external
        view
        returns (
            string memory accType,
            string memory studentID,
            string memory name,
            string memory residentialAddress,
            uint16 day,
            uint16 month,
            uint16 year,
            string memory university,
            string memory email,
            uint16 latitude,
            uint16 longitude
        )
    {
        require(users[userAddr], "User does not exist");
        Userdata storage userData = address_to_userdata[userAddr];
        return (
            userData.accType,
            userData.studentID,
            userData.name,
            userData.residentialAddress,
            userData.day,
            userData.month,
            userData.year,
            userData.university,
            userData.email,
            userData.latitude,
            userData.longitude
        );
    }

    function confirmLogin(
        uint16 latitude,
        uint16 longitude
    ) external view returns (bool) {
        Userdata storage userData = address_to_userdata[msg.sender];
        //first time login
        if (userData.latitude == 1000 || !users[msg.sender]) {
            return true;
        }
        //check if current geolocation is within tolerance
        if (
            (latitude < userData.latitude + geoTolerance &&
                latitude > userData.latitude - geoTolerance) &&
            (longitude < userData.longitude + geoTolerance &&
                longitude > userData.longitude - geoTolerance)
        ) {
            return true;
        } else {
            return false;
        }
    }

    function confirmTransaction(
        string memory _authToken
    ) external view returns (bool) {
        Userdata storage userData = address_to_userdata[msg.sender];
        return
            keccak256(abi.encodePacked(userData.authToken)) ==
            keccak256(abi.encodePacked(_authToken));
    }

    function createAuthToken() external returns (string memory _authToken) {
        require(users[msg.sender], "User does not exist");
        Userdata storage userData = address_to_userdata[msg.sender];

        _authToken = Strings.toString(
            uint(
                keccak256(abi.encodePacked(block.timestamp, msg.sender, nonce))
            ) % 1000000000000000
        );
        nonce++;

        address_to_userdata[msg.sender] = Userdata(
            userData.accType,
            userData.studentID,
            userData.name,
            userData.residentialAddress,
            userData.day,
            userData.month,
            userData.year,
            userData.university,
            userData.email,
            userData.latitude,
            userData.longitude,
            _authToken
        );
    }

    function returnAuthToken()
        external
        view
        returns (string memory _authToken)
    {
        Userdata storage userData = address_to_userdata[msg.sender];
        _authToken = userData.authToken;
    }
}
