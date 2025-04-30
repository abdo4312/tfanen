import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Languages } from 'lucide-react-native';
import { useI18n } from '../context/I18nContext';
import Theme from '../constants/Theme';

export default function LanguageToggle() {
  const { locale, setLocale } = useI18n();

  const toggleLanguage = () => {
    setLocale(locale === 'en' ? 'ar' : 'en');
  };

  return (
    <TouchableOpacity style={styles.container} onPress={toggleLanguage}>
      <Languages size={24} color={Theme.colors.primary[500]} />
      <Text style={styles.text}>{locale === 'en' ? 'عربي' : 'English'}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.spacing.sm,
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.borderRadius.md,
    ...Theme.shadows.small,
  },
  text: {
    marginLeft: Theme.spacing.xs,
    fontSize: Theme.fontSize.md,
    fontFamily: 'Inter-Medium',
    color: Theme.colors.primary[500],
  },
});