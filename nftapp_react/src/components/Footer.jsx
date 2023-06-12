import React from 'react'
import { useEffect, useState, useRef } from "react";


export default function Footer() {
    
    return ( 
        <footer class="site-footer">
            <div class="container text-white">
                <div class="row pt-5 mt-5 text-center">
                    <div class="col-md-12">
                        <div class="border-top pt-3">
                            <p>
                                Copyright © {new Date().getFullYear()} | All rights reserved. Developed by Jure Kos.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    )
}