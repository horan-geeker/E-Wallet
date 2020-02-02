import React from 'react';
import {SafeAreaView, StyleSheet, FlatList, Picker, Text} from 'react-native';
import TransactionRow from '../components/transactions/TransactionRow'
import BlockchainApi from '../services/blockchainApi'
import Storage from '../services/storage'
import StorageConstant from '../constants/Storage'
import {Ionicons} from '@expo/vector-icons';

const blockchainApi = new BlockchainApi();
const storage = new Storage()

export default class TransactionsScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showAddressSelect: false,
            currentAddress: null,
            transactions: [],
            ethWallets: [],
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text>当前地址: {this.state.currentAddress}</Text>
                <FlatList
                    data={this.state.transactions}
                    renderItem={({item}) => <TransactionRow item={item}/>}
                    keyExtractor={(item, index) => index.toString()}
                />
                <Picker
                    mode="dropdown"
                    selectedValue={this.state.currentAddress}
                    style={[styles.addressSelect, this.state.showAddressSelect && styles.showDisplay]}
                    onValueChange={(itemValue, itemIndex) => {
                        this.setState({
                            currentAddress: itemValue
                        })
                        this._changeAddressSelectDisplay()
                        this._getTransactionsByAddress(itemValue)
                    }
                    }>
                    {this.state.ethWallets.map((item, index) => {
                        return (
                            <Picker.Item label={item} value={item} key={index}/>
                        );
                    })}
                </Picker>
            </SafeAreaView>
        );
    }

    _getTransactionsByAddress(address) {
        blockchainApi.getTransactionByAddress('eth', address).then((response) => {
            if (response.status === '1') {
                this.setState({
                    transactions: response.result
                })
            } else {
                console.log(response)
            }
        })
    }

    async _getWalletList() {
        const result = await storage.get(StorageConstant.ETH_WALLETS)
        if (result !== null) {
            const ethWallets = JSON.parse(result)
            this.setState({
                ethWallets: ethWallets,
                currentAddress: ethWallets[0],
            })
            this._getTransactionsByAddress(ethWallets[0])
        }
    }

    _changeAddressSelectDisplay() {
        this.setState({
            showAddressSelect: !this.state.showAddressSelect,
        })
    }

    componentDidMount() {
        this._getWalletList()
        // 设置跳转路由的参数
        this.props.navigation.setParams({
            showAddressSelect: this._changeAddressSelectDisplay.bind(this)
        });
    };
}

TransactionsScreen.navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
        title: '账单',
        headerRight: <Ionicons
            name='md-list'
            size={26}
            onPress={async () => {
                params.showAddressSelect()
            }}
        />,
        headerStyle: {
            marginLeft: 8,
            marginRight: 8,
        },
    }
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    addressSelect: {
        position: 'relative',
        display: 'none',
    },
    showDisplay: {
        display: 'flex',
    }
});
