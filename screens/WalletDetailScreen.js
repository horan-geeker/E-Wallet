import React, {useState, useEffect} from 'react';
import {View, Image} from 'react-native'

const qrcode = require('yaqrcode')

export default class WalletDetailScreen extends React.Component {

    constructor(props) {
        super(props)
        const wallet = this.props.navigation.getParam('wallet')
        this.state = {
            address: wallet.address
        }
    }

    render() {
        return (
            <View style={{
                    flex: 1,
                    flexDirection: 'column',
                }}>
                <Image
                    style={{marginTop: 100, width: 200, height: 200}}
                    source={{ uri: qrcode(this.state.address) }}
                    />
            </View>
        );
    }
}

WalletDetailScreen.navigationOptions = {
    header: null,
    tabBarVisible: false,
}
