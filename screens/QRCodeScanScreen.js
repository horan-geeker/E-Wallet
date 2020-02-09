import React from 'react';
import {View, StyleSheet, Text, Button, Alert} from 'react-native'
import {BarCodeScanner} from 'expo-barcode-scanner';
import Storage from '../services/storage'
import StorageConstant from '../constants/Storage'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addWallet} from '../redux/walletActions'
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const storage = new Storage()

class QRCodeScanScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            scanned: false,
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
        
        if (!await this.props.navigation.getParam('handleQRCodeScanned')(result.data)) {
            setTimeout(() => {
                this.setState({
                    hasScanned: false,
                })
            }, 2000)
            return
        }
        this.props.navigation.goBack()
    }

    async selectImage(imageUri) {
        const result = await BarCodeScanner.scanFromURLAsync(imageUri)
        if (result.length === 0) {
            Alert.alert('该图片未识别到二维码，请重新选择')
            return
        }
        console.log('scan qrcode from album:', result)
        this.props.navigation.getParam('handleQRCodeScanned')(result[0].data)
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
                    onBarCodeScanned={this.state.scanned ? undefined : this._handleBarCodeScanned.bind(this)}
                    style={StyleSheet.absoluteFillObject}
                />
            </View>
        );
    }

    componentDidMount() {
        // 设置 navigation 传递的参数
        this.props.navigation.setParams({
            selectImage: this.selectImage.bind(this)
        });
    }
}

QRCodeScanScreen.navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
        title: '扫描钱包二维码',
        headerTransparent: true,
        headerTintColor: '#fff',
        borderBottomWidth: 0,
        headerStyle: {
        },
        headerRight: <Ionicons
            style={{ marginRight: 8 }}
            name='md-albums'
            size={26}
            color={"#fff"}
            onPress={async () => {
                const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
                let result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images
                })
                if (!result.cancelled) {
                    params.selectImage(result.uri)
                }
            }}
        />,
        tabBarVisible: false,
    }
}

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({
        addWallet,
    }, dispatch)
);

export default connect(undefined, mapDispatchToProps)(QRCodeScanScreen)