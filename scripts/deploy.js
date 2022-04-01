const { ethers } = require('hardhat');
const { hrtime } = require('process');
require("dotenv").config({ path: "../.env" });
require("@nomiclabs/hardhat-etherscan");

async function main() {
    const verifyContract = await ethers.getContractFactory("Verify");

    //deplpoy contract
    const deployVerifyContract = await verifyContract.deploy();

    await deployVerifyContract.deployed();

    //print the address
    console.log(deployVerifyContract.address);

    console.log("sleeping...");
    //wait for etherscan to notice the deployment
    await sleep(10000);

    //verify contract
    await hre.run("verify:verify", {
        address: deployVerifyContract.address,
        constructorArguments: [],
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//call the main function and catch any errors
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1);
            });
