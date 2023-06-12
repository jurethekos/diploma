import React from 'react'
import { useEffect, useState, useRef } from "react";


export default function Home() {
    
    return ( 
        <div>
            <div class="container-fluid">
                <div class="d-flex justify-content-center">
                    <div class="col-xl-8 col-md-10 col-sm-12 shadow-lg p-4 bg-light rounded">

                        <h2>Welcome to the NFTAPP!</h2>

                        <h5 class="searchinfo">NFTAPP is a cutting-edge project designed for the purpose of fulfilling a diploma thesis. 
                            The project is aimed at creating a robust and scalable solution for the generation and distribution of non-fungible tokens that are used to showcase 
                            students learned skills.</h5>
                        <h5 class="searchinfo">Main goal of this application is providing universities and students a easy to use platform for micro-credentials about their 
                            learned skills. It includes advanced administration platform that enables universities and professors manage permissions and creating Non-Fungible Tokens, 
                            that are later transfered to specific students.</h5>



                    </div>
                </div>
            </div>
        </div>
    )
}