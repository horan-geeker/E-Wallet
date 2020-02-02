import React from 'react'
import {Text, View, Image, StyleSheet, TouchableHighlight} from 'react-native'
import {FontAwesome} from '@expo/vector-icons';
import EthUtils from '../../services/ethUtils'

export default class TransactionRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.item
        };
    };

    render() {
        const item = this.state.item;
        return (
            <View style={styles.row}>
                <Text>转出地址{this.state.item.from}</Text>
                <Text>转入地址{this.state.item.to}</Text>
                <Text>转账 {EthUtils.WeiToEther(this.state.item.value)} ether</Text>
                <Text>手续费 {EthUtils.WeiToEther(this.state.item.gas * this.state.item.gasPrice)} ether</Text>
                <Text>时间{this.state.item.timeStamp}</Text>
                <Text>gas数量{this.state.item.gas}</Text>
                <Text>gas价格 {this.state.item.gasPrice} wei</Text>
                <Text>交易哈希: {this.state.item.hash}</Text>
                <Text>区块哈希{this.state.item.blockNumber}</Text>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    row: {
        flex: 1,
        backgroundColor: '#07a7f2',
        margin: 4,
    }
})