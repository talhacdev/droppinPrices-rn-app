import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Header from '../components/Header';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import CartCard from '../components/CartCard';

import fonts from '../config/fonts';
import images from '../config/images';
import colors from '../config/colors';

import {connect} from 'react-redux';
import {UpdateCart, UpdateProducts} from '../redux/actions/AuthActions';

function CartScreen(props) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let reduxCart = props.cartValue;

    setCart(reduxCart);
  }, [props.cartValue, props.productsValue]);

  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Header
          onPressBack={() => props.navigation.goBack()}
          onPressDrawer={() => console.log('toggle drawer')}
        />

        <View
          style={{
            width: wp(90),
            elevation: wp(0.1),
            backgroundColor: colors.background,
          }}>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: wp(4),
              justifyContent: 'space-between',
              paddingTop: hp(1),
            }}>
            <View>
              <Text
                style={{
                  fontFamily: fonts.RobotoBold,
                  fontSize: wp(5),
                  color: colors.textColor,
                }}>
                My Cart
              </Text>
            </View>
            <View>
              <Image
                style={{
                  width: wp(2.5),
                  height: hp(5),
                  resizeMode: 'contain',
                }}
                source={images.close}
              />
            </View>
          </View>
          <View style={styles.center}>
            <View
              style={{
                width: wp(85),
                borderWidth: wp(0.1),
                borderColor: colors.textColor,
                opacity: 0.5,
                marginVertical: hp(2),
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: wp(4),
            }}>
            <Text
              style={{
                fontSize: wp(3.5),
                color: colors.textColor,
                opacity: 0.35,
                fontFamily: fonts.RobotoBold,
              }}>
              Product
            </Text>
            <Text
              style={{
                fontSize: wp(3.5),
                color: colors.textColor,
                opacity: 0.35,
                fontFamily: fonts.RobotoBold,
              }}>
              Amount
            </Text>
          </View>

          <View style={{width: wp(90), paddingBottom: hp(2)}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={cart}
              keyExtractor={cart => cart.id}
              renderItem={({item}) => (
                <View style={{paddingRight: wp(2)}}>
                  <CartCard
                    onPress={() => console.log('card pressed')}
                    productName={item.productName}
                    price={item.price}
                    image={item.image}
                    category={item.category}
                    onPressRemove={() => console.log('remove pressed')}
                  />
                </View>
              )}
            />
          </View>
        </View>

        <View
          style={{
            marginVertical: hp(4),
            paddingVertical: hp(3),
            width: wp(90),
            backgroundColor: colors.checkout,
          }}>
          <View
            style={{
              paddingHorizontal: wp(4),
            }}>
            <Text
              style={{
                fontSize: wp(3.5),
                color: colors.textColor,
                opacity: 0.35,
                fontFamily: fonts.RobotoBold,
              }}>
              Promo Code
            </Text>
          </View>
          <View style={styles.center}>
            <TextInput promoCode placeholder={' '} />
          </View>
          <View style={styles.center}>
            <View
              style={{
                width: wp(85),
                borderWidth: wp(0.1),
                borderColor: colors.textColor,
                opacity: 0.5,
                marginVertical: hp(2),
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: wp(4),
            }}>
            <Text
              style={{
                fontSize: wp(3.5),
                color: colors.textColor,
                opacity: 0.35,
                fontFamily: fonts.RobotoBold,
              }}>
              Total Cost
            </Text>
            <Text
              style={{
                fontSize: wp(4),
                color: colors.textColor,
                fontFamily: fonts.RobotoBold,
              }}>
              $1950.00
            </Text>
          </View>
          <View style={styles.bottomButton}>
            <Button
              backgroundColor={colors.secondary}
              fontSize={wp(3.5)}
              height={hp(8)}
              borderRadius={wp(2)}
              title={'CHECK OUT'}
              onPress={() => console.log('button pressed')}
            />
          </View>
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
    backgroundColor: colors.background,
    paddingBottom: hp(10),
  },
  center: {justifyContent: 'center', alignItems: 'center'},
  bottomButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(4),
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

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);
