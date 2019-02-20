import React from 'react';
import PropTypes from 'prop-types';
import { TabBarIOS } from 'react-native';
import { connect } from 'react-redux';

import styles from '../styles';
import listIcon from '../assets/list.png';
import listSelectedIcon from '../assets/list-selected.png';

const Categories = ({ items, children, selectTab }) => (
  <TabBarIOS
    unselectedTintColor="darkslategrey"
    tintColor="ghostwhite"
    barTintColor="slategrey"
    style={styles.tabBar}
  >
    {items.map(i => (
      <TabBarIOS.TabBarItemIOS
        key={i.title}
        title={i.title}
        selected={i.selected}
        icon={listIcon}
        selectedIcon={listSelectedIcon}
        onPress={() => {
          selectTab(i.title);
        }}
        renderAsOriginal
      >
        {children}
      </TabBarIOS.TabBarItemIOS>
    ))}
  </TabBarIOS>
);

Categories.propTypes = {
  children: PropTypes.node.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      selectTab: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  selectTab: PropTypes.func.isRequired,
};

export default connect(
  state => state.get('Categories').toJS(),
  dispatch => ({
    fetchArticles: _fetchArticles(dispatch),
    selectCategory: title => dispatch({
      type: 'SELECT_CATEGORY',
      payload: title,
    }),
  }),
)(Categories);
