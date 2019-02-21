import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import { fetchArticle } from '../actions';
import Title from './Title';

class Article extends Component {
  static propTypes = {
    clear: PropTypes.func.isRequired,
    fetchArticle: PropTypes.func.isRequired,
    full: PropTypes.string.isRequired,
    navigation: PropTypes.any.isRequired,
  };

  componentDidMount() {
    this.props.navigation.addListener('willFocus', this.onWillFocus);
    this.props.navigation.addListener('willBlur', this.onWillBlur);
  }

  onWillFocus = () => {
    this.props.fetchArticle(this.props.navigation.getParam('id'));
  };

  onWillBlur = () => {
    this.props.clear();
  };

  render() {
    return (
      <View>
        <Title />
        <Text>{this.props.full}</Text>
      </View>
    );
  }
}

export default connect(
  (state, ownProps) => ({
    ...state.get('Article').toJS(),
    ...ownProps,
  }),
  dispatch => ({
    fetchArticle: (id) => {
      fetchArticle(dispatch, id);
    },
    clear: () => dispatch({ type: 'CLEAR' }),
  }),
)(Article);
