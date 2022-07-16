import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, FlatList, ScrollView} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import moment from 'moment';

import routes from '../navigation/routes';

import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import TextInput from '../components/TextInput';
import CategoryButton from '../components/CategoryButton';

import colors from '../config/colors';

import {categories as CATEGORIES} from '../config/JSON';

import {connect} from 'react-redux';
import {UpdateCart, UpdateProducts} from '../redux/actions/AuthActions';
import ProductCardHeader from '../components/ProductCardHeader';

function SearchScreen(props) {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [searchedProducts, setSearchedProducts] = useState([]);

  useEffect(() => {
    let reduxProducts = props.productsValue;

    setProducts(reduxProducts);
    setSearchedProducts(reduxProducts);
  }, [props.productsValue]);

  const onPressCategory = item => {
    setSearchQuery('');
    setSelectedCategory(item.id);

    if (item.id) {
      let tempProducts = products?.filter(m => m.id == item?.id);

      setSearchedProducts(tempProducts);
    } else {
      setSearchedProducts(products);
    }
  };

  const submitHandler = val => {
    setSearchQuery(val);
    setSelectedCategory(0);

    if (val) {
      let tempProducts = products?.filter(m =>
        m?.productName?.toLowerCase().includes(val?.toLowerCase()),
      );

      setSearchedProducts(tempProducts);
    } else {
      setSearchedProducts(products);
    }
  };

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

  const calculateCountdown = item => {
    let now = moment(new Date());
    console.log('item timestamp: ', item);
    let timestamp = item.timestamp;
    let duration = moment.duration(now.diff(timestamp));
    let seconds = duration.asSeconds();
    let secondsLeft = 604800 - seconds;
    var d = Math.floor(secondsLeft / (3600 * 24));
    var h = Math.floor((secondsLeft % (3600 * 24)) / 3600);
    var m = Math.floor((secondsLeft % 3600) / 60);
    var s = Math.floor(secondsLeft % 60);
    var dDisplay = d > 0 ? d + (d == 1 ? 'd, ' : 'd ') : '';
    var hDisplay = h > 0 ? h + (h == 1 ? 'h ' : 'h ') : '';
    var mDisplay = m > 0 ? m + (m == 1 ? 'm ' : 'm ') : '';
    var sDisplay = s > 0 ? s + (s == 1 ? 's' : 's') : '';
    return dDisplay + hDisplay + mDisplay + sDisplay;
  };

  const onPressQuickBid = () => {
    alert('not available yet');
  };

  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Header
          onPressBack={() => props.navigation.navigate(routes.HOME)}
          onPressDrawer={() => console.log('toggle drawer')}
        />

        <TextInput
          defaultValue={searchQuery}
          onChangeText={text => submitHandler(text)}
          search
          placeholder={'Search any product or keyword'}
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

        <View
          style={{width: wp(90), paddingBottom: hp(2), marginVertical: hp(2)}}>
          <FlatList
            numColumns={2}
            showsVerticalScrollIndicator={false}
            data={searchedProducts}
            keyExtractor={searchedProducts => searchedProducts.id}
            renderItem={({item}) => (
              <View style={{paddingRight: wp(2), paddingBottom: wp(2)}}>
                <ProductCard
                  onPressAdd={() => onPressAddToCart(item)}
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
                  time={calculateCountdown(item)}
                  onPressLike={() => onPressLike(item)}
                  onPressQuickBid={() => onPressQuickBid(item)}
                />
              </View>
            )}
          />
        </View>

        {searchedProducts.length == 0 && (
          <ProductCardHeader
            textLeft={'no products to show'}
            textRight={' try again'}
            noViewAll
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: hp(10),
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
