import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView,
  TouchableOpacity,
  Image
} from 'react-native';
import { 
  User, 
  ShoppingBag, 
  Heart, 
  MapPin, 
  CreditCard,
  Bell,
  HelpCircle,
  LogOut,
  ChevronRight
} from 'lucide-react-native';
import Theme from '../../constants/Theme';

const menuItems = [
  { 
    icon: ShoppingBag, 
    title: 'My Orders', 
    description: 'Track and manage your orders',
    route: '/orders'
  },
  { 
    icon: Heart, 
    title: 'Wishlist', 
    description: 'View products you like',
    route: '/wishlist'
  },
  { 
    icon: MapPin, 
    title: 'Saved Addresses', 
    description: 'Manage delivery addresses',
    route: '/addresses'
  },
  { 
    icon: CreditCard, 
    title: 'Payment Methods', 
    description: 'Manage your payment options',
    route: '/payment-methods'
  },
  { 
    icon: Bell, 
    title: 'Notifications', 
    description: 'Manage notification preferences',
    route: '/notifications'
  },
  { 
    icon: HelpCircle, 
    title: 'Help & Support', 
    description: 'Get help with your orders',
    route: '/support'
  },
];

export default function ProfileScreen() {
  const handleLogout = () => {
    // In a real app, implement logout functionality
    console.log('Logout pressed');
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.profileCard}>
          <View style={styles.profileAvatarContainer}>
            <User size={40} color={Theme.colors.neutral[500]} />
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Guest User</Text>
            <Text style={styles.profileEmail}>Sign in to access all features</Text>
          </View>
          
          <TouchableOpacity style={styles.signInButton}>
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={[
                styles.menuItem,
                index === menuItems.length - 1 && styles.lastMenuItem
              ]}
            >
              <View style={styles.menuItemIcon}>
                <item.icon size={22} color={Theme.colors.primary[500]} />
              </View>
              
              <View style={styles.menuItemContent}>
                <Text style={styles.menuItemTitle}>{item.title}</Text>
                <Text style={styles.menuItemDescription}>{item.description}</Text>
              </View>
              
              <ChevronRight size={20} color={Theme.colors.neutral[400]} />
            </TouchableOpacity>
          ))}
        </View>
        
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color={Theme.colors.error[500]} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.neutral[100],
  },
  header: {
    paddingHorizontal: Theme.spacing.md,
    paddingTop: Theme.spacing.xl,
    paddingBottom: Theme.spacing.md,
  },
  headerTitle: {
    fontSize: Theme.fontSize.title,
    fontWeight: Theme.fontWeight.bold,
    fontFamily: 'Inter-Bold',
  },
  scrollContent: {
    paddingBottom: Theme.spacing.xl,
  },
  profileCard: {
    backgroundColor: Theme.colors.white,
    margin: Theme.spacing.md,
    padding: Theme.spacing.lg,
    borderRadius: Theme.borderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    ...Theme.shadows.small,
  },
  profileAvatarContainer: {
    width: 60,
    height: 60,
    borderRadius: Theme.borderRadius.full,
    backgroundColor: Theme.colors.neutral[200],
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
    marginLeft: Theme.spacing.md,
  },
  profileName: {
    fontSize: Theme.fontSize.lg,
    fontWeight: Theme.fontWeight.bold,
    fontFamily: 'Inter-Bold',
  },
  profileEmail: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.neutral[600],
    fontFamily: 'Inter-Regular',
    marginTop: Theme.spacing.xs,
  },
  signInButton: {
    backgroundColor: Theme.colors.primary[500],
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
  },
  signInButtonText: {
    color: Theme.colors.white,
    fontWeight: Theme.fontWeight.medium,
    fontFamily: 'Inter-Medium',
  },
  menuContainer: {
    backgroundColor: Theme.colors.white,
    margin: Theme.spacing.md,
    borderRadius: Theme.borderRadius.lg,
    ...Theme.shadows.small,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.neutral[200],
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  menuItemIcon: {
    width: 40,
    height: 40,
    borderRadius: Theme.borderRadius.full,
    backgroundColor: Theme.colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemContent: {
    flex: 1,
    marginLeft: Theme.spacing.md,
  },
  menuItemTitle: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.medium,
    fontFamily: 'Inter-Medium',
  },
  menuItemDescription: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.neutral[600],
    fontFamily: 'Inter-Regular',
    marginTop: Theme.spacing.xs,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.colors.white,
    margin: Theme.spacing.md,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.lg,
    ...Theme.shadows.small,
  },
  logoutText: {
    color: Theme.colors.error[500],
    fontWeight: Theme.fontWeight.medium,
    fontFamily: 'Inter-Medium',
    marginLeft: Theme.spacing.sm,
  },
  versionText: {
    textAlign: 'center',
    color: Theme.colors.neutral[500],
    fontSize: Theme.fontSize.sm,
    fontFamily: 'Inter-Regular',
    marginTop: Theme.spacing.md,
  },
});