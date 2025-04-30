import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    // Get the access token for the storage
    const token = await AsyncStorage.getItem(`${this.namespace}:accessToken`);
    if (!token) {
      return null;
    }
    return token ? JSON.parse(token) : null;
  }

  async setAccessToken(accessToken) {
    // Add the access token to the storage
    if (!accessToken) {
      throw new Error('Access token is required');
    }
    await AsyncStorage.setItem(`${this.namespace}:accessToken`, JSON.stringify(accessToken));
  }

  async removeAccessToken() {
    // Remove the access token from the storage
    await AsyncStorage.removeItem(`${this.namespace}:accessToken`);
  }
}

export default AuthStorage;