import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {DataTable} from 'react-native-paper';

import Header from '../components/Header';
import TextInput from '../components/TextInput';
import HeaderText from '../components/HeaderText';

import fonts from '../config/fonts';
import colors from '../config/colors';

import {analytics as ANALYTICS} from '../config/JSON';

function AnalyticsScreen(props) {
  const [selectedCategory, setSelectedCategory] = useState(0);

  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Header
          onPressBack={() => props.navigation.goBack()}
          onPressDrawer={() => console.log('toggle drawer')}
        />

        <HeaderText
          headerText={'Your'}
          likedScreen
          likedScreenText={' Analytics'}
          containerStyle={{
            width: props.width || wp(90),
            paddingVertical: props.paddingVertical || 10,
          }}
        />

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
                  selectedCategory == 0 ? colors.background : colors.textColor,
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
                  selectedCategory == 0 ? colors.textColor : colors.background,
                fontFamily: fonts.RobotoBold,
              }}>
              Bidding
            </Text>
          </TouchableOpacity>
        </View>

        <TextInput search placeholder={'Search any product or keyword'} />

        <DataTable style={{width: wp(90)}}>
          <DataTable.Header>
            <DataTable.Title>
              <Text style={{fontFamily: fonts.RobotoBold}}>PRODUCT</Text>
            </DataTable.Title>
            <DataTable.Title numeric>
              <Text style={{fontFamily: fonts.RobotoBold}}>DATED</Text>
            </DataTable.Title>
            <DataTable.Title numeric>
              <Text style={{fontFamily: fonts.RobotoBold}}>PAID</Text>
            </DataTable.Title>
          </DataTable.Header>

          {ANALYTICS.map(item => (
            <DataTable.Row>
              <DataTable.Cell>
                <Text style={{color: colors.textColor}}>
                  {item.productName}
                </Text>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <Text style={{color: colors.textColor}}>{item.date}</Text>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <Text style={{fontFamily: fonts.RobotoBold}}>
                  {'$' + item.paid}
                </Text>
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
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

export default AnalyticsScreen;
