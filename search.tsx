import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Filter, Grid2x2 as Grid, List } from 'lucide-react-native';
import Theme from '../../constants/Theme';
import { Categories, Products } from '../../constants/Data';
import ProductCard from '../../components/ProductCard';
import CategoryCard from '../../components/CategoryCard';
import SearchBar from '../../components/SearchBar';
import EmptyState from '../../components/EmptyState';

export default function SearchScreen() {
  const params = useLocalSearchParams<{ query?: string, category?: string, view?: string }>();
  const [searchQuery, setSearchQuery] = useState(params.query || '');
  const [loading, setLoading] = useState(false);
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [filteredProducts, setFilteredProducts] = useState(Products);
  const [showCategories, setShowCategories] = useState(params.view === 'categories');
  
  useEffect(() => {
    if (params.query) {
      setSearchQuery(params.query);
      handleSearch(params.query);
    }
    
    if (params.category) {
      filterByCategory(params.category);
    }
    
    if (params.view === 'bestsellers') {
      setFilteredProducts(Products.filter(product => product.isBestseller));
    } else if (params.view === 'new') {
      setFilteredProducts(Products.filter(product => product.isNew));
    }
    
  }, [params]);
  
  const handleSearch = (query: string) => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      if (!query.trim()) {
        setFilteredProducts(Products);
      } else {
        const filtered = Products.filter(
          product => 
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredProducts(filtered);
      }
      
      setShowCategories(false);
      setLoading(false);
    }, 500);
  };
  
  const filterByCategory = (categoryId: string) => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const filtered = Products.filter(
        product => product.category === categoryId
      );
      setFilteredProducts(filtered);
      setShowCategories(false);
      setLoading(false);
    }, 500);
  };
  
  const toggleViewType = () => {
    setViewType(prev => prev === 'grid' ? 'list' : 'grid');
  };
  
  const toggleCategoriesView = () => {
    setShowCategories(prev => !prev);
  };
  
  const renderEmptyResult = () => {
    return (
      <EmptyState
        title="No products found"
        message="Try adjusting your search or browse categories instead."
        icon="Search"
        buttonText="Browse Categories"
        onButtonPress={toggleCategoriesView}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmit={() => handleSearch(searchQuery)}
          onClear={() => {
            setSearchQuery('');
            setFilteredProducts(Products);
          }}
          onFilterPress={toggleCategoriesView}
        />
      </View>
      
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            showCategories && styles.activeFilterButton
          ]}
          onPress={toggleCategoriesView}
        >
          <Filter size={16} color={showCategories ? Theme.colors.white : Theme.colors.neutral[700]} />
          <Text style={[
            styles.filterText,
            showCategories && styles.activeFilterText
          ]}>Categories</Text>
        </TouchableOpacity>
        
        {!showCategories && (
          <TouchableOpacity style={styles.viewTypeButton} onPress={toggleViewType}>
            {viewType === 'grid' ? (
              <List size={20} color={Theme.colors.neutral[700]} />
            ) : (
              <Grid size={20} color={Theme.colors.neutral[700]} />
            )}
          </TouchableOpacity>
        )}
      </View>
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Theme.colors.primary[500]} />
          <Text style={styles.loadingText}>Loading products...</Text>
        </View>
      ) : showCategories ? (
        <FlatList
          data={Categories}
          renderItem={({ item }) => (
            <CategoryCard category={item} />
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.categoriesRow}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={({ item }) => (
            <ProductCard 
              product={item} 
              horizontal={viewType === 'list'}
            />
          )}
          keyExtractor={(item) => item.id}
          numColumns={viewType === 'grid' ? 2 : 1}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={viewType === 'grid' ? styles.productGrid : undefined}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmptyResult}
        />
      )}
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
    paddingBottom: Theme.spacing.sm,
  },
  headerTitle: {
    fontSize: Theme.fontSize.title,
    fontWeight: Theme.fontWeight.bold,
    fontFamily: 'Inter-Bold',
  },
  searchContainer: {
    marginBottom: Theme.spacing.sm,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.white,
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    ...Theme.shadows.small,
  },
  activeFilterButton: {
    backgroundColor: Theme.colors.primary[500],
  },
  filterText: {
    marginLeft: Theme.spacing.xs,
    fontSize: Theme.fontSize.sm,
    fontWeight: Theme.fontWeight.medium,
    fontFamily: 'Inter-Medium',
    color: Theme.colors.neutral[700],
  },
  activeFilterText: {
    color: Theme.colors.white,
  },
  viewTypeButton: {
    backgroundColor: Theme.colors.white,
    padding: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.md,
    ...Theme.shadows.small,
  },
  listContent: {
    padding: Theme.spacing.md,
    paddingBottom: Theme.spacing.xl,
  },
  productGrid: {
    justifyContent: 'space-between',
  },
  categoriesRow: {
    justifyContent: 'space-between',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: Theme.spacing.md,
    fontSize: Theme.fontSize.md,
    color: Theme.colors.neutral[600],
    fontFamily: 'Inter-Regular',
  },
});