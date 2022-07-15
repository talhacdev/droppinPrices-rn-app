import React, {useState, useCallback} from 'react';
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
import HeaderText from '../components/HeaderText';
import ProductCardHeader from '../components/ProductCardHeader';
import images from '../config/images';

function ProductDetailScreen(props) {
  const item = props.route.params.item;
  const selectedCategory = item.category;

  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Header
          onPressBack={() => props.navigation.navigate(routes.HOME)}
          onPressDrawer={() => console.log('toggle drawer')}
        />

        <ProductCardHeader
          onPress={() => props.navigation.navigate(routes.PRODUCTS)}
          textLeft={'Product Listing View'}
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
                  onPress={() => setSelectedCategory(item.id)}
                  selected={selectedCategory == item.id}
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
              source={{uri: item.image}}
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
                source={{uri: item.image}}
              />
            </View>
            <View style={{borderRadius: wp(8), marginHorizontal: wp(2)}}>
              <Image
                style={{
                  width: wp(25),
                  height: hp(15),
                  resizeMode: 'contain',
                }}
                source={{uri: item.image}}
              />
            </View>
            <View style={{borderRadius: wp(8), marginHorizontal: wp(2)}}>
              <Image
                style={{
                  width: wp(25),
                  height: hp(15),
                  resizeMode: 'contain',
                }}
                source={{uri: item.image}}
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
              {item.productName}
            </Text>
          </View>

          {item.auctionId && (
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
                  $11,000
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
                  borderTopWidth: wp(0.1),
                  borderTopColor: colors.textColor,
                }}>
                <Text style={{color: colors.textColor}}>Higher Bid</Text>
                <Text
                  style={{
                    color: colors.textColor,
                    fontFamily: fonts.RobotoBold,
                  }}>
                  $11,000
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
                  borderTopWidth: wp(0.1),
                  borderTopColor: colors.textColor,
                }}>
                <Text style={{color: colors.textColor}}>Higher Bid</Text>
                <Text
                  style={{
                    color: colors.textColor,
                    fontFamily: fonts.RobotoBold,
                  }}>
                  $11,000
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
                <Text style={{color: colors.textColor}}>Higher Bid</Text>
                <Text
                  style={{
                    color: colors.textColor,
                    fontFamily: fonts.RobotoBold,
                  }}>
                  $11,000
                </Text>
              </View>
            </View>
          )}
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Button
              backgroundColor={colors.primary}
              fontSize={wp(3.5)}
              height={hp(8)}
              borderRadius={wp(2)}
              title={item.auctionId ? 'QUICK BID $900.00' : 'Add to Cart'}
              onPress={() => console.log('button pressed')}
            />
          </View>
          {item.auctionId && (
            <View style={styles.center}>
              <TextInput bid borderRadius={wp(2)} promoCode placeholder={' '} />
            </View>
          )}
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
              {item.description}
            </Text>
          </View>
        </View>
        {item.auctionId && (
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

              <DataTable.Title style={{width: wp('33%')}}>
                <Text style={{fontFamily: fonts.RobotoBold}}>Maximum Bid</Text>
              </DataTable.Title>

              <DataTable.Title
                style={{width: wp('33%'), justifyContent: 'flex-end'}}>
                <Text style={{fontFamily: fonts.RobotoBold}}>Expiration</Text>
              </DataTable.Title>
            </DataTable.Header>

            {ANALYTICS.map(item => (
              <DataTable.Row>
                <DataTable.Cell style={{width: wp('33%')}}>
                  <Text style={{color: colors.textColor}}>{'$17,659'}</Text>
                </DataTable.Cell>

                <DataTable.Cell style={{width: wp('33%')}}>
                  <Text style={{color: colors.textColor}}>{'$2,456,120'}</Text>
                </DataTable.Cell>

                <DataTable.Cell
                  style={{width: wp('33%'), justifyContent: 'flex-end'}}>
                  <Text style={{color: colors.textColor}}>
                    {'2d 14h 5m 11s'}
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
            data={PRODUCTS}
            keyExtractor={PRODUCTS => PRODUCTS.id}
            renderItem={({item}) => (
              <View style={{paddingRight: wp(2)}}>
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

export default ProductDetailScreen;
