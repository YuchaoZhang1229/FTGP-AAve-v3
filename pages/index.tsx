import { Navbar } from "flowbite-react";
import { Footer } from "flowbite-react";
import { Table } from "flowbite-react";
import { Tabs } from "flowbite-react";
import { Button } from "flowbite-react";
import { TextInput } from "flowbite-react";

// import  IERC20abi  from './../constants/IERC20.json';
// // import  Supplyabi  from './../constants/Supply.json';
// console.log(JSON.parse(IERC20abi));

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

import { ethers } from "ethers";

const contractAddress = "0x244274e5411faE385fF3655DC61D948b13FfC807"
const abi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_addressProvider",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "LINKWallet",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "POOL",
    "outputs": [
      {
        "internalType": "contract IPool",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "allowanceLINKtoPool",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "approveLINKtoPool",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "depositLink",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getBalanceALINK",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getBalanceLINK",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "supplyLiquidityLINK",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdrawLINK",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "withdrawlLiquidity",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
]


import FixedButton from '../components/FixedButton';
import FlashLoan from '../components/FlashLoan';

export default function Home() {
  // address-账户地址 isConnected-是否连接
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({ connector: new InjectedConnector(), })
  const { disconnect } = useDisconnect()


  // if (isConnected)
  // return (
  //   <div>
  //     Connected to {address}
  //     <button onClick={() => disconnect()}>Disconnect</button>
  //     <button onClick={() => connect()}>Connect Wallet</button>
  //   </div>
  // )
  if (isConnected) {
    if (typeof window !== "undefined") {
      getLinkBalance()
      const provider = new ethers.providers.Web3Provider((window as any).ethereum);
      const signer = provider.getSigner(); // 获得签名者
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const LinkWalletBalance = contract.LINKWallet();
      console.log(LinkWalletBalance);
      console.log(document.getElementById('MetamaskAddress')?.innerHTML);
    }
  }

  async function getLinkBalance() {
    if (isConnected) {
      const provider = new ethers.providers.Web3Provider((window as any).ethereum);
      const signer = provider.getSigner(); // 获得签名者
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        const Balance1 = await contract.getBalanceLINK();
        const linkBlance = document.getElementById('linkBlance')
        if (linkBlance) {
          linkBlance.innerHTML = Balance1
        }

        const Balance2 = await contract.getBalanceALINK();
        const alinkBlance = document.getElementById('alinkBlance')
        if (alinkBlance) {
          alinkBlance.innerHTML = Balance2
        }

        const Balance3 = await contract.LINKWallet();
        const linkWalletBalance = document.getElementById('linkWalletBalance')
        if (linkWalletBalance) {
          linkWalletBalance.innerHTML = Balance3
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("Please Connect Metamask")
    }
  }

  async function supplyLink() { // 400行
    if (isConnected) {
      const provider = new ethers.providers.Web3Provider((window as any).ethereum);
      const signer = provider.getSigner(); // 获得签名者
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        const amountInput = document.getElementById('supplyLinkAmount') as HTMLInputElement;
        const linknumbersupply = amountInput.value;
        
        console.log(linknumbersupply);
        await contract.supplyLiquidityLINK(linknumbersupply);
        getLinkBalance()

      } catch (e) {
        console.log(e);
      }
    } else {
      alert("Please Connect Metamask")
    }
  }

  async function withdrawLink() {
    if (isConnected) {
      const provider = new ethers.providers.Web3Provider((window as any).ethereum);
      const signer = provider.getSigner(); // 获得签名者
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        const amountInput = document.getElementById('withdrawLinkAmount') as HTMLInputElement;
        const withdrawLinkAmount = amountInput.value;
        console.log(withdrawLinkAmount);
        await contract.withdrawlLiquidity(withdrawLinkAmount);
        getLinkBalance()

      } catch (e) {
        console.log(e);
      }
    } else {
      alert("Please Connect Metamask")
    }
  }

  async function withdrawLinktoWallet() {
    if (isConnected) {
      const provider = new ethers.providers.Web3Provider((window as any).ethereum);
      const signer = provider.getSigner(); // 获得签名者
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        const amountInput = document.getElementById('withdrawLinktoWalletAmount') as HTMLInputElement;
        const withdrawLinktoWalletAmount = amountInput.value;
   
        console.log(withdrawLinktoWalletAmount);
        await contract.withdrawToWallet(withdrawLinktoWalletAmount);
        getLinkBalance()

      } catch (e) {
        console.log(e);
      }
    } else {
      alert("Please Connect Metamask")
    }
  }



  return (

    <div className='mx-auto h-auto flex flex-col'>
      {/* Navbar */}
      <nav className="className='border-b border-gray-200 py-3 relative z-20 bg-background shadow-[0_0_15px_0_rgb(0,0,0,0.1)]">
        <div className="className='flex items-center lg:px-6 mx-auto max-w-7xl px-14">
          <Navbar fluid={true} rounded={true}>
            <Navbar.Brand href="https://flowbite.com/">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="mr-3 h-6 sm:h-9"
                alt="Flowbite Logo"
              />
              <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                Flowbite
              </span>
            </Navbar.Brand>
            <div className="flex md:order-2">
              <Button>
                Get started
              </Button>
              <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
              <Navbar.Link
                href="/navbars"
                active={true}
              >
                Home
              </Navbar.Link>
              <Navbar.Link href="/navbars">
                About
              </Navbar.Link>
              <Navbar.Link href="/navbars">
                Services
              </Navbar.Link>
              <Navbar.Link href="/navbars">
                Pricing
              </Navbar.Link>
              <Navbar.Link href="/navbars">
                Contact
              </Navbar.Link>
            </Navbar.Collapse>
          </Navbar>
        </div>

      </nav>
      {/* Narvbar */}

      <div className='bg-accents-0 bg-gray-200 h-auto'>
        <main className='w-full max-w-3xl mx-auto py-16 px-12 rounded-lg shadow-lg bg-gray-100 h-auto overflow-auto'>
          {/* AAve */}
          <section className='flex flex-col gap-6'>
            <h1 className='text-5xl font-bold tracking-tight'>Aave</h1>
            <p className='text-base font-normal'>This example shows how to connect a Metamask wallet with a Next.js app and how to deposit asset to Aave using Aave-V3-core.</p>
          </section>

          <Button onClick={() => connect()} gradientMonochrome="info" className="mt-6">Connect MetaMask</Button>


          {/* AAve */}

          <div className='border-t border-accents-2 mt-10'> </div>

          {/* Wallet Balace */}
          <section className="mt-10 flex flex-col gap-5">
            <h1 className=" text-2xl font-bold">Wallet Balance</h1>
            <div className="flex flex-row gap-2">
              <div className="text-base font-bold">MetaMask Address: </div>
              <div className="text-base font-normal" id="walletAddress">
                {address}
                {/* 0x81d332242d04b25805b670674241C315252D708E */}
                </div>
            </div>
            <div className="px-5">
              <Table>
                <Table.Head>
                  <Table.HeadCell>
                    Asset Name
                  </Table.HeadCell>

                  <Table.HeadCell>
                    Balance
                  </Table.HeadCell>
                </Table.Head>

                <Table.Body className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      Link
                    </Table.Cell>
                    <Table.Cell id="linkWalletBalance">
                      0
                    </Table.Cell>
                  </Table.Row>


                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      DAI
                    </Table.Cell>
                    <Table.Cell id="DAIWalletBalance">
                      0
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </div>





          </section>
          {/* Wallet Balance */}

          {/* Contract 1 */}
          <div className="mt-10 flex flex-col gap-5">
            <h1 className=" text-2xl font-bold ">Deposit Asset to Aave</h1>
            <div className="flex flex-row gap-2">
              <span className="text-base font-bold">Contract Address: </span>
              <span className="text-base font-normal overflow-auto" id="DepositAddress">0x244274e5411faE385fF3655DC61D948b13FfC807</span>
            </div>

            <div className="bg-white mx-5 rounded-lg shadow-lg">
              <Tabs.Group className="item-center justify-center" aria-label="Tabs with underline" style="underline">
                {/* Link */}
                <Tabs.Item className="font-bold" active title="Link">
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-5">
                      <div className="basis-2/3 text-base font-bold">Link Balance:</div>
                      <div className="basis-1/3 text-base font-normal overflow-auto" id="linkBlance">0</div>
                    </div>



                    <div className="flex flex-col gap-5">
                      <div className="basis-2/3 text-base font-bold">ALink Balance:</div>
                      <div className="basis-1/3 text-base font-normal overflow-auto" id="alinkBlance">0</div>
                    </div>

                    <div className="text-base font-bold mt-5">
                      Please type the number of Link you want supply 
                    </div>
                    <div className="flex flex-row gap-5">
                      <TextInput
                        id="supplyLinkAmount"
                        type="text"
                        sizing="md"
                        className="basis-2/3"
                      />

                      <Button onClick={() => supplyLink()} gradientMonochrome="info" className="basis-1/3"> Supply</Button>
                    </div>

                    <div className="text-base font-bold">
                      Please type the number of Link you want withdraw
                    </div>
                    <div className="flex flex-row gap-5">

                      <TextInput
                        id="withdrawLinkAmount"
                        type="text"
                        sizing="md"
                        className="basis-2/3"
                      />

                      <Button onClick={() => withdrawLink()} gradientMonochrome="info" className="basis-1/3"> Withdraw</Button>
                    </div>



                    <div className="text-base font-bold">
                      Please type the number of Link you want withdraw to your wallet
                    </div>
                    <div className="flex flex-row gap-5">

                      <TextInput
                        id="withdrawToWallet"
                        type="text"
                        sizing="md"

                        className="basis-2/3"
                      />
                      <Button onClick={() => withdrawLinktoWallet()} gradientMonochrome="info" className="basis-1/3" >Withdraw to MetaMask</Button>
                    </div>
                  </div>


                </Tabs.Item>

                {/* USDC */}
                <Tabs.Item title="USDC">
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-row">
                      <div className="mx-auto">
                        <div className="basis-2/3 text-base font-bold">USDC Balance:</div>
                      </div>
                      <div className="mx-auto">
                        <div className="basis-1/3 text-base font-normal" id="LinkBalace">0</div>
                      </div>

                    </div>

                    <div className="flex flex-row">
                      <div className="mx-auto">
                        <div className="basis-2/3 text-base font-bold">aUSDC Balance:</div>
                      </div>
                      <div className="mx-auto">
                        <div className="basis-1/3 text-base font-normal" id="ALinkBalace">0</div>
                      </div>

                    </div>

                    <div className="text-base font-bold mt-5">
                      Please type the number of USDC you want supply
                    </div>



                    <div className="flex flex-row gap-5">

                      <div className="basis-2/3">
                        <TextInput
                          id="supplyAmountUSDC"
                          type="text"
                          sizing="md"
                        />
                      </div>
                      <Button id="SupplyUSDC" gradientMonochrome="info" className="basis-1/3">Supply</Button>
                    </div>


                    <div className="text-base font-bold">
                      Please type the number of USDC you want withdraw
                    </div>
                    {/* Withdraw */}
                    <div className="flex flex-row gap-5">

                      <div className="basis-2/3">
                        <TextInput
                          id="withdrawAmountUSDC"
                          type="text"
                          sizing="md"
                        />
                      </div>
                      <Button id="SupplyUSDC" gradientMonochrome="info" className="basis-1/3"> Withdraw</Button>

                    </div>

                  </div>


                </Tabs.Item>
              </Tabs.Group>
            </div>

          </div>
          {/* Contract 1 */}

          {/* Contract 2-Flash Loan*/}
          <div className="mt-10 flex flex-col gap-5">
            <h1 className=" text-2xl font-bold ">Flash Loan</h1>
            <div className="flex flex-row gap-2">
              <span className="text-base font-bold">Contract Address: </span>
              <span className="text-base font-normal" id="DepositAddress">0x16</span>
            </div>


          </div>

          <FlashLoan/>
          {/* Contract 2 */}


        </main>

      </div>



      <div className="w-full mt-auto border-t border-gray-200 shadow-lg">
        <Footer container={true} >
          <Footer.Copyright
            href="#"
            by="Group 6"
            year={2023}
          />
          <Footer.LinkGroup>
            <Footer.Link href="#">
              Github
            </Footer.Link>


          </Footer.LinkGroup>
        </Footer>
      </div>


      <FixedButton onClick={()=>getLinkBalance()} />


    </div>
  )
}
