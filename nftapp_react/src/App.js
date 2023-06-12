import "./App.css";
import contractABI from "./abi.json"
import contractABISSI from "./abissi.json"
import AddUni from './components/AddUni'
import AddProf from './components/AddProf'
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import RegisterStudent from "./components/RegisterStudent";
import HowToUse from "./components/HowToUse";
import Search from "./components/Search";
import MintNFT from "./components/MintNFT";
import MyNFTs from "./components/MyNFTs";
import NFTCard from "./components/NFTCard";
import NFTInfo from "./components/NFTInfo";
import Account from "./components/Account";
import { ethers, BigNumber } from "ethers";
import { useEffect, useState, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import emailjs from 'emailjs-com';
import { JsonRpcProvider } from '@ethersproject/providers';
import { Contract } from '@ethersproject/contracts';

const contractAddress = "0x132139fA122Deb4087A4Ab90827a996CA392095c"; //za vsak truffle migrate --reset je treba address contracta popravit
const contractAddress_SSI = "0x43F285760D9d9fF62de70df89319131DC794d835";


function App() {
    //connect
    const [accounts, setAccount] = useState([]);
    const [mintAmount, setMintAmount] = useState(1);
    const [loggedIn, setLoggedIn] = useState(false);
    const [loggedUser, setLoggedUser] = useState([]);
    const [tokens, setTokens] = useState([]);
    const [retrievedStudAddr, setRetrievedStudAddr] = useState("");
    const [transfering, setTransfering] = useState(false);

    const [searchAddress, setSearchAddress] = useState("");
    const [searchUser, setSearchUser] = useState([]);
    const [searchTokens, setSearchTokens] = useState([]);

    const [userLocation, setUserLocation] = useState(null);
    const [allowedLogin, setAllowedLogin] = useState(false);
    const [userExists, setUserExists] = useState(false);
    const [allowedTransaction, setAllowedTransaction] = useState(false);
    const [addingUni, setAddingUni] = useState(false);
    const [addingProf, setAddingProf] = useState(false);
    const [mintingNFT, setMintingNFT] = useState(false);
    const [transferingNFT, setTransferingNFT] = useState(false);
    const [editingAccount, setEditingAccount] = useState(false);

    const entryAddress = useRef();
    const entryStudID = useRef();
    const entryName = useRef();
    const entryResAddr = useRef();
    const entryDay = useRef();
    const entryMonth = useRef();
    const entryYear = useRef();
    const entryUni = useRef();
    const entryNFTID = useRef();

    const searchID = useRef();

    const entryNum = useRef();
    const entryTitle = useRef();
    const entryDescription = useRef();
    const entrySubject = useRef();
    
    const entryEmail = useRef();
    const entryLatitude = useRef();
    const entryLongitude = useRef();
    const entryAUTH = useRef();
    const [loggedUserSSI, setLoggedUserSSI] = useState([]);

    
    


    async function connectAccount() {
        if (window.ethereum) {
            
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts"
            });
            //console.log(accounts);
            setAccount(accounts);
            
            
        }
    }
    
    async function getTokens() {
        if (window.ethereum && accounts.length > 0) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                contractAddress,
                contractABI,
                signer
            );
            try {
                const response = await contract.getTokens(accounts[0]);
                //console.log("response: ", response[0].toNumber());
                //console.log("tokens: ", response);
                setTokens(response);
            } catch (error) {
                console.log("error: ", error)
            }
        }
    }

    async function getSearchTokens() {
        if (window.ethereum && accounts.length > 0) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                contractAddress,
                contractABI,
                signer
            );
            try {
                const response = await contract.getTokens(searchAddress);

                setSearchTokens(response);
                console.log("search tokens: ", response);
            } catch (error) {
                console.log("error: ", error)
            }
        } else {
            const provider = new JsonRpcProvider('HTTP://koscloud.eu:7545');
            const contract = new Contract(contractAddress, contractABI, provider);
            try {
                const response = await contract.getTokens(searchAddress);

                setSearchTokens(response);
                console.log("search tokens: ", response);
            } catch (error) {
                console.log("error: ", error)
            }
        }
    }

    async function getLoggedUser() {
        if (window.ethereum && accounts.length > 0) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                contractAddress,
                contractABI,
                signer
            );
            try {
                const response = await contract.getUser(accounts[0]);
                setLoggedUser(response);
                console.log("user: ", response.name);
            } catch (error) {
                console.log("error: ", error)
            }
        }
        if (window.ethereum && accounts.length > 0) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                contractAddress_SSI,
                contractABISSI,
                signer
            );
            try {
                const response = await contract.getUserData(accounts[0]);
                setLoggedUserSSI(response);
                entryEmail.current.value = response.email;
                //console.log("SSI - user exists: ", response);
            } catch (error) {
                console.log("error: ", error)
            }
        }
    }

    async function getSearchUser() {
        if (window.ethereum && accounts.length > 0) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                contractAddress_SSI,
                contractABISSI,
                signer
            );
            try {
                const response = await contract.getUserData(searchAddress);
                setSearchUser(response);
                console.log("search user: ", response);
            } catch (error) {
                console.log("error: ", error)
            }
        } else {
            const provider = new JsonRpcProvider('HTTP://192.168.0.236:7545');
            const contract = new Contract(contractAddress_SSI, contractABISSI, provider);
            try {
                const response = await contract.getUserData(searchAddress);
                setSearchUser(response);
                console.log("search user: ", response);
            } catch (error) {
                console.log("error: ", error)
            }
        }
    }

    useEffect(() => {
        getLocation();
        connectAccount();
    }, []);

    useEffect(() => {
        allowLogin();
        //checkUserExists();
        if(accounts.length > 0 && allowedLogin){
            setLoggedIn(true);
            console.log("Logged in as: " + accounts)
            getTokens();
            getLoggedUser();
        } else {
            setLoggedIn(false);
            console.log("Logged out")
        }
    }, [accounts, allowedLogin, userExists]);


    useEffect(() => {
        //console.log(tokens[0]);
    }, [tokens]);

    useEffect(() => {
        console.log(retrievedStudAddr);
        if(transfering && allowedTransaction){
            transferNFT();
        }
    }, [retrievedStudAddr]);

    useEffect(() => {
        console.log(searchAddress);
        getSearchTokens();
        getSearchUser();
        
    }, [searchAddress]);

    useEffect(() => {
        if (addingUni && allowedTransaction){
            addUni();
        } else if (addingProf && allowedTransaction){
            addProf()
        } else if (mintingNFT && allowedTransaction){
            mint()
        } else if (transferingNFT && allowedTransaction){
            //kliče se malo višje
        } else if (editingAccount && allowedTransaction) {
            editUser();
        }
    }, [allowedTransaction]);

    
    async function handleMint(){
        setMintingNFT(true);
        allowTransaction();
    }

    async function mint(){
        if(window.ethereum && accounts.length > 0){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                contractAddress,
                contractABI,
                signer
            );
            try {
                const response = await contract.mint(entryNum.current.value, entryDay.current.value, entryMonth.current.value, entryYear.current.value, entryTitle.current.value, entryDescription.current.value, entrySubject.current.value);
                console.log("response: ", response);
                const response2 = await contract.getTokens(accounts[0]);
                console.log("response2: ", response2);
                alert("Success! New Tokens will be added in a few moments")
            } catch (error) {
                console.log("error: ", error)
            }
        }
        setMintingNFT(false);
        setAllowedTransaction(false);
    }

    async function handleTransferNFT(){
        allowTransaction();
        await setTransfering(true);
        getStudentAddress();

    }

    async function transferNFT(){
        if(window.ethereum && accounts.length > 0){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                contractAddress,
                contractABI,
                signer
            );
            try { 
                await setTransfering(false);
                const response = await contract.transfer(retrievedStudAddr, entryNFTID.current.value);
                console.log("response: ", response);
                alert("Success! Token will be transferred in a few moments")
            } catch (error) {
                console.log("error: ", error)
                alert("Error");
            }
        }
        setAllowedTransaction(false);
    }

    async function getStudentAddress(){
        if(window.ethereum && accounts.length > 0){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                contractAddress,
                contractABI,
                signer
            );
            try {
                const response = await contract.returnStudentAddress(entryStudID.current.value);
                setRetrievedStudAddr(response);
                //alert("Got student address from ID")
            } catch (error) {
                console.log("error: ", error)
                alert("Error retrieving student address");
            }
        }else{
            const provider = new JsonRpcProvider('HTTP://192.168.0.236:7545');
            const contract = new Contract(contractAddress, contractABI, provider);
            try {
                const response = await contract.returnStudentAddress(entryStudID.current.value);
                setRetrievedStudAddr(response);
                //alert("Got student address from ID")
            } catch (error) {
                console.log("error: ", error)
                alert("Error retrieving student address");
            }
        }
    }

    async function getSearchAddress(){
        if(window.ethereum && accounts.length > 0){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            console.log(provider);
            const contract = new ethers.Contract(
                contractAddress,
                contractABI,
                signer
            );
            try {
                const response = await contract.returnStudentAddress(searchID.current.value);
                setSearchAddress(response);
                //alert("Got student address from ID")
            } catch (error) {
                console.log("error: ", error)
                alert("Error retrieving search address");
            }
        } else{
            const provider = new JsonRpcProvider('HTTP://192.168.0.236:7545');
            const contract = new Contract(contractAddress, contractABI, provider);
            try {
                const response = await contract.returnStudentAddress(searchID.current.value);
                setSearchAddress(response);
                //alert("Got student address from ID")
              } catch (error) {
                console.log("error: ", error);
                alert("Error retrieving search address");
              }
        }
    }

    async function handleLogin(){
        connectAccount();
    }

    async function handleLogout(){
        setAccount([]);
        setLoggedUser([]);
        //console.log(accounts);
    }

    async function handleAddUni(){
        setAddingUni(true);
        allowTransaction();
    }

    async function addUni(){
        if(window.ethereum && accounts.length > 0){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                contractAddress,
                contractABI,
                signer
            );
            try {
                const response = await contract.addUniversity(entryAddress.current.value, entryName.current.value);
                console.log("response: ", response);
                
            } catch (error) {
                console.log("error: ", error)
            }
            
        }
        if (window.ethereum && accounts.length > 0) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                contractAddress_SSI,
                contractABISSI,
                signer
            );
            try {
                const response = await contract.addUser(entryAddress.current.value, "uni", "", entryName.current.value, "", 1, 1, 1900, "", entryEmail.current.value);
                console.log("response: ", response);
                alert("Success! New University will be added in a few moments")
            } catch (error) {
                console.log("error: ", error)
            }
        }
        setAddingUni(false);
        setAllowedTransaction(false);
    }

    async function handleAddProf(){
        setAddingProf(true);
        allowTransaction();
    }

    async function addProf(){
        //to naj gre na novo stran
        if(window.ethereum && accounts.length > 0){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                contractAddress,
                contractABI,
                signer
            );
            try {
                const response = await contract.addProfessor(entryAddress.current.value, entryName.current.value);
                console.log("response: ", response);
                
            } catch (error) {
                console.log("error: ", error)
            }
        }
        if (window.ethereum && accounts.length > 0) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                contractAddress_SSI,
                contractABISSI,
                signer
            );
            try {
                const response = await contract.addUser(entryAddress.current.value, "prof", "", entryName.current.value, "", 1, 1, 1900, "", entryEmail.current.value);
                console.log("response: ", response);
                alert("Success! New Professor will be added in a few moments")
            } catch (error) {
                console.log("error: ", error)
            }
        }
        setAddingProf(false);
        setAllowedTransaction(false);
    }

    async function handleRegisterStudent(){
        //to naj gre na novo stran
        if(window.ethereum && accounts.length > 0){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                contractAddress,
                contractABI,
                signer
            );
            try {
                const response = await contract.addStudent(entryStudID.current.value, entryName.current.value, entryResAddr.current.value, 
                    entryDay.current.value, entryMonth.current.value, entryYear.current.value, entryUni.current.value);
                console.log("response: ", response);
                
            } catch (error) {
                console.log("error: ", error)
            }
            handleLogout();
        }
        if (window.ethereum && accounts.length > 0) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                contractAddress_SSI,
                contractABISSI,
                signer
            );
            try {
                const response = await contract.addUser(accounts[0], "student", entryStudID.current.value, entryName.current.value, entryResAddr.current.value, 
                    entryDay.current.value, entryMonth.current.value, entryYear.current.value, entryUni.current.value, entryEmail.current.value);
                alert("Success! You will be able to log into your new account in a few moments.")
            } catch (error) {
                console.log("error: ", error)
            }
        }
    }
    

    async function handleSearch(){
        console.log("searching");
        getSearchAddress();
    }

    function getLocation() {
        const tempZero = 0;
        setUserLocation({ tempZero, tempZero });
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ latitude, longitude });
            console.log("Geolocation: " + latitude + ", " + longitude);
            entryLatitude.current.value = latitude;
            entryLongitude.current.value = longitude;
          });
        } else {
          console.log("Geolocation is not supported by this browser.");
        }
    }

    async function handleEditUser(){
        console.log("handleEditUser");
        setEditingAccount(true);
        allowTransaction();
    }

    async function editUser(){
        console.log("editUser");
        //latitude, longitude from double to int parseInt
        if (window.ethereum && accounts.length > 0) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                contractAddress_SSI,
                contractABISSI,
                signer
            );
            try {
                const response = await contract.editUser(entryEmail.current.value, parseInt(entryLatitude.current.value), parseInt(entryLongitude.current.value));
                console.log(response);
            } catch (error) {
                console.log("error: ", error)
            }
        }
        setEditingAccount(false);
        setAllowedTransaction(false);
    }

    async function handleGetAuthToken(){
        console.log("handleGetAuthToken");
        if (window.ethereum && accounts.length > 0) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                contractAddress_SSI,
                contractABISSI,
                signer
            );
            try {
                const [response1] = await Promise.all([
                    contract.createAuthToken()
                ]);
                const [response2] = await Promise.all([
                    contract.returnAuthToken()
                ]);
                console.log("AUTH token: ", response2);
                const templateParams = {
                    to_name: loggedUserSSI.email,
                    message: response2
                };
            
                emailjs.send('service_eq9cizr', 'template_7qxmcyt', templateParams, 'l6TSRDTgA5fFfmbqR')
                    .then((result) => {
                        console.log(result.text);
                    }, (error) => {
                        console.log(error.text);
                    });
            } catch (error) {
                console.log("error: ", error)
            }
        }
    }

    async function allowLogin(){
        if (window.ethereum && accounts.length > 0) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                contractAddress_SSI,
                contractABISSI,
                signer
            );
            try {
                //console.log("confirmLogin working")
                if(userLocation.latitude == 0 || !userLocation.latitude){
                    alert("Enable Location access to login.");
                } else{
                    const response = await contract.confirmLogin(parseInt(userLocation.latitude), parseInt(userLocation.longitude));
                    //console.log("confirmLogin: " + response)
                    if(!response){
                        alert("Login denied!")
                    }
                    setAllowedLogin(response);
                }
                
            } catch (error) {
                console.log("error: ", error)
            }
        }
    }

    async function allowTransaction(){
        console.log("allowTransaction");
        if (window.ethereum && accounts.length > 0) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                contractAddress_SSI,
                contractABISSI,
                signer
            );
            try {
                const response = await contract.confirmTransaction(entryAUTH.current.value);
                console.log("Transaction allowed ", response);
                setAllowedTransaction(response);
            } catch (error) {
                console.log("error: ", error)
            }
        }
    }

    async function checkUserExists(){
        if (window.ethereum && accounts.length > 0) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                contractAddress_SSI,
                contractABISSI,
                signer
            );
            try {
                const response = await contract.userExists(accounts[0]);
                console.log("User exists", response);
                setUserExists(response);
            } catch (error) {
                console.log("error: ", error)
            }
        }
    }

    return ( 
        <div className="App">
            <Navbar loggedIn={loggedIn} loggedUser={loggedUser} handleLogin={handleLogin} handleLogout={handleLogout} handleRegisterStudent={handleRegisterStudent} />

            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/registerstudent' element={<RegisterStudent entryStudID={entryStudID} entryName={entryName} entryResAddr={entryResAddr} entryDay={entryDay} entryMonth={entryMonth} 
                    entryYear={entryYear} entryUni={entryUni} handleRegisterStudent={handleRegisterStudent} entryEmail={entryEmail} />} />
                <Route path='/howtouse' element={<HowToUse />} />
                <Route path='/search' element={<Search searchID={searchID} handleSearch={handleSearch} searchUser={searchUser} searchTokens={searchTokens} />} />
                <Route path='/search/:studId' element={<Search searchID={searchID} handleSearch={handleSearch} searchUser={searchUser} searchTokens={searchTokens} />} />
                <Route path='/adduni' element={<AddUni loggedIn={loggedIn} loggedUser={loggedUser} entryAddress={entryAddress} entryName={entryName} entryEmail={entryEmail} entryAUTH={entryAUTH} handleAddUni={handleAddUni} />} />
                <Route path='/addprof' element={<AddProf loggedIn={loggedIn} loggedUser={loggedUser} entryAddress={entryAddress} entryName={entryName} entryEmail={entryEmail} entryAUTH={entryAUTH} handleAddProf={handleAddProf} />} />
                <Route path='/mint' element={<MintNFT loggedIn={loggedIn} loggedUser={loggedUser} handleMint={handleMint} entryNum={entryNum} entryDay={entryDay} entryMonth={entryMonth} entryYear={entryYear} entryTitle={entryTitle} entryDescription={entryDescription} entrySubject={entrySubject} entryAUTH={entryAUTH} />} />
                <Route path='/mynfts' element={<MyNFTs tokens={tokens} loggedUser={loggedUser} />} />
                <Route path='/account' element={<Account entryEmail={entryEmail} entryLatitude={entryLatitude} entryLongitude={entryLongitude} entryAUTH={entryAUTH} handleEditUser={handleEditUser} handleGetAuthToken={handleGetAuthToken} />} />
                <Route path='/nftinfo/:id/:title/:description/:course/:day/:month/:year/:university/:professor' element={<NFTInfo tokens={tokens} loggedUser={loggedUser} entryStudID={entryStudID} handleTransferNFT={handleTransferNFT} entryNFTID={entryNFTID} entryAUTH={entryAUTH} />} />
            </Routes>


            <Footer />
        </div>
        
    )
}

export default App;