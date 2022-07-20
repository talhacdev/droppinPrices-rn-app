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
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import routes from '../navigation/routes';

import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import TextInput from '../components/TextInput';
import CategoryButton from '../components/CategoryButton';
import Button from '../components/Button';

import fonts from '../config/fonts';
import colors from '../config/colors';

import ProductCardHeader from '../components/ProductCardHeader';
import images from '../config/images';

import {connect} from 'react-redux';
import {UpdateCart, UpdateProducts} from '../redux/actions/AuthActions';

function ProductDetailScreen(props) {
  const [products, setProducts] = useState({});
  const [bidSet, setBidSet] = useState('');
  const [category, setCategory] = useState({});
  const [bids, setBids] = useState([]);

  const scrollRef = useRef();

  useEffect(() => {
    const item = props.route.params.item;

    let reduxProducts = props.productsValue;
    let reduxCategories = props.categoriesValue;

    let tempCategory = reduxCategories.filter(i => i.id === item.category);

    setProducts(reduxProducts);
    setCategory(tempCategory[0]);
    fetchBids();
  }, [props]);

  const fetchBids = async () => {
    console.log('Fetching: ', props.route.params.item.id);
    await firestore()
      .collection('Bids')
      .get()
      .then(res => {
        if (res.docs) {
          let response = res.docs;
          let array = [];
          for (let i = 0; i < response.length; i++) {
            array.push(response[i]._data);
          }
          let tempAnalytics = array?.filter(
            m => m?.item?.id == props.route.params.item.id,
          );
          setBids(tempAnalytics);
        }
      })
      .catch(error => alert(error));
  };

  const onPressButton = item => {
    if (item.bid) {
      onPressQuickBid(item);
    } else {
      onPressAddToCart(item);
    }
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
    return Math.max(...item.map(o => o.bidAmount));
  };

  const calculateLowestBid = item => {
    return Math.min(...item.map(o => o.bidAmount));
  };

  const calculateCountdown = item => {
    let now = moment(new Date());
    let timestamp = moment().toDate(item.timestamp);
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

  const onPressSubmitYourBid = item => {
    if (parseFloat(bidSet) >= parseFloat(item.minimumPrice)) {
      console.log('bidSet: ', item.minimumPrice);
      createBid(item);
    } else {
      alert('Bid > Minimum price');
    }
  };

  const onPressQuickBid = item => {
    if (item.price > 0) {
      quickBid(item);
    }
  };

  const quickBid = item => {
    let bidObject = {
      id: moment()
        .format('HHMMSS' + Math.random() * (1 - 0) + 0)
        .replace(/[^0-9]/g, ''),
      uid: auth()._user.uid,
      item,
      bidAmount: item.price,
    };

    firestore()
      .collection('Bids')
      .doc(bidObject.id)
      .set(bidObject)
      .then(() => {
        alert('Bid added!');
        props.navigation.navigate(routes.HOME);
      })
      .catch(err => {
        alert(err);
      });
  };

  const createBid = item => {
    let bidObject = {
      id: moment()
        .format('HHMMSS' + Math.random() * (1 - 0) + 0)
        .replace(/[^0-9]/g, ''),
      uid: auth()._user.uid,
      item,
      bidAmount: bidSet,
    };

    firestore()
      .collection('Bids')
      .doc(bidObject.id)
      .set(bidObject)
      .then(() => {
        alert('Bid added!');
        props.navigation.navigate(routes.HOME);
      })
      .catch(err => {
        alert(err);
      });
  };

  const onPressCard = item => {
    props.navigation.navigate(routes.PRODUCT_DETAIL, {item}),
      scrollRef.current?.scrollTo({
        y: 0,
        animated: true,
      });
  };

  return (
    <ScrollView
      ref={scrollRef}
      style={styles.screen}
      showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Header onPressBack={() => props.navigation.goBack()} />

        <ProductCardHeader
          onPress={() => props.navigation.navigate(routes.PRODUCTS)}
          textLeft={'Product Detail'}
          noViewAll
        />

        <View
          style={{
            width: wp(90),
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
          <CategoryButton disabled selected={true} item={category} />
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
              source={{uri: props.route.params.item.image[0]}}
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
                source={{uri: props.route.params.item.image[1]}}
              />
            </View>
            <View style={{borderRadius: wp(8), marginHorizontal: wp(2)}}>
              <Image
                style={{
                  width: wp(25),
                  height: hp(15),
                  resizeMode: 'contain',
                }}
                source={{uri: props.route.params.item.image[2]}}
              />
            </View>
            <View style={{borderRadius: wp(8), marginHorizontal: wp(2)}}>
              <Image
                style={{
                  width: wp(25),
                  height: hp(15),
                  resizeMode: 'contain',
                }}
                source={{uri: props.route.params.item.image[3]}}
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
              {props.route.params.item.productName}
            </Text>
          </View>

          {bids?.length >= 1 && (
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
                  backgroundColor: colors.bids,
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
                  {'$' + calculateHighestBid(bids)}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: wp(80),
                  backgroundColor: colors.bids,
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
                  {'$' + calculateLowestBid(bids)}
                </Text>
              </View>
            </View>
          )}

          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Button
              onPress={() => onPressButton(props.route.params.item)}
              backgroundColor={colors.primary}
              fontSize={wp(3.5)}
              height={hp(8)}
              borderRadius={wp(2)}
              title={
                props.route.params.item.bid
                  ? calculateQuickBid(props.route.params.item)
                  : 'ADD TO CART'
              }
            />

            {props.route.params.item.bid && (
              <View style={styles.center}>
                <TextInput
                  bid
                  borderRadius={wp(2)}
                  promoCode
                  placeholder={' '}
                  defaultValue={bidSet}
                  keyboardType={'numeric'}
                  onPress={() => onPressSubmitYourBid(props.route.params.item)}
                  onChangeText={text => setBidSet(text)}
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
              {props.route.params.item.description}
            </Text>
          </View>
        </View>

        {bids?.length >= 1 && (
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

            {bids.map(item => (
              <DataTable.Row>
                <DataTable.Cell style={{width: wp('33%')}}>
                  <Text style={{color: colors.textColor}}>
                    {'$' + item?.bidAmount}
                  </Text>
                </DataTable.Cell>

                <DataTable.Cell numeric style={{width: wp('33%')}}>
                  <Text style={{color: colors.textColor}}>
                    {'$' + calculateHighestBid(bids)}
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
                  onPressAdd={() => onPressAddToCart(item)}
                  onPress={() => onPressCard(item)}
                  productName={item.productName}
                  price={item.price}
                  originalPrice={item.originalPrice}
                  image={item.image[0]}
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
    categoriesValue: state.auth.categories,
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
