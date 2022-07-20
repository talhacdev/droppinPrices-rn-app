import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {DataTable} from 'react-native-paper';
import moment from 'moment';

import Header from '../components/Header';
import TextInput from '../components/TextInput';
import HeaderText from '../components/HeaderText';

import fonts from '../config/fonts';
import colors from '../config/colors';

import {connect} from 'react-redux';

function AnalyticsScreen(props) {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [shopAnalytics, setShopAnalytics] = useState([]);
  const [bidAnalytics, setBidAnalytics] = useState([]);

  const [searchShopAnalytics, setSearchShopAnalytics] = useState([]);
  const [searchBidAnalytics, setSearchBidAnalytics] = useState([]);

  useEffect(() => {
    let tempShopAnalytics = props.ordersValue;
    let tempBidAnalytics = props.bidsValue;

    setShopAnalytics(tempShopAnalytics);
    setBidAnalytics(tempBidAnalytics);
    setSearchShopAnalytics(tempShopAnalytics);
    setSearchBidAnalytics(tempBidAnalytics);
  }, [props.ordersValue, props.bidsValue]);

  const submitHandler = val => {
    if (val) {
      if (selectedCategory == 0) {
        let tempAnalytics = props.ordersValue.filter(({cart}) =>
          cart.some(({productName}) =>
            productName?.toLowerCase().includes(val?.toLowerCase()),
          ),
        );
        setSearchShopAnalytics(tempAnalytics);
      } else {
        let tempAnalytics = props.bidsValue?.filter(m =>
          m?.item?.productName?.toLowerCase().includes(val?.toLowerCase()),
        );
        setSearchBidAnalytics(tempAnalytics);
      }
    } else {
      setSearchShopAnalytics(shopAnalytics);
      setSearchBidAnalytics(bidAnalytics);
    }
  };

  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Header onPressBack={() => props.navigation.goBack()} />

        <HeaderText
          headerText={
            shopAnalytics.length == 0 && bidAnalytics.length == 0
              ? 'No'
              : 'Your'
          }
          likedScreen
          likedScreenText={' Analytics'}
          containerStyle={{
            width: props.width || wp(90),
            paddingVertical: props.paddingVertical || 10,
          }}
        />

        {shopAnalytics.length >= 1 && bidAnalytics.length >= 1 && (
          <>
            <View
              style={{
                flexDirection: 'row',
                borderRadius: 8,
                marginTop: hp(1),
                marginBottom: hp(2),
              }}>
              <TouchableOpacity
                onPress={() => setSelectedCategory(0)}
                style={{
                  backgroundColor:
                    selectedCategory == 0 ? colors.primary : colors.background,
                  width: wp(25),
                  height: hp(8),
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderTopLeftRadius: 8,
                  borderBottomLeftRadius: 8,
                }}>
                <Text
                  style={{
                    color:
                      selectedCategory == 0
                        ? colors.background
                        : colors.textColor,
                    fontFamily: fonts.RobotoBold,
                  }}>
                  Shopping
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedCategory(1)}
                style={{
                  backgroundColor:
                    selectedCategory == 0 ? colors.background : colors.primary,
                  width: wp(25),
                  height: hp(8),
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderTopRightRadius: 8,
                  borderBottomRightRadius: 8,
                }}>
                <Text
                  style={{
                    color:
                      selectedCategory == 0
                        ? colors.textColor
                        : colors.background,
                    fontFamily: fonts.RobotoBold,
                  }}>
                  Bidding
                </Text>
              </TouchableOpacity>
            </View>
            <TextInput
              onChangeText={text => submitHandler(text)}
              search
              placeholder={'Search any product or keyword'}
            />
            <DataTable style={{width: wp(90)}}>
              {selectedCategory == 0 ? (
                <DataTable.Header>
                  <DataTable.Title>
                    <Text style={{fontFamily: fonts.RobotoBold}}>PRODUCT</Text>
                  </DataTable.Title>
                  <DataTable.Title>
                    <Text style={{fontFamily: fonts.RobotoBold}}>DATED</Text>
                  </DataTable.Title>
                  <DataTable.Title numeric>
                    <Text style={{fontFamily: fonts.RobotoBold}}>PAID</Text>
                  </DataTable.Title>
                </DataTable.Header>
              ) : (
                <DataTable.Header>
                  <DataTable.Title>
                    <Text style={{fontFamily: fonts.RobotoBold}}>PRODUCT</Text>
                  </DataTable.Title>
                  <DataTable.Title>
                    <Text style={{fontFamily: fonts.RobotoBold}}>DATED</Text>
                  </DataTable.Title>
                  <DataTable.Title numeric>
                    <Text style={{fontFamily: fonts.RobotoBold}}>OFFER</Text>
                  </DataTable.Title>
                </DataTable.Header>
              )}

              {selectedCategory == 0
                ? searchShopAnalytics?.map(item => (
                    <DataTable.Row>
                      <DataTable.Cell>
                        <Text style={{color: colors.textColor}}>
                          {item?.cart[0]?.productName}
                        </Text>
                      </DataTable.Cell>
                      <DataTable.Cell numeric>
                        <Text
                          style={{color: colors.textColor, fontSize: wp(3)}}>
                          {moment(item?.time).format('DD-MM-YYYY HH:mm:ss')}
                        </Text>
                      </DataTable.Cell>
                      <DataTable.Cell numeric>
                        <Text style={{fontFamily: fonts.RobotoBold}}>
                          {'$' + item?.totalPrice}
                        </Text>
                      </DataTable.Cell>
                    </DataTable.Row>
                  ))
                : searchBidAnalytics?.map(item => (
                    <DataTable.Row>
                      <DataTable.Cell>
                        <Text style={{color: colors.textColor}}>
                          {item?.item?.productName}
                        </Text>
                      </DataTable.Cell>
                      <DataTable.Cell numeric>
                        <Text
                          style={{color: colors.textColor, fontSize: wp(3)}}>
                          {moment(item?.time).format('DD-MM-YYYY HH:mm:ss')}
                        </Text>
                      </DataTable.Cell>
                      <DataTable.Cell numeric>
                        <Text style={{fontFamily: fonts.RobotoBold}}>
                          {'$' + item?.bidAmount}
                        </Text>
                      </DataTable.Cell>
                    </DataTable.Row>
                  ))}
            </DataTable>
          </>
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
    backgroundColor: colors.background,
    paddingBottom: hp(20),
  },
});

function mapStateToProps(state) {
  return {
    userValue: state.auth.user,
    bidsValue: state.auth.bids,
    ordersValue: state.auth.orders,
  };
}

export default connect(mapStateToProps)(AnalyticsScreen);
