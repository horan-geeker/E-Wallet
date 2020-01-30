import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Button} from 'react-native'
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class QRCodeScanScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            scanned: null,
            hasScanned: false
        }
    }

    _handleBarCodeScanned(result) {
        if (this.state.hasScanned) {
            return
        }
        this.setState({
            hasScanned: true,
        })
        this.props.navigation.goBack()
        // todo local storage
        alert(`Bar code with type ${result.type} and data ${result.data} has been scanned!`);
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
