export default function (state, action) {
    switch (action.type) {
        case 'INIT_WALLETS':
            return Object.assign({}, state, {
                ethWallets: action.payload
            })
        case 'ADD_WALLET':
            return Object.assign({}, state, {
                ethWallets: [...state.ethWallets, action.payload]
            })
        case 'CHANGE_WALLET':
            return Object.assign({}, state, {
                ethWallets: state.ethWallets.map((ethWallet, index) => {
                    if (ethWallet.address === action.payload.address) {
                        return Object.assign({}, ethWallet, {
                            balanceOfEther: action.payload.balanceOfEther,
                            balanceOfUSD: action.payload.balanceOfUSD
                        })
                    }
                    return ethWallet
                })
            })
        default:
            return {
                ethWallets: []
            }
    }
};