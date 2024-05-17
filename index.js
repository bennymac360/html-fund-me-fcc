// in nodejs we use the keyword/function "require()" to pull in libraries and packages.

// in font-end java we can't use require, we must use "import" and do something a bit different,
// especially when working with HTML

// FOUND THE FRONT END VERSION OF ethers AND CREATED THE FILE "./ethers-6.7.0.esm.min.js", WHICH IS ethers IN FRONT END
import { ethers } from "./ethers-6.7.0.esm.min.js"
import { abi, contractAddress } from "./constants.js"

// DEFINE CONNECT BUTTON
const connectButton = document.getElementById("connectButton")
connectButton.onclick = connect

// DEFINE FUND BUTTON
const fundButton = document.getElementById("fundButton")
fundButton.onclick = fund

console.log("Starting JS scripts....")
console.log("###########################")
// wrap the script to connect to metamask in an asyn function that must be called to run.
async function connect() {
    if (typeof window.ethereum !== "undefined") {
        try {
            console.log("Metamask extension detected!")
            await window.ethereum.request({
                method: "eth_requestAccounts",
            })
        } catch (error) {
            console.log("error")
        }
        connectButton.innerHTML = "Wallet Connected"
        console.log("Metamask connected")
    } else {
        connectButton.innerHTML = "Please install Metamask"
        console.log(
            "Metamask extension not detected. Please install the Metamask browser extension!"
        )
    }
}

// fund fucntion
async function fund(ethAmount) {
    ethAmount = "1"
    console.log(`Funding with amount ${ethAmount}...`)
    if (typeof window.ethereum !== "undefined") {
        // provider / connection to the block chain
        // signer / wallet / someone with gas
        // contract in which we interact
        // ABI & addresses

        // from the brower window we can obtain the ethereum object,
        // which contains our rpc provider, it then passes that through ethers to be our "provider"
        const provider = new ethers.BrowserProvider(window.ethereum) // the provier is our meta mask
        await provider.send("eth_requestAccounts", [])
        const signer = provider.getSigner(0) // if we are connected with account-1 it will allocate that as our signer.
        const signerAddress = (await signer).getAddress()
        console.log("signerAddress is:")
        console.log(signerAddress)
        console.log("------------")

        console.log("signer is:")
        console.log(signer)
        console.log("------------")
        const contract = new ethers.Contract(
            contractAddress,
            abi,
            signerAddress
        )
        const transactionResponse = await contract.fund({
            value: ethers.parseEther(ethAmount),
        })
    }
}

// withdraw function
