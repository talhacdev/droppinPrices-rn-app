import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, ScrollView} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import moment from 'moment';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import routes from '../navigation/routes';

import ProductCardHeader from '../components/ProductCardHeader';
import ProductCard from '../components/ProductCard';
import Carousel from '../components/Carousel';

import colors from '../config/colors';

import {connect} from 'react-redux';
import {
  UpdateCart,
  UpdateCategories,
  UpdateProducts,
  UpdateUser,
  UpdateOrders,
  UpdateBids,
} from '../redux/actions/AuthActions';

function HomeScreen(props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [productsToBuy, setProductsToBuy] = useState([]);
  const [productsToBid, setProductsToBid] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch();
      turnToAuction();
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch();
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const fetch = async () => {
    let loggedInUserId = auth()._user.uid;

    await firestore()
      .collection('Products')
      .get()
      .then(res => {
        if (res.docs) {
          let response = res.docs;
          let array = [];
          for (let i = 0; i < response.length; i++) {
            array.push(response[i]._data);
          }
          let activeProducts = array.filter(i => i.active == true);
          props.updateProducts(activeProducts);
        }
      })
      .catch(error => alert('products: ', error));

    await firestore()
      .collection('Orders')
      .where('uid', '==', loggedInUserId)
      .get()
      .then(res => {
        if (res.docs) {
          let response = res.docs;
          let array = [];
          for (let i = 0; i < response.length; i++) {
            array.push(response[i]._data);
          }
          props.updateOrders(array);
        }
      })
      .catch(error => alert(error));

    await firestore()
      .collection('Bids')
      .where('uid', '==', loggedInUserId)
      .get()
      .then(res => {
        if (res.docs) {
          let response = res.docs;
          let array = [];
          for (let i = 0; i < response.length; i++) {
            array.push(response[i]._data);
          }
          props.updateBids(array);
        }
      })
      .catch(error => alert('users: ', error));

    // await firestore()
    //   .collection('categories')
    //   .get()
    //   .then(res => {
    //     console.log('categories res: ', res.docs);
    //     props.updateCategories([...res.docs._data.categories]);
    //   })
    //   .catch(error => alert('categories: ', error));

    await firestore()
      .collection('Users')
      .where('uid', '==', loggedInUserId)
      .get()
      .then(res => {
        if (res.docs) {
          let response = res.docs;
          let user = response[0]._data;
          props.updateUser(user);
        }
      })
      .catch(error => alert('users: ', error));
  };

  // useEffect(() => {
  //   fetchUsers();
  // }, []);

  // const fetchUsers = async () => {
  //   fetch('http://127.0.0.1:8080/get', {
  //     method: 'GET',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //   }).then(res => console.log('res: ', res));
  // };

  useEffect(() => {
    let reduxProducts = props.productsValue;

    let tempProductsToBuy = reduxProducts.filter(i => i.bid == false);
    let tempProductsToBid = reduxProducts.filter(i => i.bid == true);

    setProductsToBuy(tempProductsToBuy);
    setProductsToBid(tempProductsToBid);
  }, [props.productsValue]);

  const turnToAuction = () => {
    let reduxProducts = props.productsValue;

    for (let i = 0; i < reduxProducts.length; i++) {
      if (reduxProducts[i].bid == false) {
        var now = moment(new Date());
        var timestamp = moment(reduxProducts[i].timestamp);
        var duration = moment.duration(now.diff(timestamp));
        var hours = duration.asHours();
        if (hours > 360) {
          reduxProducts[i].auctionId = moment().format(
            'HHMMSS' + Math.random() * (1 - 0) + 0,
          );
          reduxProducts[i].bid = true;
          (reduxProducts[i].timestamp = moment(new Date())),
            props.updateProducts([...reduxProducts]);
        } else if (hours > 336) {
          let discount = calculateDiscount(reduxProducts[i]);
          if (discount < 90) {
            let price = (10 * reduxProducts[i].originalPrice) / 100;
            reduxProducts[i].price = price;
            props.updateProducts([...reduxProducts]);
          }
        } else if (hours > 312) {
          let discount = calculateDiscount(reduxProducts[i]);
          if (discount < 80) {
            let price = (20 * reduxProducts[i].originalPrice) / 100;
            reduxProducts[i].price = price;
            props.updateProducts([...reduxProducts]);
          }
        } else if (hours > 288) {
          let discount = calculateDiscount(reduxProducts[i]);
          if (discount < 70) {
            let price = (30 * reduxProducts[i].originalPrice) / 100;
            reduxProducts[i].price = price;
            props.updateProducts([...reduxProducts]);
          }
        } else if (hours > 240) {
          let discount = calculateDiscount(reduxProducts[i]);
          if (discount < 60) {
            let price = (40 * reduxProducts[i].originalPrice) / 100;
            reduxProducts[i].price = price;
            props.updateProducts([...reduxProducts]);
          }
        } else if (hours > 264) {
          let discount = calculateDiscount(reduxProducts[i]);
          if (discount < 50) {
            let price = (50 * reduxProducts[i].originalPrice) / 100;
            reduxProducts[i].price = price;
            props.updateProducts([...reduxProducts]);
          }
        } else if (hours > 240) {
          let discount = calculateDiscount(reduxProducts[i]);
          if (discount < 40) {
            let price = (60 * reduxProducts[i].originalPrice) / 100;
            reduxProducts[i].price = price;
            props.updateProducts([...reduxProducts]);
          }
        } else if (hours > 216) {
          let discount = calculateDiscount(reduxProducts[i]);
          if (discount < 30) {
            let price = (70 * reduxProducts[i].originalPrice) / 100;
            reduxProducts[i].price = price;
            props.updateProducts([...reduxProducts]);
          }
        } else if (hours > 192) {
          let discount = calculateDiscount(reduxProducts[i]);
          if (discount < 20) {
            let price = (80 * reduxProducts[i].originalPrice) / 100;
            reduxProducts[i].price = price;
            props.updateProducts([...reduxProducts]);
          }
        } else if (hours > 168) {
          let discount = calculateDiscount(reduxProducts[i]);
          if (discount < 10) {
            let price = (90 * reduxProducts[i].originalPrice) / 100;
            reduxProducts[i].price = price;
            props.updateProducts([...reduxProducts]);
          }
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

  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <ProductCardHeader
          onPress={() => props.navigation.navigate(routes.BIDS)}
          textLeft={'Bid'}
          textRight={' gallery'}
          subText={'Discover, collect, and sell extraordinary products'}
        />

        <Carousel
          carouselItems={productsToBid}
          activeIndex={activeIndex}
          onSnapToItem={index => setActiveIndex(index)}
          onPress={() => onPressCarousel()}
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
            data={productsToBuy}
            keyExtractor={productsToBuy => productsToBuy.id}
            renderItem={({item}) => (
              <View style={{paddingRight: wp(2)}}>
                <ProductCard
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
                  onPressAdd={() => onPressAddToCart(item)}
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
    paddingVertical: hp(2),
    paddingBottom: hp(10),
    backgroundColor: colors.background,
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
    updateCategories: payload => dispatch(UpdateCategories(payload)),
    updateUser: payload => dispatch(UpdateUser(payload)),
    updateOrders: payload => dispatch(UpdateOrders(payload)),
    updateBids: payload => dispatch(UpdateBids(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
