// components/SearchBar.js

import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Search, SlidersHorizontal } from 'lucide-react-native';
import Theme from '../constants/Theme';

const SearchBar = ({ 
  value, 
  onChangeText, 
  onSubmit, 
  onFilterPress,
  placeholder = 'Search for products...',
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Search size={20} color={Theme.colors.neutral[500]} style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={Theme.colors.neutral[400]}
          onSubmitEditing={onSubmit}
          returnKeyType="search"
        />
      </View>
      
      <TouchableOpacity 
        style={styles.filterButton}
        onPress={onFilterPress}
      >
        <SlidersHorizontal size={20} color={Theme.colors.white} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.radius.md,
    paddingHorizontal: Theme.spacing.md,
    height: 46,
  },
  searchIcon: {
    marginRight: Theme.spacing.sm,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: Theme.fontSize.md,
    color: Theme.colors.neutral[800],
    fontFamily: 'Inter-Regular',
  },
  filterButton: {
    width: 46,
    height: 46,
    backgroundColor: Theme.colors.primary[500],
    borderRadius: Theme.radius.md,
    marginLeft: Theme.spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchBar;