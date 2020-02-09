import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    RefreshControl,
    SafeAreaView,
    Alert,
} from 'react-native';
import BlockchainApi from '../services/blockchainApi'
import EthUtils from  '../services/ethUtils'
import WalletCard from '../components/home/WalletCard'
import { Ionicons } from '@expo/vector-icons';
import {BarCodeScanner} from 'expo-barcode-scanner';
import Storage from '../services/storage'
import StorageConstant from '../constants/Storage'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { initWallets, addWallet, changeWallet } from '../redux/walletActions'

const blockchainApi = new BlockchainApi();
const storage = new Storage();

class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            ethWallets: [],
            latestBlockHeight: 'loading...',
            ethToUSDExchangeRate: '*',
        }
    };

    _renderHeader() {
        return (
            <View>
                <View style={styles.latestBlockHeight}>
                    <Text style={styles.latestBlockHeightText}>
                        当前同步区块高度 {this.state.latestBlockHeight}
                    </Text>
                </View>
                <View style={styles.latestBlockHeight}>
                    <Text>
                        当前 ETH/USD 汇率 ${this.state.ethToUSDExchangeRate}/ETH
                    </Text>
                </View>
            </View>
        )
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    ListHeaderComponent={this._renderHeader.bind(this)}
                    data={this.props.ethWallets}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <WalletCard item={item} ethToUSDExchangeRate={this.state.ethToUSDExchangeRate} navigation={this.props.navigation}/>}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor={"#ffffff"}
                            refreshing={this.state.refreshing}
                            onRefresh={() => {
                                this._onRefresh();
                            }}
                        />
                    }
                />
            </SafeAreaView>
        );
    };

    async _onRefresh() {
        this.setState({
            refreshing: true,
        })
        await this._initWallet()
        this._fetchLatestBlockHeight().then(() => {
            this._fetchWalletInfo().then(() => {
                this.setState({
                    refreshing: false,
                })
            })
        })
    }

    async _getAllWallet() {
        const wallets = await storage.get(StorageConstant.ETH_WALLETS)
        return JSON.parse(wallets)
    }

    _fetchWalletInfo() {
        // 获取各个钱包的信息
        return blockchainApi.getTokenToUSDPrice('eth').then((exchangeRateResponse) => {
            this.setState({
                ethToUSDExchangeRate: exchangeRateResponse.USD
            })
            for (let i = 0; i < this.props.ethWallets.length; i++) {
                blockchainApi.getBalance('eth', this.props.ethWallets[i].address).then((response) => {
                    const balanceWei = parseInt(response.result, 16)
                    this.props.changeWallet(this.props.ethWallets[i].address, EthUtils.numberFix(EthUtils.WeiToEther(balanceWei), 4), EthUtils.numberFix(EthUtils.WeiToUSD(balanceWei, this.state.ethToUSDExchangeRate), 2))
                })
            }
        })
    }

    async _initWallet() {
        const wallets = await this._getAllWallet()
        if (wallets === null) {
            return
        }
        console.log('init wallet', wallets)
        const ethWallets = []
        for (let i=0; i<wallets.length; i++) {
            ethWallets.push({
                address: wallets[i], 
                balanceOfEther: '*',
                balanceOfUSD: '*'
            })
        }
        this.props.initWallets(ethWallets)
    }

    _fetchLatestBlockHeight() {
        // 异步获取最新区块高度
        return blockchainApi.getBlockNumber('eth').then((response) => {
            const ethLatestBlockHeight = parseInt(response.result, 16)
            this.setState({
                latestBlockHeight: ethLatestBlockHeight
            })
        })
    }

    async handleQRCodeScanned(address) {
        console.log('handleQRCodeScanned', address)
        if (address.length >= 40) {
            const res = address.split(':')
            if (res.length == 2 && res[1].length >= 40) {
                address = res[1]
            }
            await storage.pushListUnique(StorageConstant.ETH_WALLETS, address)
            this.props.addWallet(address)
            // request new wallet info
            blockchainApi.getBalance('eth', address).then((response) => {
                const balanceWei = parseInt(response.result, 16)
                this.props.changeWallet(address, EthUtils.numberFix(EthUtils.WeiToEther(balanceWei), 4), EthUtils.numberFix(EthUtils.WeiToUSD(balanceWei, this.state.ethToUSDExchangeRate), 2))
            })
            return true
        }
        Alert.alert('二维码不是 eth 地址，请重新扫描')
        return false
    }

    componentDidMount() {
        // 设置 navigation 传递的参数
        this.props.navigation.setParams({
            handleQRCodeScanned: this.handleQRCodeScanned.bind(this)
        });

        this._fetchLatestBlockHeight()
        
        this._initWallet()
        // 获取钱包信息
        this._fetchWalletInfo()
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
            style={{marginRight: 8}}
            name='ios-add-circle-outline'
            size={26}
            onPress={async () => {
                const { status } = await BarCodeScanner.requestPermissionsAsync();
                navigation.navigate('QRCodeScan', { handleQRCodeScanned: params.handleQRCodeScanned})
            }}
        />,
        headerStyle: {
        }
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
    },
    latestBlockHeight: {
        padding: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    latestBlockHeightText: {
        fontWeight: 'bold',
    }
});

const mapStateToProps = (state) => {
    return { ethWallets: state.ethWallets }
};

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({
        initWallets, addWallet, changeWallet
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)