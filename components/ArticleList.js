import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList, TouchableHighlight, Text } from 'react-native';
import { connect } from 'react-redux';

import styles from '../styles';
import { fetchArticles } from '../actions';

class ArticleList extends Component {
  static propTypes = {
    fetchArticles: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired,
    navigation: PropTypes.any.isRequired,
  };

  state = {
    source: [],
  };

  componentDidMount() {
    this.props.fetchArticles(this.props.filter);
  }

  renderRow = action => ({ item: { value } }) => (
    <TouchableHighlight onPause={action(value.id)}>
      <Text>{value.title}</Text>
    </TouchableHighlight>
  );

  render() {
    return (
      <FlatList
        style={styles.list}
        data={this.state.source.map((value, key) => ({
          value,
          key: key.toString(),
        }))}
        renderItem={this.renderRow(id => () => this.props.navigation.navigate('Article', { id }))}
        enableEmptySections
      />
    );
  }
}

export default connect(
  (state, ownProps) => ({
    ...state.get('Article').toJS(),
    ...ownProps,
  }),
  dispatch => ({
    fetchArticles: fetchArticles(dispatch),
  }),
)(ArticleList);
