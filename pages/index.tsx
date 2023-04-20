import { DarkThemeToggle, Dropdown } from "flowbite-react";
import { Navbar } from "flowbite-react";
import { Footer } from "flowbite-react";
import { Table } from "flowbite-react";
import { Tabs } from "flowbite-react";
import { Button } from "flowbite-react";
import { TextInput } from "flowbite-react";
import { Label } from "flowbite-react";
import { useState, useRef } from "react";
import  contractabi  from 'constants/IERC20.json';

console.log(contractabi);

export default function Home() {

  

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
        <main className='w-full max-w-3xl mx-auto py-16 px-12 rounded-lg shadow-lg bg-gray-100 h-auto'>
          {/* AAve */}
          <section className='flex flex-col gap-6'>
            <h1 className='text-5xl font-bold tracking-tight'>Aave</h1>
            <p className='text-base font-normal'>This example shows how to connect a Metamask wallet with a Next.js app and how to deposit asset to Aave using Aave-V3-core.</p>
          </section>
          <Button gradientMonochrome="info" className="mt-6">Connect to MetaMask</Button>
          {/* AAve */}

          <div className='border-t border-accents-2 mt-10'> </div>

          {/* Wallet Balace */}
          <section className="mt-10 flex flex-col gap-5">
            <h1 className=" text-2xl font-bold">Wallet Balance</h1>
            <div className="flex flex-row gap-2">
              <span className="text-base font-bold">MetaMask Address: </span>
              <span className="text-base font-normal" id="MetamaskAddress">0x16</span>
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
                      USDC
                    </Table.Cell>
                    <Table.Cell id="USDCWalletBalance">
                      0
                    </Table.Cell>
                  </Table.Row>


                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      ETH
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
              <span className="text-base font-normal" id="DepositAddress">0x16</span>
            </div>

            <div className="bg-white mx-5 rounded-lg shadow-lg">
              <Tabs.Group className="item-center justify-center" aria-label="Tabs with underline" style="underline">
                {/* Link */}
                <Tabs.Item className="font-bold" active title="Link">
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-row">
                      <div className="mx-auto">
                        <div className="basis-2/3 text-base font-bold">Link Balance:</div>
                      </div>
                      <div className="mx-auto">
                        <div className="basis-1/3 text-base font-normal" id="LinkBalace">0</div>
                      </div>

                    </div>

                    <div className="flex flex-row">
                      <div className="mx-auto">
                        <div className="basis-2/3 text-base font-bold">ALink Balance:</div>
                      </div>
                      <div className="mx-auto">
                        <div className="basis-1/3 text-base font-normal" id="ALinkBalace">0</div>
                      </div>

                    </div>

                    <div className="text-base font-bold mt-5">
                      Please type the number of Link you want supply
                    </div>
                    <div className="flex flex-row gap-5">

                      <div className="basis-2/3">
                        <TextInput
                          id="supplyAmount"
                          type="text"
                          sizing="md"
                        />
                      </div>
                      <Button id="Supply" gradientMonochrome="info" className="basis-1/3"> Supply</Button>
                    </div>

                    <div className="text-base font-bold">
                      Please type the number of Link you want withdraw
                    </div>
                    <div className="flex flex-row gap-5">
                      <div className="basis-2/3">
                        <TextInput
                          id="withdrawAmount"
                          type="text"
                          sizing="md"
                        />
                      </div>
                      <Button id="Supply" gradientMonochrome="info" className="basis-1/3"> Withdraw</Button>
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

          {/* Contract 2 */}
          <div className="mt-10 flex flex-col gap-5">
            <h1 className=" text-2xl font-bold ">Flash Loan</h1>
            <div className="flex flex-row gap-2">
              <span className="text-base font-bold">Contract Address: </span>
              <span className="text-base font-normal" id="DepositAddress">0x16</span>
            </div>


          </div>
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





    </div>
  )
}
