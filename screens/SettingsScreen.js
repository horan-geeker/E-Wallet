import React from 'react';
import { View, Text, SectionList, SectionContent, StyleSheet, Item } from 'react-native';

export default class SettingsScreen extends React.Component {
    render() {
        const sections = [
            {data: ['infura'], title: '网络配置'},
            {data: ['中文', '英文'], title: '语言设置'},
            {data: ['请作者喝咖啡', '项目详情'], title: '关于我们'},
        ]


        const DATA = [
            {
                title: 'Main dishes',
                data: ['Pizza', 'Burger', 'Risotto'],
            },
            {
                title: 'Sides',
                data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
            },
            {
                title: 'Drinks',
                data: ['Water', 'Coke', 'Beer'],
            },
            {
                title: 'Desserts',
                data: ['Cheese Cake', 'Ice Cream'],
            },
        ];


        return (
            <View>
                <SectionList
                    sections={DATA}
                    renderItem={({ item }) => <Item title={item} />}
                    keyExtractor={(item, index) => index}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={styles.header}>{title}</Text>
                    )}
                />
            </View>
        )
    }

    _renderItem = ({ item }) => {
        return <Item title={item} />
    }
}
{/*<SectionList*/}
    {/*style={styles.container}*/}
    {/*renderItem={this._renderItem}*/}
    {/*// renderSectionHeader={this._renderSectionHeader}*/}
    {/*// stickySectionHeadersEnabled={true}*/}
    {/*// keyExtractor={(item, index) => index}*/}
    {/*// ListHeaderComponent={ListHeader}*/}
    {/*sections={sections}*/}
{/*/>*/}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});

SettingsScreen.navigationOptions = {
    title: '设置',
};
