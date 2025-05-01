import React from 'react';
import { 
  View, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity,
  Keyboard
} from 'react-native';
import { Search, X, SlidersHorizontal } from 'lucide-react-native';
import Theme from '../constants/Theme';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit?: () => void;
  onClear?: () => void;
  onFilterPress?: () => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChangeText,
  onSubmit,
  onClear,
  onFilterPress,
  placeholder = 'Search products...'
}: SearchBarProps) {
  const handleClear = () => {
    onChangeText('');
    onClear?.();
  };

  const handleSubmitEditing = () => {
    Keyboard.dismiss();
    onSubmit?.();
  };

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
          returnKeyType="search"
          onSubmitEditing={handleSubmitEditing}
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <X size={18} color={Theme.colors.neutral[500]} />
          </TouchableOpacity>
        )}
      </View>
      
      {onFilterPress && (
        <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
          <SlidersHorizontal size={20} color={Theme.colors.white} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.borderRadius.md,
    paddingHorizontal: Theme.spacing.md,
    ...Theme.shadows.small,
  },
  searchIcon: {
    marginRight: Theme.spacing.sm,
  },
  input: {
    flex: 1,
    height: 46,
    color: Theme.colors.neutral[800],
    fontSize: Theme.fontSize.md,
  },
  clearButton: {
    padding: Theme.spacing.xs,
  },
  filterButton: {
    backgroundColor: Theme.colors.primary[500],
    width: 46,
    height: 46,
    borderRadius: Theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Theme.spacing.sm,
    ...Theme.shadows.small,
  },
});