import {AsyncStorage} from 'react-native';

export default class Storage {
    async set(key, value) {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.log(error)
        }
    }

    async get(key) {
        return await AsyncStorage.getItem(key);
    }

    async delete(key) {
        console.log('delete', key)
        return await AsyncStorage.removeItem(key);
    }

    async pushListUnique(key, value) {
        let result = await this.get(key)
        console.log('push list unique', result, key, value)
        if (result === false || result === null) {
            console.log('push list unique set new key', key, JSON.stringify([value]))
            return await this.set(key, JSON.stringify([value]))
        }
        console.log('push list unique push old key', key, result)
        result = JSON.parse(result)
        for (let i = 0; i < result.length; i++) {
            if (value === result[i]) {
                return false
            }
        }
        result.push(value)
        return await this.set(key, JSON.stringify(result))
    }
}