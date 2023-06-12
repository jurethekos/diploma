import React from 'react'
import { useEffect, useState, useRef } from "react";
import NTFCard from './NFTCard';



export default function MyNFTs({tokens, loggedUser}) {
    
    const shareLinkRef = useRef(null);
    const [copySuccess, setCopySuccess] = useState("");

    const copyTextFunction = () => {
        navigator.clipboard.writeText(shareLinkRef.current.value).then(
        () => setCopySuccess("Copied!"),
        () => setCopySuccess("Copy failed.")
        );
    };

    return ( 
        <div>
            <div class="container-fluid">
                <div class="d-flex justify-content-center">
                    <div class="col-xl-8 col-md-10 col-sm-12 shadow-lg p-4 bg-light rounded">

                        <h2>My NFTs</h2>

                        { loggedUser.accType == "student" && (
                            <div>
                                <div class="inputs form-group col-md-4">
                                    <label for="shareLink">Share your skill portfolio via link!</label>
                                    <input class="form-control"  type="text" id="shareLink" ref={shareLinkRef} defaultValue={'http://localhost:2023/search/' + loggedUser.studentID}></input>
                                    <button type="button" class="btn btn-success" onClick={copyTextFunction}>Copy</button>
                                    {copySuccess && <div>{copySuccess}</div>}
                                </div>
                            </div>
                        )}
                        <br></br>

                        <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-3 row-cols-xxl-4">
                            {tokens?.length > 0 ? 
                            (tokens.map((token) => (<NTFCard token={token} />))) : 
                            (<div>
                                <p>No tokens</p>
                            </div>)}

                        </div>


                    </div>
                </div>
            </div>
        </div>
    )

}

