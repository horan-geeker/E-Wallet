import React from 'react'
import {Text, View, Image, StyleSheet, TouchableHighlight} from 'react-native'
import {FontAwesome} from '@expo/vector-icons';

export default class WalletCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.item
        };
    };

    _pressQRCode() {
        this.props.navigation.navigate('WalletDetail', {
            wallet: this.state.item
        })
    }

    render() {
        const item = this.state.item;
        return (
            <View style={styles.card}>
                <View style={styles.leftSection}>
                    <Image
                        source={require('../../assets/images/eth_64.png')}
                        style={styles.tokenIcon}
                    />
                    <Text style={styles.tokenName}>
                        ETH
                    </Text>
                </View>
                <View style={styles.rightSection}>
                    <TouchableHighlight style={{ flex: 1 }} onPress={this._pressQRCode.bind(this)}>
                        <View style={styles.rightTopSection}>
                            <Text style={styles.tokenAddress}>{item.address}</Text>
                            <FontAwesome style={styles.tokenAddressQRCode} name="qrcode" size={16}/>
                        </View>
                    </TouchableHighlight>
                    <View style={styles.rightBottomSection}>
                        <Text style={styles.tokenBalance}>Ether: {item.balanceOfEther}</Text>
                        <Text>USD: {item.balanceOfUSD}</Text>
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
        borderRadius: 6,
        backgroundColor: '#008fa8',
        height: 100,
        padding: 10,
    },
    leftSection: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eeeeee',
    },
    rightSection: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#333333'
    },
    rightTopSection: {
        flex: 1,
        flexDirection: 'row',
        padding: 4,
    },
    rightBottomSection: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#666'
    },
    tokenIcon: {
        height: 50,
        width: 50,
    },
    tokenName: {
        fontSize: 18,
    },
    tokenAddress: {
        width: '80%',
        fontSize: 12,
    },
    tokenAddressQRCode: {
        lineHeight: 24,
        fontSize: 16,
    },
    tokenBalance: {
        borderRightColor: '#fff',
        borderRightWidth: 10,
    }
})