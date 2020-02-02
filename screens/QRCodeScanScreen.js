import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Button} from 'react-native'
import {BarCodeScanner} from 'expo-barcode-scanner';
import Storage from '../services/storage'
import StorageConstant from '../constants/Storage'

const storage = new Storage()

export default class QRCodeScanScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            scanned: null,
            hasScanned: false
        }
    }

    async _handleBarCodeScanned(result) {
        if (this.state.hasScanned) {
            return
        }
        this.setState({
            hasScanned: true,
        })
        await storage.pushListUnique(StorageConstant.ETH_WALLETS, result.data)
        this.props.navigation.state.params.refreshWallet()
        this.props.navigation.goBack()
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                }}>
                <BarCodeScanner
                    onBarCodeScanned={this.scanned ? undefined : this._handleBarCodeScanned.bind(this)}
                    style={StyleSheet.absoluteFillObject}
                />
            </View>
        );
    }
}

QRCodeScanScreen.navigationOptions = {
    header: null,
    tabBarVisible: false,
}
