import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";
import { useState } from "react";

export default function ChangePasswordScreen() {

    // Password State
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const handleSavePassword = () => {
        if (!newPass) return;
        if (newPass !== confirmPass) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }
        Alert.alert('Success', 'Password changed successfully');
        setNewPass('');
        setConfirmPass('');
    };
    return (
        <View style={styles.container}>

            <Text style={styles.subLabel}>Change Password</Text>
            <TextInput
                style={styles.input}
                placeholder="New Password"
                secureTextEntry
                value={newPass}
                onChangeText={setNewPass}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry
                value={confirmPass}
                onChangeText={setConfirmPass}
            />
            <Pressable style={styles.btnSave} onPress={handleSavePassword}>
                <Text style={styles.btnSaveText}>Update Password</Text>
            </Pressable>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16,
    },
    section: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        color: '#333',
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    value: {
        fontSize: 16,
        fontWeight: 'bold',
        width: 60,
        textAlign: 'center',
    },
    btnSmall: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnOption: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        backgroundColor: '#f0f0f0',
    },
    btnOptionSelected: {
        backgroundColor: '#007AFF',
    },
    btnText: {
        color: '#333',
    },
    btnTextSelected: {
        color: '#fff',
        fontWeight: 'bold',
    },
    subLabel: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
        marginTop: 8,
    },
    input: {
        backgroundColor: '#f9f9f9',
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#eee',
    },
    btnSave: {
        backgroundColor: '#333',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    btnSaveText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    divider: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 20,
    },
    btnLogout: {
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'red',
    },
    btnLogoutText: {
        color: 'red',
        fontWeight: 'bold',
    },
});
