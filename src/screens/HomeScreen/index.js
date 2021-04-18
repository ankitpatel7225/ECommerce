import React, {useRef, useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  Dimensions,
  TouchableOpacity,
  View,
  Animated,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {doPost} from '../../config/request';
import constant from '../../config/constant';
import {styles} from './styles';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Banner = [
  {
    id: 1,
    image:
      'https://assets.ajio.com/medias/sys_master/images/images/hec/he9/30344176238622/04022021-d-unisex-topbanner-valentinesdaysale-50to90.jpg',
  },
  {
    id: 2,
    image:
      'https://assets.ajio.com/medias/sys_master/images/images/h73/hc3/30379009212446/05022021-d-unisex-topbanner-superbranddays-upto60extra15.jpg',
  },
  {
    id: 3,
    image:
      'https://assets.ajio.com/medias/sys_master/images/images/h40/h39/30379003576350/05022021-d-unisex-stealoftheday-min50extra30.jpg',
  },
  {
    id: 4,
    image:
      'https://assets.ajio.com/medias/sys_master/images/images/h6f/hbd/30379009802270/05022021-d-unisex-topbanner-adidas-adidasoriginals-30to60.jpg',
  },
];

const colors = [
  '#cfd8dc',
  '#f3e5f5',
  '#fffde7',
  '#ffebee',
  '#ede7f6',
  '#e1f5fe',
  '#e8f5e9',
  '#efebe9',
  '#fff3e0',
  '#ffcdd2',
  '#e1bee7',
  '#bbdefb',
  '#b2ebf2',
  '#c8e6c9',
  '#f0f4c3',
  '#ffe0b2',
  '#cfd8dc',
];

const HomeScreen = (props) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [CateegoryData, setCateegoryData] = useState(null);
  const [ProductList, setProductList] = useState(null);
  const [isLoaded, setisLoaded] = useState(false);
  const position = Animated.divide(scrollX, screenWidth);

  useEffect(() => {
    doPost(constant.VIEWCATEGORY_URL)
      .then((res) => {
        if (res.flag == 1) {
          setCateegoryData(res.category);
          setisLoaded(true);
        } else if (res.flag == 0) {
          console.log('fail');
        }
      })
      .catch((e) => console.log('e', e));
    doPost(constant.HOMEPAGEPRODUCT_URL)
      .then((res) => {
        if (res.flag == 1) {
          setProductList(res.product);
        } else if (res.flag == 0) {
          console.log('fail');
        }
      })
      .catch((e) => console.log('e', e));
  }, []);

  function renderItem({item}) {
    return (
      <TouchableOpacity>
        <Image style={styles.image} source={{uri: item.image}}></Image>
      </TouchableOpacity>
    );
  }
  function bannerView() {
    return (
      <>
        <FlatList
          data={Banner}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          scrollEventThrottle={16}
          style={{elevation: 4, marginTop: 10}}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
        />
        <View style={styles.dotView}>
          {Banner.map((_, i) => {
            let opacity = position.interpolate({
              inputRange: [i - 1, i, i + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                key={i}
                style={[
                  styles.dot,
                  {
                    opacity,
                  },
                ]}
              />
            );
          })}
        </View>
        <ProductFlat />
      </>
    );
  }
  function productRender({item}) {
    return (
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('ProductScreen', {product: item})
        }>
        <Image
          style={styles.productImage}
          source={{uri: item.product_image}}></Image>
        <Text style={styles.productNameText}>
          {item.product_name.substring(0, 15)}..
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.priceText}>
            ₹{item.product_price.substring(0, 15)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
  function ProductFlat() {
    return (
      <View style={{marginBottom: 10}}>
        <View style={styles.bestSellerView}>
          <Text style={styles.bestSellerText}>Best Seller</Text>
        </View>
        <FlatList
          data={ProductList}
          renderItem={productRender}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.product_id}
        />
      </View>
    );
  }

  function renderItemCategory({item}) {
    return (
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('subCategory', {category: item})
        }
        style={[
          styles.categoryView,
          {backgroundColor: colors[Math.floor(Math.random() * colors.length)]},
        ]}>
        <Text style={styles.categoryText}>
          {item.category_name.substring(0, 12)}
        </Text>
        <Image
          style={styles.categoryImage}
          source={{uri: item.category_image}}></Image>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {isLoaded ? (
        <FlatList
          data={CateegoryData}
          renderItem={renderItemCategory}
          ListHeaderComponent={bannerView}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.category_id}
        />
      ) : (
        <SkeletonPlaceholder>
          <View style={styles.skeletonContainer}>
            <View style={styles.image} />
            <View style={{marginBottom: 10}}>
              <View style={styles.bestSellerView}>
                <View>
                  <View style={styles.productImage}></View>
                  <View style={styles.SkeletonMainText}></View>
                  <View style={styles.SkeletonSemiText}></View>
                </View>
                <View>
                  <View style={styles.productImage}></View>
                  <View style={styles.SkeletonMainText}></View>
                  <View style={styles.SkeletonSemiText}></View>
                </View>
                <View>
                  <View style={styles.productImage}></View>
                  <View style={styles.SkeletonMainText}></View>
                  <View style={styles.SkeletonSemiText}></View>
                </View>
                <View>
                  <View style={styles.productImage}></View>
                  <View style={styles.SkeletonMainText}></View>
                  <View style={styles.SkeletonSemiText}></View>
                </View>
              </View>
            </View>
            <View style={styles.skeletoncategoryView} />
            <View style={styles.skeletoncategoryView} />
            <View style={styles.skeletoncategoryView} />
          </View>
        </SkeletonPlaceholder>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
