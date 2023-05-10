import { ethers } from "ethers";
import { useAccount } from 'wagmi'
import { Select, Button, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useEffect } from 'react';
import { log } from "console";
interface Props {
  // props type definitions here

}

const contractAddress = "0x88608a72dA7af03E4620726Aa23830a36Fd89f7b"

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
    "name": "ADDRESSES_PROVIDER",
    "outputs": [
      {
        "internalType": "contract IPoolAddressesProvider",
        "name": "",
        "type": "address"
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
    "inputs": [
      {
        "internalType": "address",
        "name": "asset",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "premium",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "initiator",
        "type": "address"
      },
      {
        "internalType": "bytes",
        "name": "params",
        "type": "bytes"
      }
    ],
    "name": "executeOperation",
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
    "inputs": [
      {
        "internalType": "address",
        "name": "_token",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "requestFlashLoan",
    "outputs": [],
    "stateMutability": "nonpayable",
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
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
]


const contractAddress1 = "0x7b5C526B7F8dfdff278b4a3e045083FBA4028790"; // Pool-Proxy-Aave
const abi1 = [
  {
    "inputs": [
      {
        "internalType": "contract IPoolAddressesProvider",
        "name": "provider",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "reserve",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "backer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "fee",
        "type": "uint256"
      }
    ],
    "name": "BackUnbacked",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "reserve",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "onBehalfOf",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "enum DataTypes.InterestRateMode",
        "name": "interestRateMode",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "borrowRate",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint16",
        "name": "referralCode",
        "type": "uint16"
      }
    ],
    "name": "Borrow",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "target",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "initiator",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "asset",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "enum DataTypes.InterestRateMode",
        "name": "interestRateMode",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "premium",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint16",
        "name": "referralCode",
        "type": "uint16"
      }
    ],
    "name": "FlashLoan",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "asset",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "totalDebt",
        "type": "uint256"
      }
    ],
    "name": "IsolationModeTotalDebtUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "collateralAsset",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "debtAsset",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "debtToCover",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "liquidatedCollateralAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "liquidator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "receiveAToken",
        "type": "bool"
      }
    ],
    "name": "LiquidationCall",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "reserve",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "onBehalfOf",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint16",
        "name": "referralCode",
        "type": "uint16"
      }
    ],
    "name": "MintUnbacked",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "reserve",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amountMinted",
        "type": "uint256"
      }
    ],
    "name": "MintedToTreasury",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "reserve",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "RebalanceStableBorrowRate",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "reserve",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "repayer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "useATokens",
        "type": "bool"
      }
    ],
    "name": "Repay",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "reserve",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "liquidityRate",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "stableBorrowRate",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "variableBorrowRate",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "liquidityIndex",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "variableBorrowIndex",
        "type": "uint256"
      }
    ],
    "name": "ReserveDataUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "reserve",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "ReserveUsedAsCollateralDisabled",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "reserve",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "ReserveUsedAsCollateralEnabled",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "reserve",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "onBehalfOf",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint16",
        "name": "referralCode",
        "type": "uint16"
      }
    ],
    "name": "Supply",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "reserve",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "enum DataTypes.InterestRateMode",
        "name": "interestRateMode",
        "type": "uint8"
      }
    ],
    "name": "SwapBorrowRateMode",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "categoryId",
        "type": "uint8"
      }
    ],
    "name": "UserEModeSet",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "reserve",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Withdraw",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "ADDRESSES_PROVIDER",
    "outputs": [
      {
        "internalType": "contract IPoolAddressesProvider",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "BRIDGE_PROTOCOL_FEE",
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
    "name": "FLASHLOAN_PREMIUM_TOTAL",
    "outputs": [
      {
        "internalType": "uint128",
        "name": "",
        "type": "uint128"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "FLASHLOAN_PREMIUM_TO_PROTOCOL",
    "outputs": [
      {
        "internalType": "uint128",
        "name": "",
        "type": "uint128"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MAX_NUMBER_RESERVES",
    "outputs": [
      {
        "internalType": "uint16",
        "name": "",
        "type": "uint16"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MAX_STABLE_RATE_BORROW_SIZE_PERCENT",
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
    "name": "POOL_REVISION",
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
        "name": "asset",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "fee",
        "type": "uint256"
      }
    ],
    "name": "backUnbacked",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "asset",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "interestRateMode",
        "type": "uint256"
      },
      {
        "internalType": "uint16",
        "name": "referralCode",
        "type": "uint16"
      },
      {
        "internalType": "address",
        "name": "onBehalfOf",
        "type": "address"
      }
    ],
    "name": "borrow",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "id",
        "type": "uint8"
      },
      {
        "components": [
          {
            "internalType": "uint16",
            "name": "ltv",
            "type": "uint16"
          },
          {
            "internalType": "uint16",
            "name": "liquidationThreshold",
            "type": "uint16"
          },
          {
            "internalType": "uint16",
            "name": "liquidationBonus",
            "type": "uint16"
          },
          {
            "internalType": "address",
            "name": "priceSource",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "label",
            "type": "string"
          }
        ],
        "internalType": "struct DataTypes.EModeCategory",
        "name": "category",
        "type": "tuple"
      }
    ],
    "name": "configureEModeCategory",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "asset",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "onBehalfOf",
        "type": "address"
      },
      {
        "internalType": "uint16",
        "name": "referralCode",
        "type": "uint16"
      }
    ],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "asset",
        "type": "address"
      }
    ],
    "name": "dropReserve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "asset",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "balanceFromBefore",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "balanceToBefore",
        "type": "uint256"
      }
    ],
    "name": "finalizeTransfer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "receiverAddress",
        "type": "address"
      },
      {
        "internalType": "address[]",
        "name": "assets",
        "type": "address[]"
      },
      {
        "internalType": "uint256[]",
        "name": "amounts",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "interestRateModes",
        "type": "uint256[]"
      },
      {
        "internalType": "address",
        "name": "onBehalfOf",
        "type": "address"
      },
      {
        "internalType": "bytes",
        "name": "params",
        "type": "bytes"
      },
      {
        "internalType": "uint16",
        "name": "referralCode",
        "type": "uint16"
      }
    ],
    "name": "flashLoan",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "receiverAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "asset",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "params",
        "type": "bytes"
      },
      {
        "internalType": "uint16",
        "name": "referralCode",
        "type": "uint16"
      }
    ],
    "name": "flashLoanSimple",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "asset",
        "type": "address"
      }
    ],
    "name": "getConfiguration",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "data",
            "type": "uint256"
          }
        ],
        "internalType": "struct DataTypes.ReserveConfigurationMap",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "id",
        "type": "uint8"
      }
    ],
    "name": "getEModeCategoryData",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint16",
            "name": "ltv",
            "type": "uint16"
          },
          {
            "internalType": "uint16",
            "name": "liquidationThreshold",
            "type": "uint16"
          },
          {
            "internalType": "uint16",
            "name": "liquidationBonus",
            "type": "uint16"
          },
          {
            "internalType": "address",
            "name": "priceSource",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "label",
            "type": "string"
          }
        ],
        "internalType": "struct DataTypes.EModeCategory",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint16",
        "name": "id",
        "type": "uint16"
      }
    ],
    "name": "getReserveAddressById",
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
        "internalType": "address",
        "name": "asset",
        "type": "address"
      }
    ],
    "name": "getReserveData",
    "outputs": [
      {
        "components": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "data",
                "type": "uint256"
              }
            ],
            "internalType": "struct DataTypes.ReserveConfigurationMap",
            "name": "configuration",
            "type": "tuple"
          },
          {
            "internalType": "uint128",
            "name": "liquidityIndex",
            "type": "uint128"
          },
          {
            "internalType": "uint128",
            "name": "currentLiquidityRate",
            "type": "uint128"
          },
          {
            "internalType": "uint128",
            "name": "variableBorrowIndex",
            "type": "uint128"
          },
          {
            "internalType": "uint128",
            "name": "currentVariableBorrowRate",
            "type": "uint128"
          },
          {
            "internalType": "uint128",
            "name": "currentStableBorrowRate",
            "type": "uint128"
          },
          {
            "internalType": "uint40",
            "name": "lastUpdateTimestamp",
            "type": "uint40"
          },
          {
            "internalType": "uint16",
            "name": "id",
            "type": "uint16"
          },
          {
            "internalType": "address",
            "name": "aTokenAddress",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "stableDebtTokenAddress",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "variableDebtTokenAddress",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "interestRateStrategyAddress",
            "type": "address"
          },
          {
            "internalType": "uint128",
            "name": "accruedToTreasury",
            "type": "uint128"
          },
          {
            "internalType": "uint128",
            "name": "unbacked",
            "type": "uint128"
          },
          {
            "internalType": "uint128",
            "name": "isolationModeTotalDebt",
            "type": "uint128"
          }
        ],
        "internalType": "struct DataTypes.ReserveData",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "asset",
        "type": "address"
      }
    ],
    "name": "getReserveNormalizedIncome",
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
        "name": "asset",
        "type": "address"
      }
    ],
    "name": "getReserveNormalizedVariableDebt",
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
    "name": "getReservesList",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "getUserAccountData",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "totalCollateralBase",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "totalDebtBase",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "availableBorrowsBase",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "currentLiquidationThreshold",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "ltv",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "healthFactor",
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
        "name": "user",
        "type": "address"
      }
    ],
    "name": "getUserConfiguration",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "data",
            "type": "uint256"
          }
        ],
        "internalType": "struct DataTypes.UserConfigurationMap",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "getUserEMode",
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
        "name": "asset",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "aTokenAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "stableDebtAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "variableDebtAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "interestRateStrategyAddress",
        "type": "address"
      }
    ],
    "name": "initReserve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract IPoolAddressesProvider",
        "name": "provider",
        "type": "address"
      }
    ],
    "name": "initialize",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "collateralAsset",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "debtAsset",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "debtToCover",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "receiveAToken",
        "type": "bool"
      }
    ],
    "name": "liquidationCall",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address[]",
        "name": "assets",
        "type": "address[]"
      }
    ],
    "name": "mintToTreasury",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "asset",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "onBehalfOf",
        "type": "address"
      },
      {
        "internalType": "uint16",
        "name": "referralCode",
        "type": "uint16"
      }
    ],
    "name": "mintUnbacked",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "asset",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "rebalanceStableBorrowRate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "asset",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "interestRateMode",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "onBehalfOf",
        "type": "address"
      }
    ],
    "name": "repay",
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
    "inputs": [
      {
        "internalType": "address",
        "name": "asset",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "interestRateMode",
        "type": "uint256"
      }
    ],
    "name": "repayWithATokens",
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
    "inputs": [
      {
        "internalType": "address",
        "name": "asset",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "interestRateMode",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "onBehalfOf",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      },
      {
        "internalType": "uint8",
        "name": "permitV",
        "type": "uint8"
      },
      {
        "internalType": "bytes32",
        "name": "permitR",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "permitS",
        "type": "bytes32"
      }
    ],
    "name": "repayWithPermit",
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
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "rescueTokens",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "asset",
        "type": "address"
      }
    ],
    "name": "resetIsolationModeTotalDebt",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "asset",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "data",
            "type": "uint256"
          }
        ],
        "internalType": "struct DataTypes.ReserveConfigurationMap",
        "name": "configuration",
        "type": "tuple"
      }
    ],
    "name": "setConfiguration",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "asset",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "rateStrategyAddress",
        "type": "address"
      }
    ],
    "name": "setReserveInterestRateStrategyAddress",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "categoryId",
        "type": "uint8"
      }
    ],
    "name": "setUserEMode",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "asset",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "useAsCollateral",
        "type": "bool"
      }
    ],
    "name": "setUserUseReserveAsCollateral",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "asset",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "onBehalfOf",
        "type": "address"
      },
      {
        "internalType": "uint16",
        "name": "referralCode",
        "type": "uint16"
      }
    ],
    "name": "supply",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "asset",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "onBehalfOf",
        "type": "address"
      },
      {
        "internalType": "uint16",
        "name": "referralCode",
        "type": "uint16"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      },
      {
        "internalType": "uint8",
        "name": "permitV",
        "type": "uint8"
      },
      {
        "internalType": "bytes32",
        "name": "permitR",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "permitS",
        "type": "bytes32"
      }
    ],
    "name": "supplyWithPermit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "asset",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "interestRateMode",
        "type": "uint256"
      }
    ],
    "name": "swapBorrowRateMode",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "protocolFee",
        "type": "uint256"
      }
    ],
    "name": "updateBridgeProtocolFee",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint128",
        "name": "flashLoanPremiumTotal",
        "type": "uint128"
      },
      {
        "internalType": "uint128",
        "name": "flashLoanPremiumToProtocol",
        "type": "uint128"
      }
    ],
    "name": "updateFlashloanPremiums",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "asset",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      }
    ],
    "name": "withdraw",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]




