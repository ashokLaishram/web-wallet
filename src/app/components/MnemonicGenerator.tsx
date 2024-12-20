import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { ethers } from 'ethers';

interface MnemonicGeneratorProps {
    onMnemonicGenerated: (mnemonic: string) => void;
}

const MnemonicGenerator: React.FC<MnemonicGeneratorProps> = ({ onMnemonicGenerated }) => {
    const [mnemonic, setMnemonic] = useState<string>('');

    const generateMnemonic = () => {
        const wallet = ethers.Wallet.createRandom();
        const newMnemonic = wallet.mnemonic?.phrase ?? 'Mnemonic generation failed.';
        setMnemonic(newMnemonic);
        onMnemonicGenerated(newMnemonic);
    };

    return (
        <div style={{ margin: '20px' }}>
            <Typography variant="h6">Generate Mnemonic</Typography>
            <Button variant="contained" onClick={generateMnemonic} style={{ marginTop: '10px' }}>
                Generate
            </Button>
            {mnemonic && (
                <TextField
                    fullWidth
                    value={mnemonic}
                    variant="outlined"
                    style={{ marginTop: '20px' }}
                    InputProps={{ readOnly: true }}
                />
            )}
        </div>
    );
};

export default MnemonicGenerator;
