import { 
    createWalletClient, 
    http, 
    defineChain, 
    publicActions,
    getContract,
    Address,
} from 'viem'
import { privateKeyToAccount } from 'viem/accounts'


import greeterData from './Greeter.json'
import greetingSenderData from './GreetingSender.json'

const account = privateKeyToAccount(process.env.PRIV_KEY as `0x${string}`)

const chainA = defineChain({
    id: 901,
    name: "ChainA",
    rpcUrls: {
        default: {
            http: [process.env.RPC_A as string],
        },
    },
    nativeCurrency: {
        decimals: 18,
        name: 'Ether',
        symbol: 'ETH',
    },
})



const chainB = defineChain({
    id: 902,
    name: "ChainB",
    rpcUrls: {
        default: {
            http: [process.env.RPC_B as string],
        },
    },
    nativeCurrency: {
        decimals: 18,
        name: 'Ether',
        symbol: 'ETH',
    },
})


const walletA = createWalletClient({
    chain: chainA,
    transport: http(),
    account
}).extend(publicActions)


const walletB = createWalletClient({
    chain: chainB,
    transport: http(),
    account
}) // .extend(publicActions)


const greeter = getContract({
    address: process.env.GREETER_B_ADDR as Address,
    abi: greeterData.abi,
    client: {
        wallet: walletB
    }
})

