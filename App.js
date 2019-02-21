import React from 'react';
import { Provider } from 'react-redux';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import store from './store';
import Article from './components/Article';
import ArticlesAndroid from './components/Articles';

const AppNavigator = createStackNavigator(
  { Article, Articles: ArticlesAndroid },
  { initialRouteName: 'ArticlesAndroid' },
);

const Navigator = createAppContainer(AppNavigator);

export default () => (
  <Provider store={store}>
    <Navigator />
  </Provider>
);
