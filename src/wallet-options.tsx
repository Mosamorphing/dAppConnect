import * as React from 'react';
import { Connector, useConnect } from 'wagmi';
import './index.css';

// Wallet logos mapping
const WALLET_LOGOS: { [key: string]: string } = {
  MetaMask: 'https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg',
  WalletConnect: 'https://avatars.githubusercontent.com/u/37784886?s=200&v=4',
  CoinbaseWallet: 'https://altcoinsbox.com/wp-content/uploads/2023/03/coinbase-wallet-logo.png',
  Phantom: 'https://phantom.app/img/phantom_logo.png', // Phantom logo
  BigetWallet: 'https://cryptologos.cc/logos/bitget-token-new-bgb-logo.png?v=040', // Replace with actual Biget Wallet logo URL
  OKXWallet: 'https://example.com/path/to/okx-wallet-logo.png', // Replace with actual OKX Wallet logo URL
  // Add more wallets as needed
};

export function WalletOptions() {
  const { connectors, connect } = useConnect();
  const [isModalOpen, setIsModalOpen] = React.useState(false); // State to control modal visibility

  return (
    <>
      {/* Button to open the modal */}
      <button onClick={() => setIsModalOpen(true)} className="sign-in-button">
        Sign In
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle} className="modal">
            <h2>Connect a wallet</h2>
            <button className="close-button" onClick={() => setIsModalOpen(false)}>
              &times;
</button>
            <div style={walletsContainerStyle}>
              {connectors.map((connector) => (
                <WalletOption
                  key={connector.uid}
                  connector={connector}
                  onClick={() => {
                    connect({ connector });
                    setIsModalOpen(false); // Close modal after connecting
                  }}
                  walletLogo={WALLET_LOGOS[connector.name]} // Pass the wallet logo
                />
              ))}
            </div>
            <div style={getWalletLinkStyle}>
              <a href="https://metamask.io/en" target="_blank" rel="noopener noreferrer">
                Don't have a wallet? Get started here
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function WalletOption({
  connector,
  onClick,
  walletLogo,
}: {
  connector: Connector;
  onClick: () => void;
  walletLogo: string;
}) {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  return (
    <button className="wallet-button" disabled={!ready} onClick={onClick}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
        {walletLogo && <img src={walletLogo} alt={`${connector.name} logo`} style={logoStyle} />}
        {connector.name}
      </div>
    </button>
  );
}

// Styles
const modalOverlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalContentStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  width: '300px',
  position: 'relative',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  color: '#000000',
};

// const closeButtonStyle: React.CSSProperties = {
//   position: 'absolute',
//   top: '10px',
//   right: '10px',
//   background: 'none',
//   border: 'none',
//   fontSize: '1.5em',
//   cursor: 'pointer',
// };


const walletsContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

// const walletButtonStyle: React.CSSProperties = {
//   width: '100%',
//   padding: '10px',
//   borderRadius: '8px',
//   border: '1px solid #000',
//   backgroundColor: '#fff',
//   color: '#000',
//   cursor: 'pointer',
//   transition: 'background-color 0.25s, border-color 0.25s',
// };

const logoStyle: React.CSSProperties = {
  width: '24px',
  height: '24px',
  borderRadius: '50%',
};

const getWalletLinkStyle: React.CSSProperties = {
  marginTop: '20px',
  textAlign: 'center',
  fontSize: '14px',
};

// walletButtonStyle[':hover'] = {
//   backgroundColor: '#f0f0f0',
//   borderColor: '#646cff',
// };