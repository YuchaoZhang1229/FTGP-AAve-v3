import { ethers } from "ethers";
import { Button, TextInput } from "flowbite-react";
import React, { useState } from "react";
interface Props {
  // props type definitions here

}

// token address
const wethAddress = '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6';
const daiAddress = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984';

const usdcAddress = '0x07865c6E87B9F70255377e024ace6630C1Eaa37F';

// deployed contract address
const quoterAddress = '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6';
const uniRouterAddress = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'
const sushiRouterAddress = '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506'

// Infura
const INFURA_URL = "https://goerli.infura.io/v3/d6b6084b847840e4970c563e569200d4";

const QuoterABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_factory",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_WETH9",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "WETH9",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "factory",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes",
        "name": "path",
        "type": "bytes"
      },
      {
        "internalType": "uint256",
        "name": "amountIn",
        "type": "uint256"
      }
    ],
    "name": "quoteExactInput",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amountOut",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "tokenIn",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "tokenOut",
        "type": "address"
      },
      {
        "internalType": "uint24",
        "name": "fee",
        "type": "uint24"
      },
      {
        "internalType": "uint256",
        "name": "amountIn",
        "type": "uint256"
      },
      {
        "internalType": "uint160",
        "name": "sqrtPriceLimitX96",
        "type": "uint160"
      }
    ],
    "name": "quoteExactInputSingle",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amountOut",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes",
        "name": "path",
        "type": "bytes"
      },
      {
        "internalType": "uint256",
        "name": "amountOut",
        "type": "uint256"
      }
    ],
    "name": "quoteExactOutput",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amountIn",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "tokenIn",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "tokenOut",
        "type": "address"
      },
      {
        "internalType": "uint24",
        "name": "fee",
        "type": "uint24"
      },
      {
        "internalType": "uint256",
        "name": "amountOut",
        "type": "uint256"
      },
      {
        "internalType": "uint160",
        "name": "sqrtPriceLimitX96",
        "type": "uint160"
      }
    ],
    "name": "quoteExactOutputSingle",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amountIn",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "int256",
        "name": "amount0Delta",
        "type": "int256"
      },
      {
        "internalType": "int256",
        "name": "amount1Delta",
        "type": "int256"
      },
      {
        "internalType": "bytes",
        "name": "path",
        "type": "bytes"
      }
    ],
    "name": "uniswapV3SwapCallback",
    "outputs": [],
    "stateMutability": "view",
    "type": "function"
  }
]

// uniRouter and sushiRouter
const routerAbi = [
  'function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)',
]

const Quoter: React.FC<Props> = () => {
  const [value, setValue] = useState('');
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
  };
  async function getQuoter() {
    const provider = new ethers.providers.JsonRpcProvider(INFURA_URL);
    const quoter = new ethers.Contract(quoterAddress, QuoterABI, provider)
    const uniRouter = new ethers.Contract(uniRouterAddress, routerAbi, provider)
    const sushiRouter = new ethers.Contract(sushiRouterAddress, routerAbi, provider)


    // Uniswap V3
    // 1 weth 可以换多少 dai
    const tokenIn = wethAddress
    const tokenOut = daiAddress
    const fee = '3000'
    // const amountIn = ethers.utils.parseUnits('1', 18); // 1 Link 18 decimals
    // const amountIn = ethers.utils.parseEther('1'); // 1 ETH

    const amountIn = ethers.utils.parseEther(value); // 1 ETH
    const sqrtPriceLimitX96 = 0


    const amountOut = await quoter.callStatic.quoteExactInputSingle(
      tokenIn,
      tokenOut,
      fee,
      amountIn,
      sqrtPriceLimitX96
    )
    console.log(
      'UniV3price',
      ethers.utils.formatUnits(amountOut.toString(), 18)
    );

    // uniswap-v2 and sushiswap

    const PATH = [wethAddress, daiAddress]
    const uniAmount = await uniRouter.getAmountsOut(amountIn, PATH)
    const sushiAmount = await sushiRouter.getAmountsOut(amountIn, PATH)

    // with the amountOut we can calculate the price ratios on both pools
    const uniPrice = Number(uniAmount[1])/Number(uniAmount[0])
    const sushiPrice = Number(sushiAmount[1])/Number(uniAmount[0])

    console.log('uniAmount[1]', ethers.utils.formatUnits(uniAmount[1],18));
    console.log('sushiAmount[1]', ethers.utils.formatUnits(sushiAmount[1],18));
    console.log('uniV2Price', uniPrice);
    console.log('sushiPrice', sushiPrice);

    const uni = document.getElementById('uniPrice')
    if (uni) {
      uni.innerHTML = 'UniPrice: ' + uniPrice;
    }

    const sushi = document.getElementById('sushiPrice')
    if (sushi) {
      sushi.innerHTML = 'SushiPrice: ' + sushiPrice;
    }



    const TX_FEE = 0.003

    if (uniPrice > sushiPrice) {
      let effUniPrice = uniPrice - (uniPrice * TX_FEE)
      let effSushiPrice = sushiPrice + (sushiPrice * TX_FEE)
      const spread = effUniPrice - effSushiPrice;
      console.log('uni to sushi spread', spread);

      const profit = document.getElementById('profit')
      if (profit) {
        profit.innerHTML = 'Profit: ' + spread;
      }

      
      
      if (spread > 0) {

        console.log('sell on uni, buy on sushi');
        const arbitage = document.getElementById('arbitage')
        if (arbitage) {
          arbitage.innerHTML = 'sell on uni, buy on sushi';
        }
      } else {
        console.log('no arb opportunity');
        const arbitage = document.getElementById('arbitage')
        if (arbitage) {
          arbitage.innerHTML = 'no arb opportunity';
        }
      }

    } else if (sushiPrice > uniPrice) {
      let effSushiPrice = sushiPrice - (sushiPrice * TX_FEE)
      let effUniPrice = uniPrice + (uniPrice * TX_FEE)
      const spread = effSushiPrice - effUniPrice;
      console.log('sushi to uni spread', spread);
      const profit = document.getElementById('profit')
      if (profit) {
        profit.innerHTML = 'Profit: ' + spread;
      }
      const arbitage = document.getElementById('arbitage')
      if (spread > 0) {
        console.log('sell on sushi, buy on uni');
        if (arbitage) {
          arbitage.innerHTML = 'no arb opportunity';
        }
      } else {
        console.log('no arb opportunity');
        if (arbitage) {
          arbitage.innerHTML = 'no arb opportunity';
        }
      }

    }








  }
  return (
    <div className="flex flex-col items-center gap-5 bg-white mx-40 rounded-lg shadow-lg py-8">
      <div><b>ETH-DAI</b> </div>
      <div id='uniPrice'>0</div>
      <div id='sushiPrice'>0</div>
      <div id='profit'>0</div>
      <div id="arbitage">Arbitage Type</div>
      <TextInput
        type="text"
        sizing="md"
        className="w-full"
        value={value} onChange={handleInputChange} />
      <Button className="w-24" gradientMonochrome="info" onClick={() => getQuoter()}>Quoter</Button>
      <Button className="w-24" gradientMonochrome="info">Arbitage</Button>

    </div>

  );
}


export default Quoter;