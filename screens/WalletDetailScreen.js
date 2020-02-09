import React from 'react';
import { View, Image, StyleSheet, Text, TouchableWithoutFeedback, Alert, Clipboard} from 'react-native'
import { Ionicons } from '@expo/vector-icons';

export default class WalletDetailScreen extends React.Component {

    constructor(props) {
        super(props)
        const wallet = this.props.navigation.getParam('wallet')
        this.state = {
            address: wallet.address,
        }
    }

    _copyAddress() {
        Clipboard.setString(this.state.address)
        Alert.alert('复制成功')
    }

    render() {
        const qrcode = require('yaqrcode')
        return (
            <View style={styles.container}>
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Image
                            style={styles.cardHeaderLogo}
                            source={require("../assets/images/eth-logo.png")}
                        />
                        <Text style={styles.walletAddressDesc}>ETH 钱包</Text>
                        <TouchableWithoutFeedback underlayColor={'#334455'} onPress={this._copyAddress.bind(this)}>
                            <View style={styles.walletAddressAndCopy}>
                                <Text style={styles.walletAddress}>{this.state.address}</Text>
                                <Ionicons name="ios-copy" size={14} color="white" />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.cardFooter}>
                        <Text style={styles.qrCodeTips}>扫描二维码支付 ETH 到该地址</Text>
                        <Image
                            style={styles.qrCode}
                            source={{ uri: qrcode(this.state.address) }}
                    />
                    </View>
                </View>
            </View>
        );
    }
}

WalletDetailScreen.navigationOptions = {
    title: '收款',
    tabBarVisible: false,
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#334455',
    },
    card: {
        alignItems: 'center',
        margin: 20,
        marginTop: "10%",
        backgroundColor: '#fff',
        borderRadius: 6,
    },
    cardHeader:  {
        marginBottom: 40,
        alignItems: 'center',
        width: "100%",
        backgroundColor: '#5ac3ed',
        borderRadius: 6,
        paddingTop: 10,
        paddingBottom: 10,
    },
    cardHeaderLogo: {
        height: 50,
        width: 30,
    },
    walletAddressDesc: {
        marginTop: 10,
        marginBottom: 10,
        color: '#fff',
    },
    walletAddressAndCopy: {
        flexDirection: 'row',
    },
    walletAddress: {
        marginRight: 4,
        color: '#fff',
        fontSize: 12,
    },
    qrCodeTips: {
        textAlign: 'center',
    },
    qrCode: {
        marginTop: 30,
        marginBottom: 60,
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
});

