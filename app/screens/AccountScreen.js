import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import auth from '@react-native-firebase/auth';
import moment from 'moment';

import routes from '../navigation/routes';

import Header from '../components/Header';
import ProductCardHeader from '../components/ProductCardHeader';
import ProductCard from '../components/ProductCard';
import Carousel from '../components/Carousel';

import colors from '../config/colors';

import {connect} from 'react-redux';
import {UpdateCart, UpdateProducts} from '../redux/actions/AuthActions';
import fonts from '../config/fonts';
import images from '../config/images';
import Button from '../components/Button';

function AccountScreen(props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [productsToBuy, setProductsToBuy] = useState([]);
  const [productsToBid, setProductsToBid] = useState([]);
  const [user, setUser] = useState({});

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     turnToAuction();
  //   }, 60000);
  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    let reduxProducts = props.productsValue;
    let reduxUser = props.userValue;

    console.log('reduxUser: ', reduxUser.image);

    let tempProductsToBuy = reduxProducts.filter(i => i.bid == false);
    let tempProductsToBid = reduxProducts.filter(i => i.bid == true);

    setProductsToBuy(tempProductsToBuy);
    setProductsToBid(tempProductsToBid);
    setUser(reduxUser);
  }, [props.productsValue]);

  const turnToAuction = () => {
    let reduxProducts = props.productsValue;

    for (let i = 0; i < reduxProducts.length; i++) {
      if (reduxProducts[i].bid == false) {
        var now = moment(new Date());
        var timestamp = reduxProducts[i].timestamp;
        var duration = moment.duration(now.diff(timestamp));
        var hours = duration.asHours();
        if (hours > 0.3) {
          reduxProducts[i].auctionId = moment();
          reduxProducts[i].bid = true;
          props.updateProducts([...reduxProducts]);
        }
      }
    }
  };

  const calculateDiscount = item => {
    return 100 - Math.round((item.price / item.originalPrice) * 100);
  };

  const onPressLike = item => {
    let reduxProducts = props.productsValue;

    let index = reduxProducts.indexOf(item);
    reduxProducts[index].liked = !item.liked;

    props.updateProducts([...reduxProducts]);
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

  const onPressCarousel = () => {
    props.navigation.navigate(routes.BIDS);
  };

  const onPressLogout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: colors.primary,
            borderBottomLeftRadius: wp(8),
            borderBottomRightRadius: wp(8),
          }}>
          <Header
            onPressBack={() => props.navigation.goBack()}
            onPressDrawer={() => console.log('toggle drawer')}
          />
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{uri: user.image}} />
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: hp(2),
                marginBottom: hp(4),
              }}>
              <Text
                style={{
                  fontFamily: fonts.RobotoBold,
                  fontSize: wp(4.5),
                  color: colors.buttonText,
                }}>
                {user.name}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View style={{marginRight: wp(1)}}>
                  <Image style={styles.location} source={images.location} />
                </View>
                <Text
                  style={{
                    fontFamily: fonts.RobotoRegular,
                    fontSize: wp(3.5),
                    color: colors.buttonText,
                    opacity: 0.5,
                  }}>
                  {user.location}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{width: wp(85), marginVertical: hp(4)}}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate(routes.ANALYTICS)}
            style={{
              height: hp(6),
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontFamily: fonts.PoppinsRegular,
                fontSize: wp(4),
                color: colors.textColor,
              }}>
              Analytics
            </Text>
          </TouchableOpacity>
          <View style={{backgroundColor: colors.search, height: hp(0.1)}} />
          <TouchableOpacity
            style={{
              height: hp(6),
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontFamily: fonts.PoppinsRegular,
                fontSize: wp(4),
                color: colors.textColor,
              }}>
              Help
            </Text>
          </TouchableOpacity>
          <View style={{backgroundColor: colors.search, height: hp(0.1)}} />
        </View>
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.buttonContainer}>
          <Button
            backgroundColor={colors.secondary}
            onPress={() => onPressLogout()}
            title={'Log Out'}
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
  imageContainer: {
    width: wp(32),
    height: hp(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: wp(32),
    height: hp(20),
    borderRadius: wp(25),
    resizeMode: 'contain',
  },
  location: {
    width: wp(3.5),
    height: hp(3.5),
    resizeMode: 'contain',
  },
  buttonContainer: {
    paddingVertical: hp(0.5),
  },
});

function mapStateToProps(state) {
  return {
    productsValue: state.auth.products,
    cartValue: state.auth.cart,
    userValue: state.auth.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateProducts: payload => dispatch(UpdateProducts(payload)),
    updateCart: payload => dispatch(UpdateCart(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen);
