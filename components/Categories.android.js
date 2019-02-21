import React from 'react';
import PropTypes from 'prop-types';
import { ToolbarAndroid } from 'react-native';
import { connect } from 'react-redux';

import styles from '../styles';
import { fetchArticles as _fetchArticles } from '../actions';

const onActionSelected = (
  items,
  selectCategory,
  fetchArticles,
) => (index) => {
  selectCategory(items[index].title);
  fetchArticles(items[index].filter);
};

const CategoriesAndroid = ({ items, fetchArticles, selectCategory }) => (
  <ToolbarAndroid
    style={styles.toolbar}
    title="All"
    actions={items}
    onActionSelected={onActionSelected(
      items,
      selectCategory,
      fetchArticles,
    )}
  />
);

CategoriesAndroid.defaultProps = {
  items: [],
};

CategoriesAndroid.propTypes = {
  fetchArticles: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({ title: PropTypes.string.isRequired })),
  selectCategory: PropTypes.func.isRequired,
};

export default connect(
  state => state.get('CategoriesAndroid').toJS(),
  dispatch => ({
    fetchArticles: _fetchArticles(dispatch),
    selectCategory: title => dispatch({
      type: 'SELECT_CATEGORY',
      payload: title,
    }),
  }),
)(CategoriesAndroid);
