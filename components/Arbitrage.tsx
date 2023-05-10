import { ethers } from "ethers";
import { Button, TextInput } from "flowbite-react";
import React, { useState } from "react";
import Quoter from './Quoter';

interface Props {
  // props type definitions here

}


const Arbitrage: React.FC<Props> = () => {
  const [value, setValue] = useState('');
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  async function getQuoter() {
    // token address
    const wethAddress = '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6';
    const linkAddress = '0x326C977E6efc84E512bB9C30f76E30c160eD06FB' // link
    // const daiAddress = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984'; // uniswap
    // const linkAddress = '0x07865c6e87b9f70255377e024ace6630c1eaa37f' // usdc
    // const daiAddress = '0xe9c4393a23246293a8D31BF7ab68c17d4CF90A29';

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



    const provider = new ethers.providers.JsonRpcProvider(INFURA_URL);
    const quoter = new ethers.Contract(quoterAddress, QuoterABI, provider)
    const uniRouter = new ethers.Contract(uniRouterAddress, routerAbi, provider)
    const sushiRouter = new ethers.Contract(sushiRouterAddress, routerAbi, provider)


    // Uniswap V3
    // 1 weth 可以换多少 dai
    const tokenIn = wethAddress
    const tokenOut = linkAddress
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
    const PATH = [wethAddress, linkAddress]
    const uniAmount = await uniRouter.getAmountsOut(amountIn, PATH)
    const sushiAmount = await sushiRouter.getAmountsOut(amountIn, PATH)

    const uniPrice = Number(ethers.utils.formatUnits(uniAmount[1], 18))
    const sushiPrice = Number(ethers.utils.formatUnits(sushiAmount[1], 18))

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
          arbitage.innerHTML = 'Arbitage Type: sell on uni, buy on sushi';
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
        profit.innerHTML = 'Spread: ' + spread;
      }
      const arbitage = document.getElementById('arbitage')
      if (spread > 0) {
        console.log('Arbitage Type: sell on sushi, buy on uni');
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
    <div className="flex flex-col gap-5">
      <h1 className=" text-2xl font-bold ">Arbitrage</h1>
      <div className="text-base font-normal break-all">
        <b className="text-base font-bold">Contract Address: </b>
        0x210B92EdD761891ac8039d6431dD6D8263124E47
      </div>
      <Quoter />
    </div>


  );
}


export default Arbitrage;