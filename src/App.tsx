import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider, useAccount} from 'wagmi'
import { config } from './config'
import { Account } from './account'
import { WalletOptions } from './wallet-options'
import { useState } from 'react'
// import styled from 'styled-components';

const queryClient = new QueryClient()

function ConnectWallet() {
  const { isConnected } = useAccount()
  const [showWalletOptions, setShowWalletOptions] = useState(false)

  if (isConnected) return <Account />

  return (
    <div style={containerStyle}>
      {/* Large Text */}
      <div style={headerTextStyle}>
        For Individuals & Enterprises <br />using Multisignature Wallets
      </div>
      <div style={headerTextStyle2}>
        Get best practices on the use of multisignature wallets and avoid common pitfalls
      </div>

      {/* Sign In Button */}
      {!showWalletOptions ? (
        <button onClick={() => setShowWalletOptions(true)} style={signInButtonStyle}>
          Sign In
        </button>
      ) : (
        <WalletOptions />
      )}
    </div>
  );
}

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectWallet />
      </QueryClientProvider>
    </WagmiProvider>
  )
}

// Styles
const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '20px',
  padding: '20px',
  textAlign: 'center',
};

const headerTextStyle: React.CSSProperties = {
  fontSize: '92px', // Larger text size
  wordSpacing: '-5px', // Larger spacing between words
  lineHeight: '1.1', // Larger line height
  fontWeight: 'bold', // Bold text
  color: '#000000', // Black text
  marginBottom: '20px', // Spacing below the text
};

const headerTextStyle2: React.CSSProperties = {
  wordSpacing: '-1px', // Larger spacing between words
  fontWeight: 'normal',
  fontSize: '30px', // Text size
  color: '#525050', // Ensure text color is set
};

const signInButtonStyle: React.CSSProperties = {
  padding: '10px 20px',
  borderRadius: '8px',
  border: '1px solid #ffffff',
  backgroundColor: '#FF306E',
  color: '#fdfdfd',
  cursor: 'pointer',
  fontSize: '16px',
  transition: 'background-color 0.25s',
};

// signInButtonStyle[':hover'] = {
//   backgroundColor: '#f0f0f0',
// };

export default App;