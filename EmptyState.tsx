import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Icons from 'lucide-react-native';
import Theme from '../constants/Theme';

interface EmptyStateProps {
  title: string;
  message: string;
  icon: string;
  buttonText?: string;
  onButtonPress?: () => void;
}

export default function EmptyState({ 
  title, 
  message, 
  icon, 
  buttonText, 
  onButtonPress 
}: EmptyStateProps) {
  // Dynamically get the icon from lucide-react-native
  const IconComponent = (Icons as any)[icon] || Icons.AlertCircle;

  return (
    <View style={styles.container}>
      <IconComponent size={64} color={Theme.colors.neutral[400]} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      
      {buttonText && onButtonPress && (
        <TouchableOpacity style={styles.button} onPress={onButtonPress}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Theme.spacing.xl,
  },
  title: {
    fontSize: Theme.fontSize.xl,
    fontWeight: Theme.fontWeight.bold,
    marginTop: Theme.spacing.lg,
    marginBottom: Theme.spacing.sm,
    textAlign: 'center',
  },
  message: {
    fontSize: Theme.fontSize.md,
    color: Theme.colors.neutral[600],
    textAlign: 'center',
    marginBottom: Theme.spacing.xl,
  },
  button: {
    backgroundColor: Theme.colors.primary[500],
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.xl,
    borderRadius: Theme.borderRadius.md,
  },
  buttonText: {
    color: Theme.colors.white,
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.medium,
  },
});