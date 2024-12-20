import React, { useState } from 'react';
import { HDNodeWallet, Mnemonic } from 'ethers';

interface Wallet {
    index: number;
    address: string;
}

const WalletManager: React.FC = () => {
    const [mnemonic, setMnemonic] = useState<string | null>(null);
    const [wallets, setWallets] = useState<Wallet[]>([]);

    const handleGenerateMnemonic = () => {
        const hdWallet = HDNodeWallet.createRandom();
    
        if (hdWallet.mnemonic) {
            setMnemonic(hdWallet.mnemonic.phrase); // Safely access the mnemonic phrase
            setWallets([]); // Reset wallets
        } else {
            console.error('Mnemonic is null. Unable to generate a mnemonic phrase.');
            alert('Failed to generate a mnemonic. Please try again.');
        }
    };
    

    // Add a new wallet derived from the mnemonic
    const handleAddWallet = () => {
        if (!mnemonic) {
            alert('Please generate a mnemonic first.');
            return;
        }

        try {
            const mnemonicObj = Mnemonic.fromPhrase(mnemonic); // Validate and convert to Mnemonic
            const hdNode = HDNodeWallet.fromMnemonic(mnemonicObj); // Create HDNodeWallet from Mnemonic
            const newIndex = wallets.length; // Use the next available index
            const derivedWallet = hdNode.deriveChild(newIndex); // Derive child wallet

            // Add the new wallet to the state
            setWallets([
                ...wallets,
                { index: newIndex, address: derivedWallet.address },
            ]);
        } catch (error) {
            console.error('Error deriving wallet:', error);
            alert('Failed to derive wallet. Please check your mnemonic.');
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Web-Based Wallet Manager</h1>

            <div style={{ marginBottom: '20px' }}>
                <button onClick={handleGenerateMnemonic} style={{ padding: '10px 20px', marginRight: '10px' }}>
                    Generate Mnemonic
                </button>
                <button onClick={handleAddWallet} style={{ padding: '10px 20px' }}>
                    Add Wallet
                </button>
            </div>

            {mnemonic && (
                <div style={{ marginBottom: '20px' }}>
                    <h3>Your Mnemonic:</h3>
                    <p style={{ fontSize: '16px', fontFamily: 'monospace' }}>{mnemonic}</p>
                </div>
            )}

            <div>
                <h3>Wallets:</h3>
                {wallets.length === 0 ? (
                    <p>No wallets added yet.</p>
                ) : (
                    <ul>
                        {wallets.map((wallet) => (
                            <li key={wallet.index} style={{ marginBottom: '10px' }}>
                                <strong>Index:</strong> {wallet.index} <br />
                                <strong>Address:</strong> {wallet.address}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default WalletManager;
