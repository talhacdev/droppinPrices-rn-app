import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, FlatList, ScrollView} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import moment from 'moment';

import routes from '../navigation/routes';

import Header from '../components/Header';
import Slider from '../components/Slider';
import Button from '../components/Button';
import HeaderText from '../components/HeaderText';

import colors from '../config/colors';

import ProductCard from '../components/ProductCard';

import {connect} from 'react-redux';
import {UpdateCart, UpdateProducts} from '../redux/actions/AuthActions';
import ProductCardHeader from '../components/ProductCardHeader';

function BidsScreen(props) {
  const [productsToBid, setProductsToBid] = useState([]);

  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(100);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);

  const handleValueChange = useCallback((low, high) => {
    setLow(low);
    setHigh(high);
    let reduxProducts = props.productsValue;
    let tempProductsToBid = reduxProducts.filter(i => i.bid == true);

    if (low > 0 || high < 100) {
      console.log('enter');
      let array = [];
      for (let i = 0; i < tempProductsToBid.length; i++) {
        console.log('enter for');
        let item = tempProductsToBid[i];
        let discount = calculateDiscount(item);
        if (discount > low && discount < high) {
          array.push(tempProductsToBid[i]);
        }
        setProductsToBid(array);
      }
    }
  }, []);

  useEffect(() => {
    let reduxProducts = props.productsValue;

    let tempProductsToBid = reduxProducts.filter(i => i.bid == true);

    setProductsToBid(tempProductsToBid);
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

  const onPressQuickBid = item => {
    alert('Not available yet');
  };

  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Header
          onPressBack={() => props.navigation.goBack()}
          onPressDrawer={() => console.log('toggle drawer')}
        />

        <HeaderText
          headerText={'Bid before the time gets stop...'}
          containerStyle={{
            width: props.width || wp(90),
            paddingVertical: props.paddingVertical || 10,
          }}
        />

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
            data={productsToBid}
            keyExtractor={productsToBid => productsToBid.id}
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
                  time={calculateCountdown(item)}
                  onPressLike={() => onPressLike(item)}
                  onPressQuickBid={() => onPressQuickBid(item)}
                />
              </View>
            )}
          />
        </View>

        {/* 
        <Button
          backgroundColor={colors.secondary}
          width={wp(35)}
          fontSize={wp(3)}
          height={hp(6)}
          title={'BROWSE MORE'}
          onPress={() => console.log('button pressed')}
        /> */}

        {productsToBid.length == 0 && (
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

export default connect(mapStateToProps, mapDispatchToProps)(BidsScreen);
