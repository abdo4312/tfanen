// components/CategoryCard.js

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Theme from '../constants/Theme';

const CategoryCard = ({ category }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: '/search',
      params: { category: category.id }
    });
  };

  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: category.color }]} 
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <Text style={styles.icon}>{category.icon}</Text>
      <Text style={styles.name}>{category.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '48%',
    height: 100,
    borderRadius: Theme.radius.md,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  icon: {
    fontSize: 28,
    marginBottom: Theme.spacing.xs,
  },
  name: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.neutral[800],
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
  },
});

export default CategoryCard;