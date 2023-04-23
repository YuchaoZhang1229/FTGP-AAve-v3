import { Button, Tabs, TextInput } from "flowbite-react";
import ApproveButton from '../components/ApproveButton';
import React, { useState } from "react";

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
                <div className="flex flex-col gap-5 mx-auto">
                    <b className="text-base font-bold">Link Balance:</b>
                    <div className="text-base font-normal overflow-auto">0</div>
                    <b className="text-base font-bold">ALink Balance:</b>
                    <div className="text-base font-normal overflow-auto">0</div>

                    <div className="text-base font-bold">
                        Please type the number of Link you want supply
                    </div>
                    <TextInput
                        type="text"
                        sizing="md"
                        className="w-full" 
                        value={value} onChange={handleInputChange}/>

                    <div className="flex flex-row gap-3 mx-auto">
                        <ApproveButton tokenAddress="0x8a0E31de20651fe58A369fD6f76c21A8FF7f8d42" tokenAmount={value} />
                        <Button onClick={() => supplyLink()} gradientMonochrome="info" className="w-24"> Supply</Button>
                    </div>

                    <div className="text-base font-bold">
                        Please type the number of Link you want withdraw
                    </div>
                    <TextInput
                        id="withdrawLinkAmount"
                        type="text"
                        sizing="md"
                        className="w-full" />
                    <Button onClick={() => withdrawLink()} gradientMonochrome="info" className="w-24 mx-auto"> Withdraw</Button>
                </div>


            </Tabs.Item>

            {/* USDC */}
            <Tabs.Item title="USDC">

                <div className="flex flex-col gap-5">
                    <b className="text-base font-bold">USDC Balance:</b>
                    <div className="text-base font-normal overflow-auto">0</div>
                    <b className="text-base font-bold">AUSDC Balance:</b>
                    <div className="text-base font-normal overflow-auto">0</div>


                    <div className="text-base font-bold">
                        Please type the number of USDC you want supply
                    </div>
                    <TextInput
                        type="text"
                        sizing="md"
                        className="w-full" 
                        value={value} onChange={handleInputChange}/>

                    <div className="flex flex-row gap-3 mx-auto">
                    
                        <ApproveButton tokenAddress="0xda9d4f9b69ac6C22e444eD9aF0CfC043b7a7f53f" tokenAmount={value}/>
                        <Button onClick={() => supplyUSDC()} gradientMonochrome="info" className="w-24"> Supply</Button>
                    </div>

                    <div className="text-base font-bold">
                        Please type the number of USDC you want withdraw
                    </div>
                    <TextInput
                        type="text"
                        sizing="md"
                        className="w-full" />
                    <Button onClick={() => withdrawUSDC()} gradientMonochrome="info" className="w-24 mx-auto"> Withdraw</Button>
                </div>


            </Tabs.Item>
        </Tabs.Group>
    );

}


export default Deposit;