import React from 'react';
import { SafeAreaView, TouchableWithoutFeedback, View, StyleSheet, FlatList, Picker, Text, RefreshControl} from 'react-native';
import TransactionRow from '../components/transactions/TransactionRow'
import BlockchainApi from '../services/blockchainApi'
import {Ionicons} from '@expo/vector-icons';
import Colors from '../constants/Colors'
import { connect } from 'react-redux';

const blockchainApi = new BlockchainApi();

class TransactionsScreen extends React.Component {

    constructor(props) {
        super(props)
        let currentAddress = null
        if (props.ethWallets.length > 0) {
            currentAddress = props.ethWallets[0].address
        }
        this.state = {
            refreshing: false,
            showAddressSelect: false,
            currentAddress: currentAddress,
            transactions: [],
        }
    }

    _onRefresh() {
        this.setState({
            refreshing: true
        })
        this._getTransactionsByAddress(this.state.currentAddress).then(() => {
            this.setState({
                refreshing: false
            })
        })
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <TouchableWithoutFeedback onPress={this._changeAddressSelectDisplay.bind(this)}>
                        <View style={styles.addressPicker}>
                            <Text style={styles.addressPickerText}>{this.state.currentAddress}</Text>
                            <Ionicons style={styles.addressPickerIcon} name="ios-arrow-dropdown" size={14}/>
                        </View>
                    </TouchableWithoutFeedback>
                    <Picker
                        mode="dropdown"
                        selectedValue={this.state.currentAddress}
                        style={[styles.addressSelect, this.state.showAddressSelect && styles.showDisplay]}
                        onValueChange={(itemValue, itemIndex) => {
                            this.setState({
                                currentAddress: itemValue
                            })
                            this._changeAddressSelectDisplay()
                            this._onRefresh()
                        }
                        }>
                        {this.props.ethWallets.map((item, index) => {
                            return (
                                <Picker.Item label={item.address} value={item.address} key={index} />
                            );
                        })}
                    </Picker>
                </View>
                <FlatList
                    data={this.state.transactions}
                    renderItem={({ item }) => <TransactionRow item={item} address={this.state.currentAddress} navigation={this.props.navigation}/>}
                    keyExtractor={(item, index) => index.toString()}
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
    }

    _getTransactionsByAddress() {
        this.setState({
            transactions: []
        })
        return blockchainApi.getTransactionByAddress('eth', this.state.currentAddress).then((response) => {
            if (response != undefined && response.status === '1') {
                this.setState({
                    transactions: response.result
                })
            } else {
                console.log(response)
            }
        })
    }

    _changeAddressSelectDisplay() {
        this.setState({
            showAddressSelect: !this.state.showAddressSelect,
        })
    }

    componentDidMount() {
        this._onRefresh()
        // 设置 navigation 的参数
        // this.props.navigation.setParams({
        //     showAddressSelect: this._changeAddressSelectDisplay.bind(this)
        // });
    };
}

TransactionsScreen.navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
        title: '账单',
        // headerRight: <Ionicons
        //     style={{ marginRight: 8 }}
        //     name='md-list'
        //     size={26}
        //     onPress={async () => {
        //         params.showAddressSelect()
        //     }}
        // />,
        headerStyle: {
        },
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.screenBackgroundColor
    },
    addressPicker: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
    },
    addressPickerText: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    addressPickerIcon: {
        marginLeft: 2,
    },
    addressSelect: {
        position: 'relative',
        display: 'none',
    },
    showDisplay: {
        display: 'flex',
    }
});

const mapStateToProps = (state) => {
    const { ethWallets } = state
    return { ethWallets }
};
export default connect(mapStateToProps)(TransactionsScreen)