import { Contract, ethers } from "ethers";
import { Button, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useAccount } from 'wagmi'
interface Props {
  // props type definitions here
}

// token address
const wethAddress = '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6';
const linkAddress = '0x326C977E6efc84E512bB9C30f76E30c160eD06FB' // link
// const daiAddress = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984'; // uniswap
// const linkAddress = '0x07865c6e87b9f70255377e024ace6630c1eaa37f' // usdc
// const daiAddress = '0xe9c4393a23246293a8D31BF7ab68c17d4CF90A29';

const uniRouterAddress = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'
const sushiRouterAddress = '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506'

// uniRouter and sushiRouter
// const routerAbi = [
//   'function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)',
// ]

const routerAbi = [
  {"inputs":[{"internalType":"address","name":"_factory","type":"address"},{"internalType":"address","name":"_WETH","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"WETH","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"amountADesired","type":"uint256"},{"internalType":"uint256","name":"amountBDesired","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amountTokenDesired","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidityETH","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountIn","outputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountOut","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsIn","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsOut","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"reserveA","type":"uint256"},{"internalType":"uint256","name":"reserveB","type":"uint256"}],"name":"quote","outputs":[{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityETH","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityETHSupportingFeeOnTransferTokens","outputs":[{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityETHWithPermit","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityETHWithPermitSupportingFeeOnTransferTokens","outputs":[{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityWithPermit","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapETHForExactTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactETHForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactETHForTokensSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForETH","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForETHSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokensSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokensForExactETH","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokensForExactTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}
] 

const contractAddress = "0x210B92EdD761891ac8039d6431dD6D8263124E47"
const abi =  [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_tokenaddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_routerAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_tokenamount",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_amountIn",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "sell_token",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "buy_token",
        "type": "address"
      }
    ],
    "name": "checkArbitage",
    "outputs": [
      {
        "internalType": "enum Exchange",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_amountIn",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_routerAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "sell_token",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "buy_token",
        "type": "address"
      }
    ],
    "name": "getAmountsOut",
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
        "name": "_amountIn",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "sell_token",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "buy_token",
        "type": "address"
      }
    ],
    "name": "getArbitageProfit",
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
        "internalType": "address",
        "name": "_tokenaddress",
        "type": "address"
      }
    ],
    "name": "getBalance",
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
    "name": "getWethBalance",
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
        "internalType": "uint8",
        "name": "router",
        "type": "uint8"
      },
      {
        "internalType": "address",
        "name": "sell_token",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "buy_token",
        "type": "address"
      }
    ],
    "name": "makeArbitrage",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_amountIn",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_routerAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "sell_token",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "buy_token",
        "type": "address"
      }
    ],
    "name": "swap",
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
    "inputs": [],
    "name": "weth",
    "outputs": [
      {
        "internalType": "contract IERC20",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "wethAddress",
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
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

const Quoter: React.FC<Props> = () => {
  const { address, isConnected } = useAccount()

  const [value, setValue] = useState('');
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };



  async function getQuoter() {
    if (isConnected) {
      const provider = new ethers.providers.Web3Provider((window as any).ethereum);
      const signer = provider.getSigner(); // 获得签名者
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        const _amountIn =  ethers.utils.parseEther(value)



        // uni sushi price
        const uniprice = await contract.getAmountsOut(_amountIn, uniRouterAddress,wethAddress,linkAddress)
        const uniPrice = Number(ethers.utils.formatUnits(uniprice, 18))
        console.log('uniPrice',uniPrice);

        const sushiprice = await contract.getAmountsOut(_amountIn, sushiRouterAddress,wethAddress,linkAddress)
        const sushiPrice = Number(ethers.utils.formatUnits(sushiprice, 18))
        console.log('sushiPrice',sushiPrice);

        const uni = document.getElementById('uniPrice')
        if (uni) {
          uni.innerHTML = 'UniPrice: ' + uniPrice;
        }

        const sushi = document.getElementById('sushiPrice')
        if (sushi) {
          sushi.innerHTML = 'SushiPrice: ' + sushiPrice;
        }


        const tx_fee = 0.003

        // check arbitage type and profit
        if (uniPrice>sushiPrice) {
          const effUniPrice = uniPrice - uniPrice * tx_fee
          const effSushiPrice = sushiPrice + sushiPrice * tx_fee
          const spread = effUniPrice-effSushiPrice
          
          if (spread>0){
            console.log('arbitrage type: sell on uni, buy on sushi');
            console.log('profit:',spread);
            const profit = document.getElementById('profit')
            if (profit) {
              profit.innerHTML = 'Profit: ' + spread;
            }

            const arbitrage = document.getElementById('arbitrage')
            if (arbitrage) {
              arbitrage.innerHTML = 'Arbitrage Type: sell on uni, buy on sushi';
            }
          } else {
            console.log('no arbitrage opportunity');
            console.log('profit: 0' )
            const profit = document.getElementById('profit')
            if (profit) {
              profit.innerHTML = 'Profit: ' + 0;
            }

            const arbitrage = document.getElementById('arbitrage')
            if (arbitrage) {
              arbitrage.innerHTML = 'Arbitrage Type: no arbitrage opportunity';
            }
          }
        }

        if (sushiPrice>uniPrice) {
          const effSushiPrice = sushiPrice - sushiPrice * tx_fee
          const effUniPrice = uniPrice + uniPrice * tx_fee
          
          const spread = effUniPrice-effSushiPrice
          if (spread>0){
            console.log('arbitrage type: sell on sushi, buy on uni');
            console.log('profit:',spread);
            const profit = document.getElementById('profit')
            if (profit) {
              profit.innerHTML = 'Profit: ' + spread;
            }

            const arbitrage = document.getElementById('arbitrage')
            if (arbitrage) {
              arbitrage.innerHTML = 'Arbitrage Type: sell on sushi, buy on uni';
            }

          } else {
            console.log('no arbitrage opportunity');
            console.log('profit: 0' )
            const profit = document.getElementById('profit')
            if (profit) {
              profit.innerHTML = 'Profit: ' + 0;
            }

            const arbitrage = document.getElementById('arbitrage')
            if (arbitrage) {
              arbitrage.innerHTML = 'Arbitrage Type: no arbitrage opportunity';
            }
          }
        }
        
        
        // weth balance
        const wethbalance = await contract.getWethBalance()
        const wethBalance = Number(ethers.utils.formatUnits(wethbalance, 18))
        console.log('weth balance',wethBalance);

        const balance = document.getElementById('balance')
        if (balance) {
          balance.innerHTML = 'Weth Balance: '+ wethBalance;
        }

        // after arbitage
        const linkAmount = await contract.getAmountsOut(_amountIn, uniRouterAddress,wethAddress,linkAddress)
        console.log(linkAmount);
        
        const newWethAmount = await contract.getAmountsOut(linkAmount, uniRouterAddress,linkAddress,wethAddress)
        console.log(Number(ethers.utils.formatUnits(newWethAmount, 18)));

        const after = document.getElementById('after')
        if (after) {
          after.innerHTML = 'Balance After Arbitage: '+ Number(ethers.utils.formatUnits(newWethAmount, 18));
        }
        
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("Please Connect Metamask")
    }
  }

  async function swap() {
    if (isConnected) {
      const provider = new ethers.providers.Web3Provider((window as any).ethereum);
      const signer = provider.getSigner(); // 获得签名者
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        console.log(contract);

        const _amountIn =  await contract.getWethBalance()

        const uniprice = await contract.getAmountsOut(_amountIn, uniRouterAddress,wethAddress,linkAddress)
        const uniPrice = Number(ethers.utils.formatUnits(uniprice, 18))
        const sushiprice = await contract.getAmountsOut(_amountIn, sushiRouterAddress,wethAddress,linkAddress)
        const sushiPrice = Number(ethers.utils.formatUnits(sushiprice, 18))

        const tx_fee = 0.003

        // check arbitage type and profit
        if (uniPrice>sushiPrice) {
          const effUniPrice = uniPrice - uniPrice * tx_fee
          const effSushiPrice = sushiPrice + sushiPrice * tx_fee
          const spread = effUniPrice-effSushiPrice
          
          if (spread>0){
            console.log('arbitrage type: sell on uni, buy on sushi');
            await contract.makeArbitrage(1,wethAddress,linkAddress)

          } else {
            console.log('no arbitrage opportunity');
          }
        }

        if (sushiPrice>uniPrice) {
          const effSushiPrice = sushiPrice - sushiPrice * tx_fee
          const effUniPrice = uniPrice + uniPrice * tx_fee
          
          const spread = effSushiPrice-effUniPrice
          if (spread>0){
            console.log('arbitrage type: sell on sushi, buy on uni');
            await contract.makeArbitrage(2,wethAddress,linkAddress)

          } else {
            console.log('no arbitrage opportunity');
          }
        }





        


        
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("Please Connect Metamask")
    }
  }

  return (
 
      <div className="flex flex-col gap-5 bg-white mx-auto rounded-lg shadow-lg py-8 w- w-full md:w-1/2">
        <div className="text-xl mx-auto"><b>WETH-LINK</b> </div>
        <div className='border-b-2 border-black'> </div>
        <div id='balance'>Weth Balance: 0</div>
        <div id='uniPrice'>UniPrice: 0</div>
        <div id='sushiPrice'>SushiPrice: 0</div>
        <div id='profit'>Profit: 0</div>
        <div id="arbitrage">Arbitrage Type: </div>
        <div id="after">Balance After Arbitage: 0</div>
        <TextInput
          type="text"
          sizing="md"
          className="w-1/2"
          value={value} onChange={handleInputChange} />
        <Button className="w-24" gradientMonochrome="info" onClick={() => getQuoter()}>Quoter</Button>
        <Button className="w-24" gradientMonochrome="info" onClick={() => swap()}>Arbitage</Button>

      </div>



  );
}


export default Quoter;