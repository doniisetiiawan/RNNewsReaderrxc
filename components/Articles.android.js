import React from 'react';
import { View } from 'react-native';

import Categories from './Categories';
import ArticleList from './ArticleList';

const ArticlesAndroid = props => (
  <View>
    <Categories />
    <ArticleList {...props} />
  </View>
);

export default ArticlesAndroid;
