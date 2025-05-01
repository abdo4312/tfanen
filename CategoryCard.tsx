import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import * as Icons from 'lucide-react-native';
import Theme from '../constants/Theme';
import { Category } from '../models/types';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const router = useRouter();
  
  const handlePress = () => {
    router.push(`/category/${category.id}`);
  };
  
  // Dynamically get the icon from lucide-react-native
  const IconComponent = (Icons as any)[
    category.icon.charAt(0).toUpperCase() + category.icon.slice(1)
  ] || Icons.Package;

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress} activeOpacity={0.7}>
      <View style={styles.iconContainer}>
        <IconComponent size={24} color={Theme.colors.primary[500]} />
      </View>
      <Text style={styles.title}>{category.name}</Text>
      <Text style={styles.subtitle}>{category.subcategories.length} subcategories</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
    alignItems: 'center',
    width: '48%',
    ...Theme.shadows.small,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: Theme.borderRadius.full,
    backgroundColor: Theme.colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
  },
  title: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.medium,
    textAlign: 'center',
    marginBottom: Theme.spacing.xs,
  },
  subtitle: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.neutral[500],
    textAlign: 'center',
  },
});