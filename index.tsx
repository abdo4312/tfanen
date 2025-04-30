import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { ChevronRight, Bell } from 'lucide-react-native';
import Theme from '../../constants/Theme.js';  // Añadida extensión .js
import { Categories, Products } from '../../constants/Data';
import ProductCard from '../../components/ProductCard.js';  // Añadida extensión .js
import CategoryCard from '../../components/CategoryCard';
import SearchBar from '../../components/SearchBar';

export default function HomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [bestsellerProducts, setBestsellerProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  
  // Move data filtering to useEffect to avoid state updates during render
  useEffect(() => {
    // Use a small timeout to ensure component is mounted
    const timer = setTimeout(() => {
      setBestsellerProducts(Products.filter(product => product.isBestseller));
      setNewProducts(Products.filter(product => product.isNew));
    }, 0);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push({
        pathname: '/search',
        params: { query: searchQuery }
      });
    }
  };
  
  const navigateToSearchScreen = () => {
    router.push('/search');
  };

  const navigateToAllCategories = () => {
    router.push('/search?view=categories');
  };
  
  const navigateToAllProducts = (type) => {
    router.push(`/search?view=${type}`);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome to</Text>
          <Text style={styles.storeName}>StationeryHub</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Bell size={24} color={Theme.colors.neutral[700]} />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        style={styles.searchBarContainer} 
        onPress={navigateToSearchScreen}
        activeOpacity={0.7}
      >
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmit={handleSearch}
          onFilterPress={navigateToSearchScreen}
        />
      </TouchableOpacity>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Banner */}
        <TouchableOpacity 
          style={styles.banner}
          activeOpacity={0.9}
          onPress={() => router.push('/search?category=school-supplies')}
        >
          <Image
            source={{ uri: 'https://images.pexels.com/photos/4497591/pexels-photo-4497591.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }}
            style={styles.bannerImage}
            resizeMode="cover"
          />
          <View style={styles.bannerContent}>
            <Text style={styles.bannerSmallText}>Back to School</Text>
            <Text style={styles.bannerLargeText}>30% OFF</Text>
            <Text style={styles.bannerMediumText}>on School Supplies</Text>
            
            <TouchableOpacity 
              style={styles.bannerButton}
              onPress={() => router.push('/search?category=school-supplies')}
            >
              <Text style={styles.bannerButtonText}>Shop Now</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        
        {/* Categories */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <TouchableOpacity 
            style={styles.seeAllButton}
            onPress={navigateToAllCategories}
          >
            <Text style={styles.seeAllText}>See All</Text>
            <ChevronRight size={16} color={Theme.colors.primary[500]} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.categoriesContainer}>
          {Categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </View>
        
        {/* Bestsellers */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Bestsellers</Text>
          <TouchableOpacity 
            style={styles.seeAllButton}
            onPress={() => navigateToAllProducts('bestsellers')}
          >
            <Text style={styles.seeAllText}>See All</Text>
            <ChevronRight size={16} color={Theme.colors.primary[500]} />
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={bestsellerProducts}
          renderItem={({ item }) => <ProductCard product={item} />}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productList}
          ItemSeparatorComponent={() => <View style={{ width: Theme.spacing.md }} />}
        />
        
        {/* New Arrivals */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>New Arrivals</Text>
          <TouchableOpacity 
            style={styles.seeAllButton}
            onPress={() => navigateToAllProducts('new')}
          >
            <Text style={styles.seeAllText}>See All</Text>
            <ChevronRight size={16} color={Theme.colors.primary[500]} />
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={newProducts}
          renderItem={({ item }) => <ProductCard product={item} />}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productList}
          ItemSeparatorComponent={() => <View style={{ width: Theme.spacing.md }} />}
        />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.md,
    paddingTop: Theme.spacing.xl,
    paddingBottom: Theme.spacing.md,
  },
  greeting: {
    fontSize: Theme.fontSize.md,
    color: Theme.colors.neutral[600],
    fontFamily: 'Inter-Regular',
  },
  storeName: {
    fontSize: Theme.fontSize.xl,
    color: Theme.colors.neutral[800],
    fontFamily: 'Inter-Bold',
  },
  notificationButton: {
    padding: Theme.spacing.sm,
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.radius.md,
  },
  searchBarContainer: {
    paddingHorizontal: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
  },
  scrollContent: {
    paddingBottom: Theme.spacing.xl,
  },
  banner: {
    marginHorizontal: Theme.spacing.md,
    borderRadius: Theme.radius.lg,
    overflow: 'hidden',
    marginBottom: Theme.spacing.lg,
  },
  bannerImage: {
    width: '100%',
    height: 150,
  },
  bannerContent: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: Theme.spacing.sm,
    borderRadius: Theme.radius.sm,
  },
  bannerSmallText: {
    color: Theme.colors.white,
    fontSize: Theme.fontSize.sm,
    fontFamily: 'Inter-Regular',
  },
  bannerLargeText: {
    color: Theme.colors.white,
    fontSize: Theme.fontSize.xl,
    fontFamily: 'Inter-Bold',
  },
  bannerMediumText: {
    color: Theme.colors.white,
    fontSize: Theme.fontSize.md,
    fontFamily: 'Inter-Medium',
  },
  bannerButton: {
    marginTop: Theme.spacing.sm,
    backgroundColor: Theme.colors.primary[500],
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.md,
    borderRadius: Theme.radius.sm,
  },
  bannerButtonText: {
    color: Theme.colors.white,
    fontSize: Theme.fontSize.md,
    fontFamily: 'Inter-SemiBold',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.md,
    marginTop: Theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: Theme.fontSize.lg,
    fontWeight: Theme.fontWeight.bold,
    fontFamily: 'Inter-Bold',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    color: Theme.colors.primary[500],
    fontFamily: 'Inter-Medium',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Theme.spacing.md,
    justifyContent: 'space-between',
  },
  productList: {
    paddingHorizontal: Theme.spacing.md,
  },
});