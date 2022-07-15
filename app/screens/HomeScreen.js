import React, {useState} from 'react';
import {View, StyleSheet, FlatList, ScrollView} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import auth from '@react-native-firebase/auth';

import routes from '../navigation/routes';

import Header from '../components/Header';
import ProductCardHeader from '../components/ProductCardHeader';
import ProductCard from '../components/ProductCard';
import Carousel from '../components/Carousel';

import colors from '../config/colors';

import {products as PRODUCTS} from '../config/JSON';

function HomeScreen(props) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Header
          onPressBack={() => {
            auth()
              .signOut()
              .then(() => console.log('User signed out!'));
          }}
          onPressDrawer={() => console.log('toggle drawer')}
        />

        <ProductCardHeader
          onPress={() => props.navigation.navigate(routes.BIDS)}
          textLeft={'Bid'}
          textRight={' gallery'}
          subText={'Discover, collect, and sell extraordinary products'}
        />

        <Carousel
          carouselItems={PRODUCTS}
          activeIndex={activeIndex}
          onSnapToItem={index => setActiveIndex(index)}
          onPress={() => console.log('carousel button pressed')}
        />

        <ProductCardHeader
          onPress={() => props.navigation.navigate(routes.PRODUCTS)}
          textLeft={'Shop'}
          textRight={' products'}
          subText={'Discover, collect, and sell extraordinary products'}
        />

        <View style={{width: wp(90), paddingBottom: hp(2)}}>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={PRODUCTS}
            keyExtractor={PRODUCTS => PRODUCTS.id}
            renderItem={({item}) => (
              <View style={{paddingRight: wp(2)}}>
                {!item.auctionId && (
                  <ProductCard
                    onPress={() =>
                      props.navigation.navigate(routes.PRODUCT_DETAIL, {item})
                    }
                    productName={item.productName}
                    price={item.price}
                    originalPrice={item.originalPrice}
                    image={item.image}
                    discount={item.discount}
                    liked={item.liked}
                    minimumPrice={item.minimumPrice}
                    auctionId={item.auctionId}
                    description={item.description}
                    onPressAdd={() => console.log('add pressed')}
                    onPressLike={() => console.log('like pressed')}
                  />
                )}
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
});

export default HomeScreen;
