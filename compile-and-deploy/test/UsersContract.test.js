const assert = require("assert");
const AssertionError = require("assert").AssertionError;
const Web3 = require("Web3");

const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
const web3 = new Web3(provider);

const {interface,bytecode} = require("../scripts/compile");

let accounts;
let usersContract;

beforeEach(async() =>{
    accounts = await web3.eth.getAccounts();
    usersContract = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode})
        .send({from: accounts[0],gas: "1000000"});
});

describe("The UsersContract",async() =>{
    it("sould deploy", ()=>{
        console.log(usersContract.options.address);
        assert.ok(usersContract.options.address);
    });

    it("should join a user",async()=>{
        let name = "Jorge";
        let surname = "Turrado";
        await usersContract.methods.join(name,surname)
            .send({from: accounts[0],gas: "500000"});
    });

    it("should retrive a user",async()=>{
        let name = "Jorge";
        let surname = "Turrado";
        await usersContract.methods.join(name,surname)
            .send({from: accounts[0],gas: "500000"});

        let user = await usersContract.methods.getUser(accounts[0])
            .call();

            assert.equal(name,user[0]);
            assert.equal(surname,user[1]);
    });

    it("should not allow joining an account twice",async()=>{
        await usersContract.methods.join("Pedro","Lopez")
            .send({from: accounts[1],gas: "500000"});
        
        try {
            await usersContract.methods.join("Ana","Gomez")
            .send({from: accounts[1],gas: "500000"});
            assert.fail("same account can't join twice");
        }
        catch(e){
            if(e instanceof AssertionError){
                assert.fail(e.message);
            }
        }
    });
});
