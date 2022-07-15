import React from 'react';
import {View, StyleSheet, FlatList, ScrollView} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Header from '../components/Header';
import Button from '../components/Button';
import HeaderText from '../components/HeaderText';
import ProductCard from '../components/ProductCard';

import colors from '../config/colors';

import {products as PRODUCTS} from '../config/JSON';

function LikedScreen(props) {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Header
          onPressBack={() => props.navigation.goBack()}
          onPressDrawer={() => console.log('toggle drawer')}
        />

        <HeaderText
          headerText={'Your liked'}
          likedScreen
          likedScreenText={' products'}
          containerStyle={{
            width: props.width || wp(90),
            paddingVertical: props.paddingVertical || 10,
          }}
        />

        <View style={{width: wp(90), paddingBottom: hp(2)}}>
          <FlatList
            numColumns={3}
            showsVerticalScrollIndicator={false}
            data={PRODUCTS}
            keyExtractor={PRODUCTS => PRODUCTS.id}
            renderItem={({item}) => (
              <View style={{paddingRight: wp(2), paddingBottom: wp(2)}}>
                <ProductCard
                  onPress={() => console.log('card pressed')}
                  productName={item.productName}
                  price={item.price}
                  originalPrice={item.originalPrice}
                  image={item.image}
                  discount={item.discount}
                  liked={item.liked}
                  minimumPrice={item.minimumPrice}
                  auctionId={item.auctionId}
                  onPressAdd={() => console.log('add pressed')}
                  onPressLike={() => console.log('like pressed')}
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

export default LikedScreen;
