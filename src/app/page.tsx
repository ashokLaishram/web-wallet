'use client';
import React, { useState } from 'react';
import MnemonicGenerator from './components/MnemonicGenerator';
import WalletManager from './components/WalletManager';

export default function Home () {
    const [mnemonic, setMnemonic] = useState('');

    return (
        <div style={{ padding: '20px' }}>
            <h1>Web-Based Wallet {mnemonic}</h1>
            <MnemonicGenerator onMnemonicGenerated={setMnemonic} />
            <WalletManager/>
        </div>
    );
};

