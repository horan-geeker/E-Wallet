import React from 'react'
import { Text, View, Image, StyleSheet, TouchableWithoutFeedback, TouchableHighlight} from 'react-native'
import {FontAwesome} from '@expo/vector-icons';
import Colors from '../../constants/Colors'

export default class WalletCard extends React.Component {
    constructor(props) {
        super(props);
    };

    _pressQRCode() {
        this.props.navigation.navigate('WalletDetail', {
            wallet: this.props.item
        })
    }

    _blurAddress(address) {
        if (address.length > 24) {
            return address.substr(0, 12) + '****' + address.substr(-12, 12)
        }
        return address
    }

    render() {
        const item = this.props.item;
        return (
            <View style={styles.card}>
                <View style={styles.leftSection}>
                    <View style={styles.tokenIconWrapper}>
                        <Image
                            source={require('../../assets/images/eth-logo.png')}
                            style={styles.tokenIcon}
                        />
                    </View>
                </View>
                <View style={styles.rightSection}>
                    <Text style={styles.tokenName}>ETH</Text>
                    <TouchableWithoutFeedback onPress={this._pressQRCode.bind(this)}>
                        <View style={styles.touchableAddress}>
                            <Text style={styles.tokenAddress}>{this._blurAddress(item.address)}</Text>
                            <FontAwesome style={styles.tokenAddressQRCode} name="qrcode" size={14}/>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.tokenBalance}>
                        <Text style={styles.USDBalance}>Ether 余额: </Text>
                        <Text style={styles.etherBalance}>{item.balanceOfEther}</Text>
                        <Text style={styles.USDBalance}>/${item.balanceOfUSD}</Text>
                    </View>
                    <View style={styles.operate}>
                        <TouchableHighlight style={styles.transaction}>
                            <Text style={styles.transactionText}>交易列表</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.transfer}>
                            <Text style={styles.transferText}>转账</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 4,
        height: 120,
        margin: 10,
        backgroundColor: '#fff',
    },
    leftSection: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    tokenIconWrapper: {
        borderWidth: 1,
        borderRadius: 35,
        borderColor: '#eee',
        padding: 5,
        margin: 5,
    },
    tokenIcon: {
        height: 50,
        width: 50,
    },
    rightSection: {
        flex: 1,
        flexDirection: 'column',
        padding: 4,
    },
    tokenName: {
        marginTop: 6,
        fontSize: 16,
        color: '#666',
    },
    touchableAddress: {
        paddingTop: 4,
        paddingBottom: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    tokenAddress: {
        fontSize: 14,
        color: '#666',
    },
    tokenAddressQRCode: {
        marginLeft: 10,
        fontSize: 16,
        color: '#666',
    },
    tokenBalance: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 8,
    },
    etherBalance: {
        marginRight: 4,
        marginLeft: 4,
        fontSize: 18,
        fontWeight: 'bold',
    },
    USDBalance: {
        fontSize: 12,
    },
    operate: {
        flex: 1,
        flexDirection: 'row',
    },
    transaction: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.eWalletTheme,
        borderRadius: 4,
        margin: 2,
    },
    transactionText: {
        color: '#fff',
    },
    transfer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.ether,
        borderRadius: 4,
        margin: 2,
    },
    transferText: {
        color: '#fff',
    },
})