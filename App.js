import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { useState } from 'react'
import { Camera, CameraType } from 'expo-camera'

export default function App() {

  const [type, setType] = useState(CameraType.back)
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    return <View />
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need permission to show the camera</Text>
        <Button onPress={requestPermission} title='Grant permission' />
      </View>
    )
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back))
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraSize}>
        <Camera style={styles.camera}>
          <View>
            <TouchableOpacity style={styles.Button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  cameraSize: {
    width: 200,
    height: 200
  },
  camera: {
    flex: 1
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center'
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white'
  }
});
