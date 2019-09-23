/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';

import './app/util/storage.js' //全局本地存储

import MyApp from './MyApp';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => MyApp);
