import React, {useState, useCallback} from 'react';
import {View, StyleSheet, FlatList, ScrollView} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Header from '../components/Header';
import TextInput from '../components/TextInput';
import CategoryButton from '../components/CategoryButton';
import Slider from '../components/Slider';
import Button from '../components/Button';
import HeaderText from '../components/HeaderText';

import colors from '../config/colors';

import {products as PRODUCTS, categories as CATEGORIES} from '../config/JSON';
import ProductCard from '../components/ProductCard';

function BidsScreen(props) {
  const [selectedCategory, setSelectedCategory] = useState(0);

  const [low, setLow] = useState(20);
  const [high, setHigh] = useState(80);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);

  const handleValueChange = useCallback((low, high) => {
    setLow(low);
    setHigh(high);
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
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

        <TextInput search placeholder={'Search any product or keyword'} />

        <View style={{width: wp(90)}}>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={CATEGORIES}
            keyExtractor={CATEGORIES => CATEGORIES.id}
            renderItem={({item}) => (
              <View style={{paddingRight: wp(2)}}>
                <CategoryButton
                  onPress={() => setSelectedCategory(item.id)}
                  selected={selectedCategory == item.id}
                  item={item}
                />
              </View>
            )}
          />
        </View>

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
            data={PRODUCTS}
            keyExtractor={PRODUCTS => PRODUCTS.id}
            renderItem={({item}) => (
              <View style={{paddingRight: wp(2), paddingBottom: wp(2)}}>
                {item.auctionId && (
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
                )}
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

export default BidsScreen;
