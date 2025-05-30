import { useState } from 'react';
import { useAccount, useDisconnect, useEnsAvatar, useEnsName, useBalance, useSwitchChain } from 'wagmi';
import { config } from './config';
import './index.css'; // Ensure you import your CSS file

export function Account() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });
  const { data: balance } = useBalance({ address });
  const { chains, switchChain, chain } = useSwitchChain({ config });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      alert('Address copied to clipboard!');
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatBalanceInDollars = (balance: number) => {
    const dollarValue = balance * 2000; // Assuming 1 ETH = $2000, replace with actual conversion rate
    return dollarValue.toFixed(2);
  };

  return (
    <div style={containerStyle}>
      {/* Disconnect Button (Top-Right Corner) */}
      <button style={disconnectButtonStyle} onClick={() => disconnect()}>
        Disconnect
      </button>

      {/* Account Summary */}
      <div style={summaryStyle} onClick={() => setIsModalOpen(true)}>
        {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} style={avatarStyle} />}
        <div style={addressStyle}>
          {ensName ? `${ensName}` : formatAddress(address!)}
        </div>
        <div style={balanceStyle}>
          {balance ? `$${formatBalanceInDollars(parseFloat(balance.formatted))}` : 'Loading...'}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal" style={modalContentStyle}>
            <h2 style={{ color: '#000000', marginBottom: '20px' }}>Wallet Details</h2>
            <button className="close-button" onClick={() => setIsModalOpen(false)}>
              &times;
            </button>

            {/* Address */}
            <div style={detailStyle}>
              <strong>Address:</strong> {formatAddress(address!)}
              <button onClick={copyAddress} style={copyButtonStyle}>
                📋 Copy
              </button>
            </div>
            {/* Balance */}
            <div style={detailStyle}>
              <strong>Balance:</strong> {balance?.formatted} {balance?.symbol}
            </div>
            {/* Value in Dollars */}
            <div style={detailStyle}>
              <strong>Value:</strong> ${balance ? formatBalanceInDollars(parseFloat(balance.formatted)) : 'Loading...'}
            </div>
            {/* Network Switch */}
            <div style={detailStyle}>
              <strong>Network:</strong>
              <select
                value={chain?.id}
                onChange={(e) => switchChain({ chainId: Number(e.target.value) })}
                style={networkSelectStyle}
              >
                {chains.map((chain) => (
                  <option key={chain.id} value={chain.id}>
                    {chain.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Styles
const containerStyle: React.CSSProperties = {
  position: 'relative',
  padding: '20px',
  backgroundColor: '#f7f7f7',
  borderRadius: '12px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  maxWidth: '300px',
  margin: '0 auto',
};

const summaryStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  cursor: 'pointer',
};

const avatarStyle: React.CSSProperties = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
};

const addressStyle: React.CSSProperties = {
  fontSize: '16px',
  fontWeight: '500',
  color: '#000000',
};

const balanceStyle: React.CSSProperties = {
  fontSize: '14px',
  color: '#666666',
};

// const modalOverlayStyle: React.CSSProperties = {
//   position: 'fixed',
//   top: 0,
//   left: 0,
//   width: '100%',
//   height: '100%',
//   backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   zIndex: 1000,
// };

const modalContentStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '12px',
  width: '400px',
  position: 'relative',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  color: '#000000',
};

const detailStyle: React.CSSProperties = {
  margin: '10px 0',
  fontSize: '14px',
};

const copyButtonStyle: React.CSSProperties = {
  marginLeft: '10px',
  padding: '5px 10px',
  borderRadius: '4px',
  border: '1px solid #000',
  backgroundColor: '#fff',
  cursor: 'pointer',
  fontSize: '12px',
};

const disconnectButtonStyle: React.CSSProperties = {
  position: 'fixed',
  top: '10px',
  right: '10px',
  padding: '10px',
  borderRadius: '8px',
  border: '1px solid #000',
  backgroundColor: '#fff',
  color: '#000',
  cursor: 'pointer',
  transition: 'background-color 0.25s',
  zIndex: 1001,
};

const networkSelectStyle: React.CSSProperties = {
  marginLeft: '10px',
  padding: '5px',
  borderRadius: '4px',
  border: '1px solid #000',
  backgroundColor: '#fff',
  color: '#000', // Ensure text color is black
  cursor: 'pointer',
  fontSize: '14px',
};