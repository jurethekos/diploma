# Aplikacija diplomske naloge


## Navodila zagona aplikacije

Aplikacija je sestavljena iz dveh delov: spletna aplikacija in pametne pogodbe na verigi blokov Ethereum.
1. Pametni pogodbi Certificate in SSI postavimo na Ethereum. Za to lahko uporabljamo lokalno omrežje aplikacije Ganache (https://trufflesuite.com/ganache/). Ko imamo testno mrežo postavljeno, v repozitoriju uredimo podatke v datoteki truffle-config.js - vpišemo podatke Ganache omrežja ter račun, s katerim bomo postavili pametne pogodbe.
2. Za namestitev pametnih pogodb uporabimo ukaza "truffle compile" in "truffle migrate --reset".
3. Iz aplikacije Ganache preberemo naslova postavljenih pametnih pogodb in ju vpišemo v spremenljivki contractAddress in contractAddress_SSI v datoteki App.js spletne aplikacije.
4. Spletno aplikacijo poženemo z ukazom "npm run start", ta se zažene na naslovu localhost:2023
5. Za uporabo aplikacije v brskalniku namestimo denarnico Metamask, jo povežemo s testno mrežo in v njo vnesemo nekaj testnih računov iz aplikacije Ganache.
