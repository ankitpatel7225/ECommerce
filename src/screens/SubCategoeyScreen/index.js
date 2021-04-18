import React, {useRef, useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  Dimensions,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {placeholderColor} from '../../utils/color';
import {styles} from './styles';
import {doPost} from '../../config/request';
import constant from '../../config/constant';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
const sub_category = [
  {
    category_id: '1',
    sub_category_id: '2',
    sub_category_image:
      'https://akashsir.in/myapi/ecom1/upload/jean_sub_cat.jpg',
    sub_category_name: 'Jeans',
  },
  {
    category_id: '1',
    sub_category_id: '6',
    sub_category_image:
      'https://akashsir.in/myapi/ecom1/upload/1612859510ms1.webp',
    sub_category_name: 'Shirts',
  },
];
const SubCategoryScreen = (props) => {
  const {category} = props.route.params;
  const [isLoaded, setIsLoaded] = useState(false);
  const [ProductList, setProductList] = useState(null);
  const [subCategory, setsubCategory] = useState(null);
  const [isGrid, setisGrid] = useState(true);
  const [sabcategoryId, setsabcategoryId] = useState(0);
  const [FilterData, setFilterData] = useState(ProductList);
  const [icon, seticon] = useState('view-grid-outline');

  useEffect(() => {
    const formdata = new FormData();
    formdata.append('category_id', category.category_id);
    doPost(constant.VIEWALLPRODUCTS_URL, formdata).then((res) => {
      if (res.flag == 1) {
        setsubCategory(res.subcategory);
        setProductList(res.product);
        setFilterData(res.product);
        setIsLoaded(true);
      } else if (res.flag == 0) {
        console.log('fail');
      }
    });
  }, []);

  const GetSubCategoryData = (id) => {
    console.log(id);
    if (id == 0) {
    } else {
      const formdata = new FormData();
      formdata.append('sub_category_id', id);
      doPost(constant.VIEWSUBCATEGORYPRODUCT_URL, formdata).then((res) => {
        if (res.flag == 1) {
          setsabcategoryId(id);
          setFilterData(res.product);
          setIsLoaded(true);
        } else if (res.flag == 0) {
          console.log('fail');
        }
      });
    }
  };

  const productGridRender = ({item}) => {
    return (
      <TouchableOpacity
        style={{marginVertical: 10}}
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
  };
  const productListRender = ({item}) => {
    return (
      <TouchableOpacity
        style={{flexDirection: 'row', marginVertical: 5}}
        onPress={() =>
          props.navigation.navigate('ProductScreen', {product: item})
        }>
        <Image
          style={styles.productListImage}
          source={{uri: item.product_image}}></Image>
        <View style={{flex: 1}}>
          <Text style={styles.productNameText}>
            {item.product_name.substring(0, 30)}..
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.priceText}>
              ₹{item.product_price.substring(0, 15)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {isLoaded ? (
        <>
          <View style={{marginBottom: 20}}>
            <View style={styles.bestSellerView}>
              <Text style={styles.itemText}>5 items</Text>

              <View style={styles.rightView}>
                <MaterialCommunityIcons
                  name={icon}
                  color={placeholderColor}
                  size={30}
                  onPress={() => {
                    if (isGrid) {
                      setisGrid(!isGrid);
                      seticon('format-list-bulleted-square');
                    } else {
                      setisGrid(!isGrid);
                      seticon('view-grid-outline');
                    }
                  }}
                  style={{alignSelf: 'center', marginRight: 10}}
                />

                <Menu
                  onSelect={(value) => {
                    if (sabcategoryId == value) {
                      setFilterData(ProductList);
                      setsabcategoryId(0);
                    } else if (value == 0) {
                      setFilterData(ProductList);
                      setsabcategoryId(0);
                    } else {
                      setIsLoaded(false);
                      GetSubCategoryData(value);
                    }
                  }}>
                  <MenuTrigger style={styles.filterContainer}>
                    <MaterialCommunityIcons
                      name={'filter-outline'}
                      color={placeholderColor}
                      size={30}
                      style={{alignSelf: 'center'}}
                    />
                    <Text style={styles.filterText}>FILTER</Text>
                  </MenuTrigger>
                  <MenuOptions>
                    <MenuOption style={styles.menuOption} value={0}>
                      <View style={{flexDirection: 'row'}}>
                        <MaterialCommunityIcons
                          name={'filter-variant'}
                          color={placeholderColor}
                          size={25}
                          style={{alignSelf: 'center'}}
                        />

                        <Text style={styles.menuText}>View All</Text>
                      </View>
                    </MenuOption>
                    {subCategory.map((sub) => {
                      return (
                        <MenuOption
                          style={styles.menuOption}
                          value={sub.subcategory_id}>
                          {sabcategoryId == sub.subcategory_id ? (
                            <View style={{flexDirection: 'row'}}>
                              <MaterialCommunityIcons
                                name={'check'}
                                color={placeholderColor}
                                size={25}
                                style={{alignSelf: 'center'}}
                              />
                              <Text style={styles.menuText}>
                                {sub.subcategory_name}
                              </Text>
                            </View>
                          ) : (
                            <Text style={styles.menuText}>
                              {sub.subcategory_name}
                            </Text>
                          )}
                        </MenuOption>
                      );
                    })}
                  </MenuOptions>
                </Menu>
              </View>
            </View>
          </View>
          {isGrid ? (
            <FlatList
              data={FilterData}
              renderItem={productGridRender}
              key={isGrid}
              numColumns={2}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.product_id}
            />
          ) : (
            <FlatList
              data={FilterData}
              renderItem={productListRender}
              key={isGrid}
              numColumns={1}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.product_id}
            />
          )}
        </>
      ) : (
        <SkeletonPlaceholder>
          <View style={styles.skeletonContainer}>
            <View style={styles.bestSellerView}>
              <View>
                <View style={styles.skeltonImage}></View>
                <View style={styles.SkeletonMainText}></View>
                <View style={styles.SkeletonSemiText}></View>
              </View>
              <View>
                <View style={styles.skeltonImage}></View>
                <View style={styles.SkeletonMainText}></View>
                <View style={styles.SkeletonSemiText}></View>
              </View>
            </View>
            <View style={styles.bestSellerView}>
              <View>
                <View style={styles.skeltonImage}></View>
                <View style={styles.SkeletonMainText}></View>
                <View style={styles.SkeletonSemiText}></View>
              </View>
              <View>
                <View style={styles.skeltonImage}></View>
                <View style={styles.SkeletonMainText}></View>
                <View style={styles.SkeletonSemiText}></View>
              </View>
            </View>
            <View style={styles.bestSellerView}>
              <View>
                <View style={styles.skeltonImage}></View>
                <View style={styles.SkeletonMainText}></View>
                <View style={styles.SkeletonSemiText}></View>
              </View>
              <View>
                <View style={styles.skeltonImage}></View>
                <View style={styles.SkeletonMainText}></View>
                <View style={styles.SkeletonSemiText}></View>
              </View>
            </View>
            <View style={styles.bestSellerView}>
              <View>
                <View style={styles.skeltonImage}></View>
                <View style={styles.SkeletonMainText}></View>
                <View style={styles.SkeletonSemiText}></View>
              </View>
              <View>
                <View style={styles.skeltonImage}></View>
                <View style={styles.SkeletonMainText}></View>
                <View style={styles.SkeletonSemiText}></View>
              </View>
            </View>
          </View>
        </SkeletonPlaceholder>
      )}
    </SafeAreaView>
  );
};

export default SubCategoryScreen;
