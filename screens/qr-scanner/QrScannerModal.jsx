import React from 'react'
import { Text, View, Modal, Pressable, Image } from "react-native";

export default function QrScannerModal() {
  return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
            setModalVisible(!modalVisible);
        }}
    >
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Pressable
                    onPress={() => { setModalVisible(false), setScanned(false) }}
                >
                    <View style={{ alignItems: 'flex-end', flexDirection: 'column' }}>
                        <Image
                            source={{ uri: "https://firebasestorage.googleapis.com/v0/b/univtrazeapp.appspot.com/o/icons8-close-30.png?alt=media&token=a98c28bd-4319-479e-a085-cfc119f4974f" }}
                            resizeMode="cover"
                            style={{
                                width: 20,
                                height: 20,
                                borderRadius: 100,
                                borderColor: "#EEEEEE",
                                shadowColor: "black",
                            }}
                        />
                    </View>

                </Pressable>
                <View style={{ alignItems: 'center', flexDirection: 'column' }}>
                    <Image
                        source={{ uri: "https://media.istockphoto.com/vectors/door-icon-logo-isolated-on-white-background-vector-id1186732582?k=20&m=1186732582&s=612x612&w=0&h=gyg9mDl4WxlJ-vsiwFS_GoNktffrpWO8dk9DAmNK3ds=" }}
                        resizeMode="cover"
                        style={{
                            width: 150,
                            height: 150,
                            borderRadius: 100,
                            borderColor: "#EEEEEE",
                            shadowColor: "black",
                        }}
                    />
                </View>

                <Text style={styles.modalText}>Confirm visiting room {roomNumber} of {buildingName}?</Text>
                <View style={{ flexDirection: "row" }}>
                    <Pressable
                        style={styles.cancelButton}
                        onPress={() => cancelScanning()}
                    >
                        <Text style={styles.textStyleCancel}>Cancel</Text>
                    </Pressable>

                    <Pressable
                        style={styles.confirmButton}
                        onPress={() => confirmScanning(roomId)}
                    >
                        <Text style={styles.textStyle}>Confirm</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    </Modal>
  )
}
