import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, ScrollView} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import moment from 'moment';

import routes from '../navigation/routes';

import Header from '../components/Header';
import HeaderText from '../components/HeaderText';
import ProductCard from '../components/ProductCard';

import colors from '../config/colors';

import {connect} from 'react-redux';
import {UpdateCart, UpdateProducts} from '../redux/actions/AuthActions';

function LikedScreen(props) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let reduxProducts = props.productsValue;

    let tempLikedProducts = reduxProducts.filter(i => i.liked == true);

    setProducts(tempLikedProducts);
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
          onPressBack={() => props.navigation.goBack()}
          onPressDrawer={() => console.log('toggle drawer')}
        />

        <HeaderText
          headerText={products.length >= 1 ? 'Your liked' : 'No liked'}
          likedScreen
          likedScreenText={' products'}
          containerStyle={{
            width: props.width || wp(90),
            paddingVertical: props.paddingVertical || 10,
          }}
        />

        <View style={{width: wp(90), paddingBottom: hp(2)}}>
          <FlatList
            numColumns={2}
            showsVerticalScrollIndicator={false}
            data={products}
            keyExtractor={products => products.id}
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

export default connect(mapStateToProps, mapDispatchToProps)(LikedScreen);
