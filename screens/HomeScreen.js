import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    SectionList,
} from 'react-native';
import BlockchainApi from '../services/blockchainApi'
import EthUtils from  '../services/ethUtils'
import WalletCard from '../components/home/WalletCard'
import { Ionicons } from '@expo/vector-icons';
import {BarCodeScanner} from 'expo-barcode-scanner';
import Storage from '../services/storage'
import StorageConstant from '../constants/Storage'

const blockchainApi = new BlockchainApi();

const storage = new Storage()

export default class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            wallets: {
                eth: [
                    {
                        data: []
                    }
                ]
            },
            blockNumber: 'loading...',
        };
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>
                    当前同步区块高度 {this.state.blockNumber}
                </Text>
                <SectionList
                    sections={this.state.wallets.eth}
                    renderItem={this._renderItem.bind(this)}
                    keyExtractor={(item, index) => index}
                />
            </View>
        );
    };

    _renderItem(item) {
        return (
            <WalletCard item={item.item} navigation={this.props.navigation}/>
        );
    };

    async _refreshWallet() {
        // todo use redux 共享数据到其他 tab 页，这里也读取 redux 的数据，写入操作放在 qrcodescan 里
        console.log('refresh wallet')
        // 首先初始化钱包
        const result = await storage.get(StorageConstant.ETH_WALLETS)
        console.log('eth wallets:', result)
        if (result !== null) {
            const ethWalletState = [
                {
                    data: []
                }
            ]
            const ethWallets = JSON.parse(result)
            for (let i = 0; i < ethWallets.length; i++) {
                ethWalletState[0].data.push({
                    address: ethWallets[i],
                    balanceOfEther: 'loading...',
                    balanceOfUSD: 'loading...',
                })
            }
            this.setState({
                wallets: {
                    eth: ethWalletState
                }
            })
        }
        // 获取各个钱包的信息
        blockchainApi.getTokenToUSDPrice('eth').then((exchangeRateResponse) => {
            for (let i=0; i < this.state.wallets.eth[0].data.length; i++) {
                let ethWalletsState = this.state.wallets.eth
                blockchainApi.getBalance('eth', ethWalletsState[0].data[i].address).then((response) => {
                    const balanceWei = parseInt(response.result, 16)
                    ethWalletsState[0].data[i].balanceOfEther = EthUtils.numberFix(EthUtils.WeiToEther(balanceWei), 4)
                    ethWalletsState[0].data[i].balanceOfUSD = EthUtils.numberFix(EthUtils.WeiToUSD(balanceWei, exchangeRateResponse.USD), 2)
                    this.setState({
                        wallets: {
                            eth: ethWalletsState
                        }
                    })
                });
            }
        })
    }

    componentDidMount() {
        // 异步获取当前区块
        blockchainApi.getBlockNumber('eth').then((response) => {
            const ethBlockNumber = parseInt(response.result, 16)
            this.setState({
                blockNumber: ethBlockNumber
            })
        })
        // 设置跳转路由的参数
        this.props.navigation.setParams({
            refreshWallet: this._refreshWallet.bind(this)
        });
        this._refreshWallet()
    };

}

HomeScreen.navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
        title: '钱包',
        // headerLeft: <Ionicons
        //     name='ios-menu'
        //     size={26}
        // />,
        headerRight: <Ionicons
            name='ios-add-circle-outline'
            size={26}
            onPress={async () => {
                const { status } = await BarCodeScanner.requestPermissionsAsync();
                navigation.navigate('QRCodeScan', {refreshWallet: params.refreshWallet})
            }}
        />,
        headerStyle: {
            marginLeft: 8,
            marginRight: 8,
        }
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
