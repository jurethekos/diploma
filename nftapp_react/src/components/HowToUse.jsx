import React from 'react'
import { useEffect, useState, useRef } from "react";


export default function HowToUse() {
    
    return ( 
        <div>
            <div class="container-fluid">
                <div class="d-flex justify-content-center">
                    <div class="col-xl-8 col-md-10 col-sm-12 shadow-lg p-4 bg-light rounded">

                        <h2>NFTAPP TUTORIAL</h2>

                        <h6>This is a tutorial to get you comfortable using NFTAPP. App functions using Metamask. 
                            Here is the data for Ethereum testnet and private keys for testing functionality using multiple accounts with different roles.</h6>
                        <br></br>

                        <h5>Student ID</h5>
                        <h6>ID: 420 (used in "Search students" tab)</h6>
                        <br></br>

                        <h5>Metamask network settings</h5>
                        <h6>URL: HTTP://koscloud.eu:7545</h6>
                        <h6>Chain ID: 5777</h6>
                        <br></br>

                        <h5>Admin account</h5>
                        <h6>Public key: 0x60090E5F0D095e000c5756B24c35515af5BaF529</h6>
                        <h6>Private key: 6a0875231ff356486323416461013fbfccfe952a1a76d2289f14aeb0d512fe6c</h6>
                        <br></br>

                        <h5>University account</h5>
                        <h6>Public key: 0xac2baFB4Bf3863Fd56Ac0Da8BB1D37954f3c92E3</h6>
                        <h6>Private key: b0f11b4bdf5f339896ca6f258e3916bd812a681bfca639cbc6dca239aa86c7e1</h6>
                        <br></br>

                        <h5>Professor account</h5>
                        <h6>Public key: 0x98AB104E64d8F2afA19f81803104527E9094C65c</h6>
                        <h6>Private key: 9da33a90b2a3324f001b3649ac7b3783454d13ce47eab865551993bc651f69e3</h6>
                        <br></br>

                        <h5>Student account</h5>
                        <h6>Public key: 0x99985BFbD69119808887e9521396121174f0050d</h6>
                        <h6>Private key: 777bd411908e5955fedab098a6a2ae2197e5b46e4a4bb53525ae6ff0da25ce25</h6>
                        <br></br>


                    </div>
                </div>
            </div>
        </div>
    )
}