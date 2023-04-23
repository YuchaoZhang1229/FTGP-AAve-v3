import { Button, Tabs, TextInput } from "flowbite-react";
import ApproveButton from '../components/ApproveButton';
import SupplyButton from '../components/SupplyButton';
import WithdrawButton from '../components/WithdrawButton';
import React, { useState } from "react";
import Balance from '../components/Balance';
interface Props {
    // props type definitions here
}

const Deposit: React.FC<Props> = () => {
    const [value, setValue] = useState('');
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };


    return (
        <Tabs.Group className="item-center justify-center" aria-label="Tabs with underline" style="underline">
            {/* Link */}
            <Tabs.Item title="Link">
                <div className="flex flex-col gap-5 mx-auto px-6 py-5">
                    <b className="text-base font-bold">Link Balance:</b>
                    <Balance tokenAddress="0x8a0E31de20651fe58A369fD6f76c21A8FF7f8d42" decimals={18} />
                    <b className="text-base font-bold">aLink Balance:</b>
                    <Balance tokenAddress="0xD21A6990E47a07574dD6a876f6B5557c990d5867" decimals={18} />
                    <div className="text-base font-bold">
                        Please type the number of Link
                    </div>
                    <TextInput
                        type="text"
                        sizing="md"
                        className="w-full"
                        value={value} onChange={handleInputChange} />

                    <div className="flex flex-row gap-5 mx-auto">
                        <ApproveButton tokenAddress="0x8a0E31de20651fe58A369fD6f76c21A8FF7f8d42" tokenAmount={value} />
                        <SupplyButton tokenAddress="0x8a0E31de20651fe58A369fD6f76c21A8FF7f8d42" tokenAmount={value}
                            decimals={18} />
                        <WithdrawButton tokenAddress="0x8a0E31de20651fe58A369fD6f76c21A8FF7f8d42" tokenAmount={value} decimals={18} />
                    </div>
                </div>
            </Tabs.Item>

            {/* DAI */}
            <Tabs.Item title="DAI">
                <div className="flex flex-col gap-5 mx-auto px-6 py-5">
                    <b className="text-base font-bold">DAI Balance:</b>
                    <Balance tokenAddress="0x68194a729C2450ad26072b3D33ADaCbcef39D574" decimals={18} />
                    <b className="text-base font-bold">aDAI Balance:</b>
                    <Balance tokenAddress="0x67550Df3290415611F6C140c81Cd770Ff1742cb9" decimals={18} />
                    <div className="text-base font-bold">
                        Please type the number of DAI
                    </div>
                    <TextInput
                        type="text"
                        sizing="md"
                        className="w-full"
                        value={value} onChange={handleInputChange} />

                    <div className="flex flex-row gap-5 mx-auto">
                        <ApproveButton tokenAddress="0x68194a729C2450ad26072b3D33ADaCbcef39D574" tokenAmount={value} />
                        <SupplyButton tokenAddress="0x68194a729C2450ad26072b3D33ADaCbcef39D574" tokenAmount={value}
                            decimals={18} />
                        <WithdrawButton tokenAddress="0x68194a729C2450ad26072b3D33ADaCbcef39D574" tokenAmount={value} decimals={18} />
                    </div>
                </div>
            </Tabs.Item>

            {/* USDC */}
            <Tabs.Item title="USDC">
                <div className="flex flex-col gap-5 mx-auto px-6 py-5">
                    <b className="text-base font-bold">USDC Balance:</b>
                    <Balance tokenAddress="0xda9d4f9b69ac6C22e444eD9aF0CfC043b7a7f53f" decimals={6} />
                    <b className="text-base font-bold">aUSDC Balance:</b>
                    <Balance tokenAddress="0x55D45c6649a0Ff74097d66aa6A6ae18a66Bb2fF3" decimals={6} />
                    <div className="text-base font-bold">
                        Please type the number of USDC
                    </div>
                    <TextInput
                        type="text"
                        sizing="md"
                        className="w-full"
                        value={value} onChange={handleInputChange} />

                    <div className="flex flex-row gap-5 mx-auto">
                        <ApproveButton tokenAddress="0xda9d4f9b69ac6C22e444eD9aF0CfC043b7a7f53f" tokenAmount={value} />
                        <SupplyButton tokenAddress="0xda9d4f9b69ac6C22e444eD9aF0CfC043b7a7f53f" tokenAmount={value}
                            decimals={6} />
                        <WithdrawButton tokenAddress="0xda9d4f9b69ac6C22e444eD9aF0CfC043b7a7f53f" tokenAmount={value} decimals={6} />
                    </div>
                </div>
            </Tabs.Item>

            {/* WBTC */}
            <Tabs.Item title="WBTC">
                <div className="flex flex-col gap-5 mx-auto px-6 py-5">
                    <b className="text-base font-bold">WBTC Balance:</b>
                    <Balance tokenAddress="0xf864F011C5A97fD8Da79baEd78ba77b47112935a" decimals={8} />
                    <b className="text-base font-bold">aWBTC Balance:</b>
                    <Balance tokenAddress="0x89B6d1393D1066f88eAfd8BA50cE13307529FC95" decimals={8} />
                    <div className="text-base font-bold">
                        Please type the number of WBTC
                    </div>
                    <TextInput
                        type="text"
                        sizing="md"
                        className="w-full"
                        value={value} onChange={handleInputChange} />

                    <div className="flex flex-row gap-5 mx-auto">
                        <ApproveButton tokenAddress="0xf864F011C5A97fD8Da79baEd78ba77b47112935a" tokenAmount={value} />
                        <SupplyButton tokenAddress="0xf864F011C5A97fD8Da79baEd78ba77b47112935a" tokenAmount={value}
                            decimals={8} />
                        <WithdrawButton tokenAddress="0xf864F011C5A97fD8Da79baEd78ba77b47112935a" tokenAmount={value} decimals={8} />
                    </div>
                </div>
            </Tabs.Item>

            {/* USDT */}
            <Tabs.Item title="USDT">
                <div className="flex flex-col gap-5 mx-auto px-6 py-5">
                    <b className="text-base font-bold">USDT Balance:</b>
                    <Balance tokenAddress="0x0Bd5F04B456ab34a2aB3e9d556Fe5b3A41A0BC8D" decimals={6} />
                    <b className="text-base font-bold">aUSDT Balance:</b>
                    <Balance tokenAddress="0xFbE6E10f1E7B15e2e7904a5ca249a8b6dF8d4309" decimals={6} />
                    <div className="text-base font-bold">
                        Please type the number of USDT
                    </div>
                    <TextInput
                        type="text"
                        sizing="md"
                        className="w-full"
                        value={value} onChange={handleInputChange} />

                    <div className="flex flex-row gap-5 mx-auto">
                        <ApproveButton tokenAddress="0x0Bd5F04B456ab34a2aB3e9d556Fe5b3A41A0BC8D" tokenAmount={value} />
                        <SupplyButton tokenAddress="0x0Bd5F04B456ab34a2aB3e9d556Fe5b3A41A0BC8D" tokenAmount={value}
                            decimals={6} />
                        <WithdrawButton tokenAddress="0x0Bd5F04B456ab34a2aB3e9d556Fe5b3A41A0BC8D" tokenAmount={value} decimals={6} />
                    </div>
                </div>
            </Tabs.Item>

            {/* ERUS */}
            <Tabs.Item title="ERUS">
                <div className="flex flex-col gap-5 mx-auto px-6 py-5">
                    <b className="text-base font-bold">ERUS Balance:</b>
                    <Balance tokenAddress="0xe20cf465a163c395e7Dde1466Cdd1aBe695B4658" decimals={2} />
                    <b className="text-base font-bold">aERUS Balance:</b>
                    <Balance tokenAddress="0x0C4b9F731696bEd1b0834F48A7f24e513dC3CfD7" decimals={2} />
                    <div className="text-base font-bold">
                        Please type the number of ERUS
                    </div>
                    <TextInput
                        type="text"
                        sizing="md"
                        className="w-full"
                        value={value} onChange={handleInputChange} />

                    <div className="flex flex-row gap-5 mx-auto">
                        <ApproveButton tokenAddress="0xe20cf465a163c395e7Dde1466Cdd1aBe695B4658" tokenAmount={value} />
                        <SupplyButton tokenAddress="0xe20cf465a163c395e7Dde1466Cdd1aBe695B4658" tokenAmount={value}
                            decimals={2} />
                        <WithdrawButton tokenAddress="0xe20cf465a163c395e7Dde1466Cdd1aBe695B4658" tokenAmount={value} decimals={2} />
                    </div>
                </div>
            </Tabs.Item>
        </Tabs.Group>
    );

}


export default Deposit;