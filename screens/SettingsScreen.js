import React from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

export default class SettingsScreen extends React.Component {
    render() {
        const sections = [
            { data: [
                { value: 'Infura' },
                // { value: 'QuikNode' },
                // {value: '自定义 ETH 节点'}
                ], title: '网络节点设置' },
            { data: [
                { value: '中文'},
                // {value: '英文'},
                ], title: '语言' },
            { data: [{ value: '检查更新' },], title: '系统设置' },
            { data: [{ value: '支持一下' }, { value: '项目详情' }], title: '关于我们' },
        ];

        return (
            <SectionList
                style={styles.container}
                renderItem={this._renderItem}
                renderSectionHeader={this._renderSectionHeader}
                stickySectionHeadersEnabled={true}
                keyExtractor={(item, index) => index}
                sections={sections}
            />
        );
    }

    _renderSectionHeader = ({ section }) => {
        return <SectionHeader title={section.title} />;
    };

    _renderItem = ({ item }) => {
        return (
            <SectionContent>
                <Text style={styles.sectionContentText}>{item.value}</Text>
            </SectionContent>
        );
    };
}

const SectionHeader = ({ title }) => {
    return (
        <View style={styles.sectionHeaderContainer}>
            <Text style={styles.sectionHeaderText}>{title}</Text>
        </View>
    );
};

const SectionContent = props => {
    return <View style={styles.sectionContentContainer}>{props.children}</View>;
};

function handleHelpPress() {
    WebBrowser.openBrowserAsync(
        'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
    );
}

SettingsScreen.navigationOptions = {
    title: '设置',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    sectionHeaderContainer: {
        backgroundColor: '#fbfbfb',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#ededed',
    },
    sectionHeaderText: {
        fontSize: 20,
    },
    sectionContentContainer: {
        paddingTop: 8,
        paddingBottom: 12,
        paddingHorizontal: 15,
    },
    sectionContentText: {
        color: '#808080',
        fontSize: 16,
    },
});
