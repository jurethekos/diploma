import React from 'react'
import { useEffect, useState, useRef } from "react";
import NTFInfo from './NFTInfo';

export default function NTFCard({token}) {

    //console.log(token);
    return ( 
        <div class="card margin">
            <div class="card-body">
                <a href={'/nftinfo/' + token.id + '/' + token.title + '/' + token.description + '/' + token.course + '/' + token.day + '/' + token.month + '/' + token.year + '/' + token.university + '/' + token.professor}>
                    <p class="card-text">{token.title}</p>
                </a><br></br>
                    <p class="card-text">{token.course}</p>
                    <p class="card-text">{token.day}. {token.month}. {token.year}</p>
                    <p class="card-text">{token.university}</p>
                    <p class="card-text">{token.professor}</p>
                
            </div>
            
        </div>
    )
}