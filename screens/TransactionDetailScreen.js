import React from 'react'
import { ScrollView, View, Image, StyleSheet, Text } from 'react-native'
import EthUtils from '../services/ethUtils'
import Colors from '../constants/Colors'
import Utils from '../services/Utils'

export default class TransactionDetailScreen extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            transaction: this.props.navigation.getParam('transaction')
        }
    }

    render() {
        const transaction = this.state.transaction
        return (
            <ScrollView style={styles.container}>
                <View style={styles.transactionTop}>
                    <Image
                        source={require('../assets/images/eth-logo.png')}
                        style={styles.tokenIcon}
                    />
                    <Text style={styles.transferAmountText}>{transaction.from.toUpperCase() === this.props.navigation.getParam('address').toUpperCase() ? '-' : '+'}{EthUtils.WeiToEther(transaction.value)}</Text>
                </View>
                <View style={styles.transactionBottom}>
                    <View style={styles.transactionInfoWrapper}>
                        <Text style={styles.transactionDescText}>交易哈希</Text>
                        <Text style={styles.transactionValue} selectable={true}>{transaction.hash}</Text>
                    </View>
                    <View style={styles.transactionInfoWrapper}>
                        <Text style={styles.transactionDescText}>交易时间</Text>
                        <Text style={styles.transactionValue} selectable={true}>{Utils.timestampToString(transaction.timeStamp)}</Text>
                    </View>
                    <View style={styles.transactionInfoWrapper}>
                        <Text style={styles.transactionDescText}>gas数量</Text>
                        <Text style={styles.transactionValue} selectable={true}>{transaction.gas}</Text>
                    </View>
                    <View style={styles.transactionInfoWrapper}>
                        <Text style={styles.transactionDescText}>gas价格</Text>
                        <Text style={styles.transactionValue} selectable={true}>{transaction.gasPrice} wei</Text>
                    </View>
                    <View style={styles.transactionInfoWrapper}>
                        <Text style={styles.transactionDescText}>区块高度</Text>
                        <Text style={styles.transactionValue} selectable={true}>{transaction.blockNumber}</Text>
                    </View>
                    <View style={styles.transactionInfoWrapper}>
                        <Text style={styles.transactionDescText}>区块哈希</Text>
                        <Text style={styles.transactionValue} selectable={true}>{transaction.blockHash}</Text>
                    </View>
                    <View style={styles.transactionInfoWrapper}>
                        <Text style={styles.transactionDescText}>确认数</Text>
                        <Text style={styles.transactionValue} selectable={true}>{transaction.confirmations}</Text>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

TransactionDetailScreen.navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
        title: '交易详情',
        headerStyle: {
        },
    }
};

const styles = StyleSheet.create({
    container: {
        // backgroundColor: Colors.screenBackgroundColor
    },
    tokenIcon: {
        height: 50,
        width: 50,
    },
    transactionTop: {
        margin: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    transferAmountText: {
        marginTop: 20,
        fontSize: 26,
        fontWeight: 'bold',
    },
    transactionInfoWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        height: 50,
        borderBottomWidth: 0.4,
        borderBottomColor: '#ccc',
    },
    transactionDescText: {
        marginRight: 8,
        color: '#666'
    },
    transactionValue: {
        flex: 1,
        textAlign: 'right'
    }
})