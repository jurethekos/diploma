// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Certificate is ERC721, Ownable {
    uint256 public numNFT;
    uint256 public numSeries;
    uint256 public numStudents;

    mapping(uint256 => address) public students; //računi študentov
    mapping(address => bool) public universities; //admin računi univerz
    mapping(address => bool) public professors; //računi profesorjev

    mapping(string => address) public studIdToAddr;

    mapping(address => uint16) public studentTokenNum;
    mapping(address => uint256[]) public studentTokens;
    mapping(address => uint16) public profTokenNum;
    mapping(address => uint256[]) public profTokens;

    struct Metadata {
        uint256 id;
        uint16 day;
        uint16 month;
        uint16 year;
        string title;
        string description;
        string university;
        string professor;
        string course;
        uint256 seriesID;
    }
    mapping(uint256 => Metadata) public id_to_metadata;

    struct Userdata {
        string accType; //admin, uni, prof, student
        string studentID;
        string name;
        string residentialAddress;
        uint16 day;
        uint16 month;
        uint16 year;
        string university;
    }
    mapping(address => Userdata) public address_to_userdata;

    constructor() ERC721("Knowledge Certificate", "KC") {
        //Knowledge Certificate
        numNFT = 1;
        numSeries = 1;
        numStudents = 0;

        address_to_userdata[msg.sender] = Userdata(
            "admin",
            "",
            "NFTAPP Admin",
            "",
            1,
            1,
            1900,
            ""
        );
    }

    function isUniversity(address uniAddress) internal view returns (bool) {
        return universities[uniAddress];
    }

    function isProfessor(address profAddress) internal view returns (bool) {
        return professors[profAddress];
    }

    function addUniversity(
        address newUniAddress,
        string memory uniName
    ) external onlyOwner {
        universities[newUniAddress] = true;
        address_to_userdata[newUniAddress] = Userdata(
            "uni",
            "",
            uniName,
            "",
            1,
            1,
            1900,
            uniName
        );
    }

    function addProfessor(
        address newProfAddress,
        string memory profName
    ) external {
        require(isUniversity(msg.sender), "ONLY UNI");
        string memory uniName = address_to_userdata[msg.sender].name;
        professors[newProfAddress] = true;
        address_to_userdata[newProfAddress] = Userdata(
            "prof",
            "",
            profName,
            "",
            1,
            1,
            1900,
            uniName
        );
    }

    function returnStudentAddress(
        string memory studentID
    ) external view returns (address studentAddress) {
        studentAddress = studIdToAddr[studentID];
    }

    function addStudent(
        //string memory accType,   ---> student
        string memory studentID,
        string memory name,
        string memory residentialAddress,
        uint16 day,
        uint16 month,
        uint16 year,
        string memory university
    ) external {
        require(
            !isUniversity(msg.sender) && !isProfessor(msg.sender),
            "uni/prof can't be student"
        );
        address_to_userdata[msg.sender] = Userdata(
            "student",
            studentID,
            name,
            residentialAddress,
            day,
            month,
            year,
            university
        );
        studIdToAddr[studentID] = msg.sender;
        students[numStudents] = msg.sender;
        numStudents++;
    }

    function getUser(
        address addr
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
            string memory university
        )
    {
        Userdata memory data = address_to_userdata[addr];
        accType = data.accType;
        studentID = data.studentID;
        name = data.name;
        residentialAddress = data.residentialAddress;
        day = data.day;
        month = data.month;
        year = data.year;
        university = data.university;
    }

    function mint(
        uint16 num,
        uint16 day,
        uint16 month,
        uint16 year,
        string memory title,
        string memory description,
        string memory course
    ) external {
        require(isProfessor(msg.sender), "not a professor");
        string memory prof = address_to_userdata[msg.sender].name;
        string memory uni = address_to_userdata[msg.sender].university;
        for (uint256 j = 0; j < num; j++) {
            uint256 id = numNFT;

            id_to_metadata[numNFT] = Metadata(
                id,
                day,
                month,
                year,
                title,
                description,
                uni,
                prof,
                course,
                numSeries
            );
            uint256 tokenID = numNFT;
            _safeMint(msg.sender, tokenID);
            numNFT++;
            profTokens[msg.sender].push(tokenID);
            profTokenNum[msg.sender]++;
        }
        numSeries++;
    }

    function transfer(address studentId, uint256 tokenID) external {
        require(isProfessor(msg.sender), "not a professor");

        _transfer(msg.sender, studentId, tokenID);
        studentTokens[studentId].push(tokenID);
        studentTokenNum[studentId]++;
        for (uint256 i = 0; i <= profTokens[msg.sender].length - 1; i++) {
            if (profTokens[msg.sender][i] == tokenID) {
                profTokens[msg.sender][i] = 0;
                break;
            }
        }
        profTokenNum[msg.sender]--;

        uint256[] memory newTab = new uint256[](
            profTokens[msg.sender].length - 1
        );
        uint256 k = 0;
        for (uint256 i = 0; i <= profTokens[msg.sender].length - 1; i++) {
            if (profTokens[msg.sender][i] != 0) {
                newTab[k] = profTokens[msg.sender][i];
                k++;
            }
        }
        profTokens[msg.sender] = newTab;
    }

    function getTokens(
        address userID
    ) external view returns (Metadata[] memory tokens) {
        uint256[] memory tokenIDs;
        if (studentTokenNum[userID] > 0) {
            tokenIDs = studentTokens[userID];
        } else if (profTokenNum[userID] > 0) {
            tokenIDs = profTokens[userID];
        }
        tokens = new Metadata[](tokenIDs.length);
        for (uint256 i = 0; i < tokenIDs.length; i++) {
            tokens[i] = id_to_metadata[tokenIDs[i]];
        }
    }
}
