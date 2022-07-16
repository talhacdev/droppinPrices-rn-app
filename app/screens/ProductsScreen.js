import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, FlatList, ScrollView} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import routes from '../navigation/routes';

import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import TextInput from '../components/TextInput';
import CategoryButton from '../components/CategoryButton';
import Slider from '../components/Slider';
import Button from '../components/Button';

import colors from '../config/colors';

import {categories as CATEGORIES} from '../config/JSON';

import {connect} from 'react-redux';
import {UpdateCart, UpdateProducts} from '../redux/actions/AuthActions';

function ProductsScreen(props) {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [productsToBuy, setProductsToBuy] = useState([]);
  const [searchedProductsToBuy, setSearchedProductsToBuy] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(100);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);

  const handleValueChange = useCallback((low, high) => {
    setSearchQuery('');
    setSelectedCategory(0);
    setLow(low);
    setHigh(high);
    if (low > 0 || high < 100) {
      console.log('enter');
      let array = [];
      for (let i = 0; i < searchedProductsToBuy.length; i++) {
        console.log('enter for');
        let item = searchedProductsToBuy[i];
        let discount = calculateDiscount(item);
        if (discount > low && discount < high) {
          array.push(searchedProductsToBuy[i]);
        }
        setSearchedProductsToBuy(array);
      }
      // setSearchedProductsToBuy(array);
      // // alert('in the logic');
      // let tempProducts = productsToBuy?.filter(
      //   m => m?.discount >= low && m?.price <= high,
      // );

      // console.log('tempProducts: ', tempProducts);

      // setSearchedProductsToBuy(tempProducts);
      // } else {
      //   setSearchedProductsToBuy(productsToBuy);
    }
  }, []);

  useEffect(() => {
    let reduxProducts = props.productsValue;

    let tempProductsToBuy = reduxProducts.filter(i => i.bid == false);

    setProductsToBuy(tempProductsToBuy);
    setSearchedProductsToBuy(tempProductsToBuy);
  }, [props.productsValue]);

  const onPressLike = item => {
    let reduxProducts = props.productsValue;

    let index = reduxProducts.indexOf(item);
    reduxProducts[index].liked = !item.liked;

    props.updateProducts([...reduxProducts]);
  };

  const calculateDiscount = item => {
    return 100 - Math.round((item.price / item.originalPrice) * 100);
  };

  const onPressAddToCart = item => {
    let reduxCart = props.cartValue;

    let alreadyAdded = reduxCart.filter(i => i.id == item.id);

    if (alreadyAdded.length >= 1) {
      alert('Product already added');
    } else {
      reduxCart.push(item);
      props.updateCart([...reduxCart]);
    }
  };

  const onPressCard = item => {
    props.navigation.navigate(routes.PRODUCT_DETAIL, {item});
  };

  const submitHandler = val => {
    setSearchQuery(val);
    setSelectedCategory(0);

    if (val) {
      let tempProducts = productsToBuy?.filter(m =>
        m?.productName?.toLowerCase().includes(val?.toLowerCase()),
      );

      setSearchedProductsToBuy(tempProducts);
    } else {
      setSearchedProductsToBuy(productsToBuy);
    }
  };

  const onPressCategory = item => {
    setSearchQuery('');
    setSelectedCategory(item.id);

    if (item.id) {
      let tempProducts = productsToBuy?.filter(m => m.id == item?.id);

      setSearchedProductsToBuy(tempProducts);
    } else {
      setSearchedProductsToBuy(productsToBuy);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Header
          onPressBack={() => props.navigation.goBack()}
          onPressDrawer={() => console.log('toggle drawer')}
        />

        <TextInput
          defaultValue={searchQuery}
          search
          placeholder={'Search any product or keyword'}
          onChangeText={text => submitHandler(text)}
        />

        <View style={{width: wp(90)}}>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={CATEGORIES}
            keyExtractor={CATEGORIES => CATEGORIES.id}
            renderItem={({item}) => (
              <View style={{paddingRight: wp(2)}}>
                <CategoryButton
                  onPress={() => onPressCategory(item)}
                  selected={selectedCategory == item.id}
                  item={item}
                />
              </View>
            )}
          />
        </View>

        <Slider
          low={low}
          high={high}
          min={min}
          max={max}
          handleValueChange={handleValueChange}
        />

        <View style={{width: wp(90), paddingBottom: hp(2)}}>
          <FlatList
            numColumns={2}
            showsVerticalScrollIndicator={false}
            data={searchedProductsToBuy}
            keyExtractor={searchedProductsToBuy => searchedProductsToBuy.id}
            renderItem={({item}) => (
              <View style={{paddingRight: wp(2), paddingBottom: wp(2)}}>
                <ProductCard
                  onPress={() => onPressCard(item)}
                  productName={item.productName}
                  price={item.price}
                  originalPrice={item.originalPrice}
                  image={item.image}
                  discount={calculateDiscount(item)}
                  liked={item.liked}
                  minimumPrice={item.minimumPrice}
                  bid={item.bid}
                  auctionId={item.auctionId}
                  description={item.description}
                  onPressAdd={() => onPressAddToCart(item)}
                  onPressLike={() => onPressLike(item)}
                />
              </View>
            )}
          />
        </View>

        <Button
          backgroundColor={colors.secondary}
          width={wp(35)}
          fontSize={wp(3)}
          height={hp(6)}
          title={'BROWSE MORE'}
          onPress={() => console.log('button pressed')}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: hp(15),
    backgroundColor: colors.background,
  },
});

function mapStateToProps(state) {
  return {
    productsValue: state.auth.products,
    cartValue: state.auth.cart,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateProducts: payload => dispatch(UpdateProducts(payload)),
    updateCart: payload => dispatch(UpdateCart(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsScreen);
