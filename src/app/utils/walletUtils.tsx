import { HDNodeWallet, Mnemonic } from 'ethers';

/**
 * Derive a wallet from a mnemonic and a specific index.
 * @param mnemonicPhrase The mnemonic phrase as a string.
 * @param index The index of the derived wallet.
 */
export const deriveWallet = (mnemonicPhrase: string, index: number): HDNodeWallet => {
    const mnemonic = Mnemonic.fromPhrase(mnemonicPhrase); // Convert mnemonic string to Mnemonic object
    const hdNode = HDNodeWallet.fromMnemonic(mnemonic); // Create the root HDNodeWallet

    // Use the `index` directly as a child derivation argument
    const derivedNode = hdNode.deriveChild(index);

    return derivedNode; // Return the derived child node
};
