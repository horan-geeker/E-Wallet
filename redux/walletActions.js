export const initWallets = (ethWallets) => (
    {
        type: 'INIT_WALLETS',
        payload: ethWallets,
    }
);

export const addWallet = (walletAddress, balanceOfEther, balanceOfUSD) => (
    {
        type: 'ADD_WALLET',
        payload: {
            address: walletAddress,
            balanceOfEther: balanceOfEther,
            balanceOfUSD: balanceOfUSD
        },
    }
);

export const changeWallet = (address, balanceOfEther, balanceOfUSD) => (
    {
        type: 'CHANGE_WALLET',
        payload: {
            address: address,
            balanceOfEther: balanceOfEther,
            balanceOfUSD: balanceOfUSD
        },
    }
);