const FlashLoan: React.FC<Props> = () => {
  const { address, isConnected } = useAccount()

  const [selectedValue, setSelectedValue] = useState('');

  useEffect(() => {
    // 在组件挂载时调用一次
    getTokenBalance();
    const interval = setInterval(getTokenBalance, 1000);
    return () => clearInterval(interval);
  }, [selectedValue]);

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedValue(event.target.value);
  }



  const [value, setValue] = useState('');
  const [tokenvalue, setTokenValue] = useState('0');
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);

  };

  async function getTokenBalance() {
    if (isConnected) {
      const provider = new ethers.providers.Web3Provider((window as any).ethereum);
      // await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner(); // 获得签名者
      const accounts = await provider.listAccounts(); // 获取账户列表
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        if (selectedValue == "Link") {
          const tokenAddress = "0xe9c4393a23246293a8D31BF7ab68c17d4CF90A29"
          const tokenBalance = await contract.getBalance(tokenAddress)
          const balance = ethers.utils.formatUnits(tokenBalance, 18)
          setTokenValue(balance)
  

        }

        if (selectedValue == "DAI") {
          const tokenAddress = "0xBa8DCeD3512925e52FE67b1b5329187589072A55"
          const tokenBalance = await contract.getBalance(tokenAddress)
          const balance = ethers.utils.formatUnits(tokenBalance, 18)
          setTokenValue(balance)
    

        }

        if (selectedValue == "USDC") {
          const tokenAddress = "0x65aFADD39029741B3b8f0756952C74678c9cEC93"
          const tokenBalance = await contract.getBalance(tokenAddress)
          const balance = ethers.utils.formatUnits(tokenBalance, 6)
          setTokenValue(balance)


        }

        if (selectedValue == "WBTC") {
          const tokenAddress = "0x45AC379F019E48ca5dAC02E54F406F99F5088099"
          const tokenBalance = await contract.getBalance(tokenAddress)
          const balance = ethers.utils.formatUnits(tokenBalance, 8)
          setTokenValue(balance)
          // console.log(balance);

        }

        if (selectedValue == "USDT") {
          const tokenAddress = "0x2E8D98fd126a32362F2Bd8aA427E59a1ec63F780"
          const tokenBalance = await contract.getBalance(tokenAddress)
          const balance = ethers.utils.formatUnits(tokenBalance, 6)
          setTokenValue(balance)
          // console.log(balance);

        }

        if (selectedValue == "ERUS") {
          const tokenAddress = "0xBC33cfbD55EA6e5B97C6da26F11160ae82216E2b"
          const tokenBalance = await contract.getBalance(tokenAddress)
          const balance = ethers.utils.formatUnits(tokenBalance, 2)
          setTokenValue(balance)
          // console.log(balance);

        }
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("Please Connect Metamask")
    }
  }


  async function flashLoan() {
    if (isConnected) {
      const provider = new ethers.providers.Web3Provider((window as any).ethereum);
      // await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner(); // 获得签名者
      const accounts = await provider.listAccounts(); // 获取账户列表
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        if (selectedValue == "Link") {
          const tokenAddress = "0xe9c4393a23246293a8D31BF7ab68c17d4CF90A29"
          const decimals = 18
          const amount = value
          console.log('Link', tokenAddress, decimals, amount);

          const tokenAmount = ethers.utils.parseUnits(amount, decimals);
          await contract.requestFlashLoan(tokenAddress, tokenAmount)
        }

        if (selectedValue == "DAI") {
          const tokenAddress = "0xBa8DCeD3512925e52FE67b1b5329187589072A55"
          const decimals = 18
          const amount = value
          console.log('DAI', tokenAddress, decimals, amount);
          const tokenAmount = ethers.utils.parseUnits(amount, decimals);
          await contract.requestFlashLoan(tokenAddress, tokenAmount)
        }

        if (selectedValue == "USDC") {
          const tokenAddress = "0x65aFADD39029741B3b8f0756952C74678c9cEC93"
          const decimals = 18
          const amount = value
          console.log('USDC', tokenAddress, decimals, amount);
          const tokenAmount = ethers.utils.parseUnits(amount, decimals);
          await contract.requestFlashLoan(tokenAddress, tokenAmount)
        }

        if (selectedValue == "WBTC") {
          const tokenAddress = "0x45AC379F019E48ca5dAC02E54F406F99F5088099"
          const decimals = 8
          const amount = value
          console.log('WBTC', tokenAddress, decimals, amount);
          const tokenAmount = ethers.utils.parseUnits(amount, decimals);
          await contract.requestFlashLoan(tokenAddress, tokenAmount)
        }

        if (selectedValue == "USDT") {
          const tokenAddress = "0x2E8D98fd126a32362F2Bd8aA427E59a1ec63F780"
          const decimals = 6
          const amount = value
          console.log('USDT', tokenAddress, decimals, amount);
          const tokenAmount = ethers.utils.parseUnits(amount, decimals);
          await contract.requestFlashLoan(tokenAddress, tokenAmount)
        }

        if (selectedValue == "ERUS") {
          const tokenAddress = "0xBC33cfbD55EA6e5B97C6da26F11160ae82216E2b"
          const decimals = 2
          const amount = value
          console.log('ERUS', tokenAddress, decimals, amount);
          const tokenAmount = ethers.utils.parseUnits(amount, decimals);
          await contract.requestFlashLoan(tokenAddress, tokenAmount)
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("Please Connect Metamask")
    }
  }


  async function withdraw() {
    if (isConnected) {
      const provider = new ethers.providers.Web3Provider((window as any).ethereum);
      // await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner(); // 获得签名者
      const accounts = await provider.listAccounts(); // 获取账户列表
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        if (selectedValue == "Link") {
          const tokenAddress = "0xe9c4393a23246293a8D31BF7ab68c17d4CF90A29"
          await contract.withdraw(tokenAddress)
        }

        if (selectedValue == "DAI") {
          const tokenAddress = "0xBa8DCeD3512925e52FE67b1b5329187589072A55"
          await contract.withdraw(tokenAddress)
        }

        if (selectedValue == "USDC") {
          const tokenAddress = "0x65aFADD39029741B3b8f0756952C74678c9cEC93"
          await contract.withdraw(tokenAddress)
        }

        if (selectedValue == "WBTC") {
          const tokenAddress = "0x45AC379F019E48ca5dAC02E54F406F99F5088099"
          await contract.withdraw(tokenAddress)
        }

        if (selectedValue == "USDT") {
          const tokenAddress = "0x2E8D98fd126a32362F2Bd8aA427E59a1ec63F780"
          await contract.withdraw(tokenAddress)
        }

        if (selectedValue == "ERUS") {
          const tokenAddress = "0xBC33cfbD55EA6e5B97C6da26F11160ae82216E2b"
          await contract.withdraw(tokenAddress)
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("Please Connect Metamask")
    }
  }


  return (
    <div className="my-10 flex flex-col gap-5">
      <h1 className=" text-2xl font-bold ">Flash Loan</h1>
      <div className="text-base font-normal break-all">
        <b className="text-base font-bold">Contract Address: </b>
        0x88608a72dA7af03E4620726Aa23830a36Fd89f7b
      </div>
      <div className="flex flex-col gap-5 bg-white items-center justify-center mx-auto px-10 py-8 rounded-lg shadow-lg w-full md:w-1/2">
        <div className="text-base font-normal break-all">
            <b>Balance: {tokenvalue}</b> 
        </div>
        <div className="w-48 text-base font-bold">Please select token</div>
        <div className="w-40">
          <Select defaultValue="Link" value={selectedValue} onChange={handleSelectChange}>
            <option value="Link">
              Link
            </option>
            <option value="DAI">
              DAI
            </option>
            <option value="USDC">
              USDC
            </option>
            <option value="WBTC">
              WBTC
            </option>
            <option value="USDT">
              USDT
            </option>
            <option value="ERUS">
              ERUS
            </option>
          </Select>
        </div>
        <div className="w-48 text-base font-bold">Please tpye the number of token</div>
        <TextInput
          type="text"
          sizing="md"
          className="w-40"
          value={value} onChange={handleInputChange} />


        <Button
          className='w-32'
          gradientMonochrome="info"
          onClick={() => flashLoan()}>
          Flash Loan
        </Button>

        <Button
          className='w-32'
          gradientMonochrome="info"
          onClick={() => withdraw()}>
          Withdraw
        </Button>
      </div>





    </div>
  );

}

export default FlashLoan;