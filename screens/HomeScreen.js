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

const blockchainApi = new BlockchainApi();

export default class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            wallets: {
                eth: [
                    {
                        data: [
                            {
                                address: '0xb71c8D4f8c650C09216c8C8441f16E86f3610Ad7',
                                balanceOfEther: 'loading...',
                                balanceOfUSD: 'loading...',
                            },
                            {
                                address: '0xb71c8D4f8c650C09216c8C8441f16E86f3610Ad7',
                                balanceOfEther: 'loading...',
                                balanceOfUSD: 'loading...',
                            },
                        ]
                    }
                ]
            },
            blockNumber: 'loading...',
            addressFormModalVisible: false
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

    componentDidMount() {
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
        blockchainApi.getBlockNumber('eth').then((response) => {
            const ethBlockNumber = parseInt(response.result, 16)
            this.setState({
                blockNumber: ethBlockNumber
            })
        })
    };

}

HomeScreen.navigationOptions = ({navigation}) => {
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
                navigation.navigate('QRCodeScan')
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
