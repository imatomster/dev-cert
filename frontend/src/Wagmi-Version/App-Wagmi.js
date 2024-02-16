import {
  configureChains,
  createClient,
  WagmiConfig,
  defaultChains,
  chain,
} from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { InjectedConnector } from "wagmi/connectors/injected";

// Alchemy API Key (replace with your own or another provider's API key)
const alchemyId = process.env.REACT_APP_ALCHEMY_ID;

// Configure chains and providers
const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  alchemyProvider({ alchemyId }),
  publicProvider(),
]);

// Setup wagmi client with connectors
const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
        rpc: {
          [chain.mainnet
            .id]: `https://eth-mainnet.alchemyapi.io/v2/${alchemyId}`,
        },
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});

// Wrap your app with WagmiConfig and pass the client
function App() {
  return (
    <WagmiConfig client={client}>{/* Your app components here */}</WagmiConfig>
  );
}

export default App;
