import React, {FC} from "react";
import {SafeAreaView, Text} from "react-native";
import { RNCamera } from 'react-native-camera';
const Scan: FC = () => {
    console.log(RNCamera.Constants.CameraStatus);
    return (
        <SafeAreaView>
            <RNCamera
                androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
                androidRecordAudioPermissionOptions={{
                    title: 'Permission to use audio recording',
                    message: 'We need your permission to use your audio',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
            />
        </SafeAreaView>
    );
}

export default Scan;