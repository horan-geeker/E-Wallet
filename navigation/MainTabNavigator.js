import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import TransactionsScreen from '../screens/TransactionsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import QRCodeScanScreen from '../screens/QRCodeScanScreen';
import WalletDetailScreen from '../screens/WalletDetailScreen'

const config = Platform.select({
    web: {headerMode: 'screen'},
    default: {},
});

const HomeStack = createStackNavigator(
    {
        Home: HomeScreen,
        QRCodeScan: QRCodeScanScreen,
        WalletDetail: WalletDetailScreen,
    },
);

HomeStack.navigationOptions = ({ navigation }) => {
    // 隐藏 tabbar
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }
    return {
        tabBarLabel: '钱包',
        tabBarIcon: ({focused}) => (
            <TabBarIcon
                focused={focused}
                name={
                    Platform.OS === 'ios' ? 'md-wallet' : 'md-wallet'
                }
            />
        ),
        tabBarVisible: tabBarVisible
    }

};

HomeStack.path = '';

const TransactionsStack = createStackNavigator(
    {
        Transactions: TransactionsScreen,
    },
    config
);

TransactionsStack.navigationOptions = {
    tabBarLabel: '账单',
    tabBarIcon: ({focused}) => (
        <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'md-paper' : 'md-paper'}/>
    ),
};

TransactionsStack.path = '';

const SettingsStack = createStackNavigator(
    {
        Settings: SettingsScreen,
    },
    config
);

SettingsStack.navigationOptions = {
    tabBarLabel: '设置',
    tabBarIcon: ({focused}) => (
        <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}/>
    ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
    HomeStack, TransactionsStack, SettingsStack,
});

tabNavigator.path = '';

export default tabNavigator;
