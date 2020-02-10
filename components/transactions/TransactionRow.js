import React from 'react'
import { Text, View, Image, StyleSheet, TouchableWithoutFeedback, TouchableHighlight, Clipboard, Alert} from 'react-native'
import EthUtils from '../../services/ethUtils'
import Utils from '../../services/Utils'
import { Ionicons } from '@expo/vector-icons';

export default class TransactionRow extends React.Component {
    constructor(props) {
        super(props);
    };

    _copyAddress () {
        const setClipboard = this.props.item.from.toUpperCase() === this.props.address.toUpperCase() ? this.props.item.to : this.props.item.from
        Clipboard.setString(setClipboard)
        Alert.alert('复制成功')
    }

    render() {
        const item = this.props.item;
        return (
            <TouchableHighlight
                underlayColor = {"#ccc"}
                onPress={() => {
                this.props.navigation.navigate('TransactionDetail', {transaction: item, address: this.props.address})
            }}>
                <View style={styles.row}>
                    <View style={styles.leftSection}>
                        <Image
                            source={require('../../assets/images/eth-logo.png')}
                            style={styles.tokenIcon}
                        />
                    </View>
                    <View style={styles.rightSection}>
                        <TouchableWithoutFeedback onPress={this._copyAddress.bind(this)}>
                            <View>
                                <Text>对方钱包地址</Text>
                                <View style={styles.otherWallet}>
                                    <Text>{item.from.toUpperCase() === this.props.address.toUpperCase() ? item.to : item.from} <Ionicons name="md-copy" size={14} /></Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={styles.transferAmountWrapper}>
                            <Text style={styles.transferAmountText}>{item.from.toUpperCase() === this.props.address.toUpperCase() ? '-' : '+'}{EthUtils.WeiToEther(item.value)}</Text>
                        </View>
                        <Text style={styles.transferTime}>{Utils.timestampToString(item.timeStamp)}</Text>
                        <Text>手续费 {EthUtils.WeiToEther(item.gas * item.gasPrice)} ether</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    };
}

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        margin: 4,
        padding: 8,
    },
    leftSection: {
        alignItems: 'center',
        marginTop: 16,
    },
    tokenIcon: {
        width: 50,
        height: 50,
    },
    rightSection: {
        flex: 1,
    },
    otherWallet: {
        flex: 1,
        flexDirection: 'row'
    },
    transferAmountWrapper: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    transferAmountText: {
        marginLeft: 'auto',
        marginTop: 4,
        fontSize: 18,
        fontWeight: 'bold'
    },
    transferTime: {
        marginBottom: 4,
        color: '#999',
    }
})