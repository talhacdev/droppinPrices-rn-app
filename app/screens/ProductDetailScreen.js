import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {DataTable} from 'react-native-paper';
import moment from 'moment';

import routes from '../navigation/routes';

import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import TextInput from '../components/TextInput';
import CategoryButton from '../components/CategoryButton';
import Slider from '../components/Slider';
import Button from '../components/Button';

import fonts from '../config/fonts';
import colors from '../config/colors';

import {
  products as PRODUCTS,
  categories as CATEGORIES,
  analytics as ANALYTICS,
} from '../config/JSON';
import ProductCardHeader from '../components/ProductCardHeader';
import images from '../config/images';

import {connect} from 'react-redux';
import {UpdateCart, UpdateProducts} from '../redux/actions/AuthActions';

function ProductDetailScreen(props) {
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState({});

  const scrollRef = useRef();

  useEffect(() => {
    const item = props.route.params.item;
    let reduxProducts = props.productsValue;
    let tempProduct = reduxProducts.filter(i => i.id === item.id);
    setProduct(tempProduct[0]);
    setProducts(reduxProducts);
  }, [props.productsValue]);

  useEffect(() => {
    const item = props.route.params.item;
    let reduxProducts = props.productsValue;
    let tempProduct = reduxProducts.filter(i => i.id === item.id);
    setProduct(tempProduct[0]);
    setProducts(reduxProducts);
  });

  const onPressButton = item => {
    if (item.bid) {
      // place bid
    } else {
      onPressAddToCart(item);
    }
  };

  const onPressProductCard = item => {
    props.navigation.navigate(routes.PRODUCT_DETAIL, {item}),
      scrollRef.current?.scrollTo({
        y: 0,
        animated: true,
      });
  };

  const onPressLike = item => {
    let tempArray = products;
    let index = tempArray.indexOf(item);
    tempArray[index].liked = !item.liked;
    props.updateProducts([...products]);
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

  const calculateDiscount = item => {
    return 100 - Math.round((item.price / item.originalPrice) * 100);
  };

  const calculateQuickBid = item => {
    return 'QUICK BID $' + item.price;
  };

  const calculateHighestBid = item => {
    return Math.max(...item.bids.map(o => o.bidAmount));
  };

  const calculateLowestBid = item => {
    return Math.min(...item.bids.map(o => o.bidAmount));
  };

  const calculateCountdown = item => {
    let now = moment(new Date());
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

  return (
    <ScrollView
      ref={scrollRef}
      style={styles.screen}
      showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Header
          onPressBack={() => props.navigation.navigate(routes.HOME)}
          onPressDrawer={() => console.log('toggle drawer')}
        />

        <ProductCardHeader
          onPress={() => props.navigation.navigate(routes.PRODUCTS)}
          textLeft={'Product Detail'}
          noViewAll
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
                  disabled
                  selected={product.id == item.id}
                  item={item}
                />
              </View>
            )}
          />
        </View>

        <View
          style={{
            marginVertical: wp(4),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{borderRadius: wp(8)}}>
            <Image
              style={{
                width: wp(80),
                height: hp(50),
                resizeMode: 'contain',
              }}
              source={{uri: product.image}}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                borderRadius: wp(8),
                marginHorizontal: wp(2),
              }}>
              <Image
                style={{
                  width: wp(25),
                  height: hp(15),
                  resizeMode: 'contain',
                }}
                source={{uri: product.image}}
              />
            </View>
            <View style={{borderRadius: wp(8), marginHorizontal: wp(2)}}>
              <Image
                style={{
                  width: wp(25),
                  height: hp(15),
                  resizeMode: 'contain',
                }}
                source={{uri: product.image}}
              />
            </View>
            <View style={{borderRadius: wp(8), marginHorizontal: wp(2)}}>
              <Image
                style={{
                  width: wp(25),
                  height: hp(15),
                  resizeMode: 'contain',
                }}
                source={{uri: product.image}}
              />
            </View>
          </View>
        </View>

        <View
          style={{
            marginBottom: hp(4),
            paddingVertical: hp(4),
            width: wp(90),
            backgroundColor: colors.checkout,
            borderRadius: wp(4),
          }}>
          <View
            style={{
              paddingHorizontal: wp(4),
              marginBottom: hp(2),
            }}>
            <Text
              style={{
                fontSize: wp(3.5),
                color: colors.textColor,
              }}>
              {product.productName}
            </Text>
          </View>

          {product?.bids?.length >= 1 && (
            <View
              style={{
                borderRadius: wp(2),
                marginBottom: hp(2),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: wp(80),
                  backgroundColor: colors.secondary,
                  padding: wp(4),
                  borderTopLeftRadius: wp(2),
                  borderTopEndRadius: wp(2),
                  borderBottomColor: colors.textColor,
                }}>
                <Text style={{color: colors.textColor}}>Higher Bid</Text>
                <Text
                  style={{
                    color: colors.textColor,
                    fontFamily: fonts.RobotoBold,
                  }}>
                  {'$' + calculateHighestBid(product)}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: wp(80),
                  backgroundColor: colors.secondary,
                  padding: wp(4),
                  borderBottomLeftRadius: wp(2),
                  borderBottomEndRadius: wp(2),
                  borderTopWidth: wp(0.1),
                  borderTopColor: colors.textColor,
                }}>
                <Text style={{color: colors.textColor}}>Lowest Bid</Text>
                <Text
                  style={{
                    color: colors.textColor,
                    fontFamily: fonts.RobotoBold,
                  }}>
                  {'$' + calculateLowestBid(product)}
                </Text>
              </View>
            </View>
          )}

          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Button
              onPress={() => onPressButton(product)}
              backgroundColor={colors.primary}
              fontSize={wp(3.5)}
              height={hp(8)}
              borderRadius={wp(2)}
              title={product.bid ? calculateQuickBid(product) : 'Add to Cart'}
            />

            {product.bid && (
              <View style={styles.center}>
                <TextInput
                  bid
                  borderRadius={wp(2)}
                  promoCode
                  placeholder={' '}
                />
              </View>
            )}
          </View>

          <View
            style={{
              width: wp(90),
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              paddingHorizontal: wp(4),
            }}>
            <Text
              style={{
                fontSize: wp(3.5),
                color: colors.textColor,
                paddingVertical: hp(1),
              }}>
              Share with platforms
            </Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity style={styles.iconsContainer}>
                <Image
                  style={{width: wp(2.5), height: hp(5), resizeMode: 'contain'}}
                  source={images.facebook}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconsContainer}>
                <Image style={styles.icon} source={images.instagram} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconsContainer}>
                <Image style={styles.icon} source={images.twitter} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconsContainer}>
                <Image style={styles.icon} source={images.youtube} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View
          style={{
            marginBottom: hp(4),
            paddingVertical: hp(2),
            width: wp(90),
            backgroundColor: colors.checkout,
            borderRadius: wp(4),
          }}>
          <View
            style={{
              paddingHorizontal: wp(4),
              paddingTop: hp(1),
            }}>
            <Text
              style={{
                fontSize: wp(3.5),
                color: colors.textColor,
              }}>
              DESCRIPTION
            </Text>
          </View>

          <View
            style={{
              paddingHorizontal: wp(4),
              paddingVertical: hp(1),
            }}>
            <Text
              style={{
                fontSize: wp(3.5),
                color: colors.textColor,
              }}>
              {product.description}
            </Text>
          </View>
        </View>

        {product?.bids?.length >= 1 && (
          <DataTable style={{width: wp(90), paddingBottom: hp(4)}}>
            <View>
              <Text
                style={{
                  fontFamily: fonts.GilroyExtraBold,
                  fontSize: wp(4),
                  color: colors.textColor,
                }}>
                OFFERS
              </Text>
            </View>
            <DataTable.Header>
              <DataTable.Title style={{width: wp('33%')}}>
                <Text style={{fontFamily: fonts.RobotoBold}}>Price</Text>
              </DataTable.Title>

              <DataTable.Title numeric style={{width: wp('33%')}}>
                <Text style={{fontFamily: fonts.RobotoBold}}>Maxiumum Bid</Text>
              </DataTable.Title>

              <DataTable.Title
                numeric
                style={{width: wp('33%'), justifyContent: 'flex-end'}}>
                <Text style={{fontFamily: fonts.RobotoBold}}>Expiration</Text>
              </DataTable.Title>
            </DataTable.Header>

            {product.bids.map(item => (
              <DataTable.Row>
                <DataTable.Cell style={{width: wp('33%')}}>
                  <Text style={{color: colors.textColor}}>
                    {'$' + item.bidAmount}
                  </Text>
                </DataTable.Cell>

                <DataTable.Cell numeric style={{width: wp('33%')}}>
                  <Text style={{color: colors.textColor}}>
                    {'$' + calculateHighestBid(product)}
                  </Text>
                </DataTable.Cell>

                <DataTable.Cell
                  numeric
                  style={{width: wp('33%'), justifyContent: 'flex-end'}}>
                  <Text style={{color: colors.textColor}}>
                    {calculateCountdown(item)}
                  </Text>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        )}

        <ProductCardHeader
          onPress={() => props.navigation.navigate(routes.PRODUCTS)}
          textLeft={'Suggested'}
          textRight={' products'}
          subText={'Discover, collect, and sell extraordinary products'}
        />

        <View style={{width: wp(90)}}>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={products}
            keyExtractor={products => products.id}
            renderItem={({item}) => (
              <View style={{paddingRight: wp(2)}}>
                <ProductCard
                  onPress={() => onPressProductCard(item)}
                  productName={item.productName}
                  price={item.price}
                  originalPrice={item.originalPrice}
                  image={item.image}
                  discount={calculateDiscount(item)}
                  liked={item.liked}
                  minimumPrice={item.minimumPrice}
                  auctionId={item.auctionId}
                  bid={item.bid}
                  description={item.description}
                  onPressAdd={() => console.log('add pressed')}
                  onPressLike={() => onPressLike(item)}
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
    paddingBottom: hp(15),
    backgroundColor: colors.background,
  },
  iconsContainer: {
    width: hp(5),
    height: hp(5),
    elevation: hp(0.25),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    margin: wp(1),
    borderRadius: wp(8),
  },
  icon: {
    width: wp(4),
    height: hp(5),
    resizeMode: 'contain',
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductDetailScreen);
