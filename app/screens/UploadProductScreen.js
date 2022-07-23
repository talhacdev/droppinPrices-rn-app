import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

import routes from '../navigation/routes';

import Button from '../components/Button';
import TextInput from '../components/TextInput';
import CategoryButton from '../components/CategoryButton';
import ListButton from '../components/ListButton';

import colors from '../config/colors';

import {types as TYPES} from '../config/config';

import {connect} from 'react-redux';
import {
  UpdateCart,
  UpdateCategories,
  UpdateProducts,
  UpdateUser,
} from '../redux/actions/AuthActions';
import fonts from '../config/fonts';
import images from '../config/images';

function UploadProductScreen(props) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [type, setType] = useState([]);
  const [selectedType, setSelectedType] = useState(0);
  const [description, setDescription] = useState('');
  const [minimumPrice, setMinimumPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [price, setPrice] = useState('');
  const [productName, setProductName] = useState('');
  const [image, setImage] = useState();
  const [image1, setImage1] = useState();
  const [image2, setImage2] = useState();
  const [image3, setImage3] = useState();
  const [quantity, setQuantity] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let reduxCategories = props.categoriesValue;
    let filteredCategories = reduxCategories.filter(i => i.id !== 0);
    setCategories(filteredCategories);

    setType(TYPES);
  }, [props.categoriesValue]);

  const onPressImage = id => {
    let options = {
      mediaType: 'photo',
      // cameraType: 'front',
      // saveToPhotos: true,
    };
    launchImageLibrary(options, response => {
      if (!response.didCancel) {
        const source = response.assets[0].uri;
        id == 0 && setImage(source.toString());
        id == 1 && setImage1(source.toString());
        id == 2 && setImage2(source.toString());
        id == 3 && setImage3(source.toString());
      }
    });
  };

  const uploadImage = async () => {
    // toggleModal();
    // setLoading(true);

    let uploadUri = image;
    let uploadUri1 = image;
    let uploadUri2 = image;
    let uploadUri3 = image;

    let fileName = moment()
      .format('HHMMSS' + Math.random() * (1 - 0) + 0)
      .replace(/[^0-9]/g, '');
    let fileName1 = moment()
      .format('HHMMSS' + Math.random() * (1 - 0) + 0)
      .replace(/[^0-9]/g, '');
    let fileName2 = moment()
      .format('HHMMSS' + Math.random() * (1 - 0) + 0)
      .replace(/[^0-9]/g, '');
    let fileName3 = moment()
      .format('HHMMSS' + Math.random() * (1 - 0) + 0)
      .replace(/[^0-9]/g, '');

    try {
      setLoading(true);
      await storage().ref(fileName).putFile(uploadUri);
      let url = await storage().ref(fileName).getDownloadURL();
      await storage().ref(fileName1).putFile(uploadUri1);
      let url1 = await storage().ref(fileName1).getDownloadURL();
      await storage().ref(fileName2).putFile(uploadUri2);
      let url2 = await storage().ref(fileName2).getDownloadURL();
      await storage().ref(fileName3).putFile(uploadUri3);
      let url3 = await storage().ref(fileName3).getDownloadURL();

      let imageArray = [url, url1, url2, url3];
      createProduct(imageArray);
    } catch (e) {
      setLoading(false);
      alert(e);
    }
  };

  const onPressCategory = item => {
    setSelectedCategory(item.id);
  };

  const onPressType = item => {
    setSelectedType(item.id);
  };

  const onPressUpload = () => {
    if (
      image &&
      image1 &&
      image2 &&
      image3 &&
      productName &&
      description &&
      quantity &&
      price &&
      minimumPrice &&
      originalPrice
    ) {
      uploadImage();
    }
  };

  const createProduct = imageArray => {
    let productObject = {
      active: true,
      auctionId:
        selectedType == 0
          ? ''
          : moment()
              .format('HHMMSS' + Math.random() * (1 - 0) + 0)
              .replace(/[^0-9]/g, ''),
      bid: selectedType == 0 ? false : true,
      bids: [],
      category: selectedCategory,
      description,
      quantity,
      id: moment()
        .format('HHMMSS' + Math.random() * (1 - 0) + 0)
        .replace(/[^0-9]/g, ''),
      image: imageArray,
      liked: false,
      minimumPrice,
      originalPrice,
      price: originalPrice,
      productName,
      // timestamp: moment().format('DD-MM-YYYY hh:mm:ss'),
      timestamp: moment().toISOString(),
    };

    firestore()
      .collection('Products')
      .doc(productObject.id)
      .set(productObject)
      .then(res => {
        console.log('res: ', res);
        alert('Product added!');
        setLoading(false);
        props.navigation.navigate(routes.HOME);
      })
      .catch(err => {
        setLoading(false);
        alert(err);
      });
  };

  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView behavior={'padding'} style={styles.container}>
        <View style={styles.container}>
          <View style={{width: wp(80)}}>
            <View style={{marginTop: hp(1)}}>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => onPressImage(0)}>
                  {image ? (
                    <Image
                      style={{
                        width: wp(25),
                        height: wp(25),
                        marginVertical: hp(1),
                        marginHorizontal: wp(1),
                      }}
                      source={{uri: image}}
                    />
                  ) : (
                    <View
                      style={{
                        width: wp(25),
                        height: wp(25),
                        marginVertical: hp(1),
                        marginHorizontal: wp(1),
                        backgroundColor: colors.textInput,
                      }}
                    />
                  )}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onPressImage(1)}>
                  {image1 ? (
                    <Image
                      style={{
                        width: wp(25),
                        height: wp(25),
                        marginVertical: hp(1),
                        marginHorizontal: wp(1),
                      }}
                      source={{uri: image1}}
                    />
                  ) : (
                    <View
                      style={{
                        width: wp(25),
                        height: wp(25),
                        marginVertical: hp(1),
                        marginHorizontal: wp(1),
                        backgroundColor: colors.textInput,
                      }}
                    />
                  )}
                </TouchableOpacity>
              </View>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => onPressImage(2)}>
                  {image2 ? (
                    <Image
                      style={{
                        width: wp(25),
                        height: wp(25),
                        marginVertical: hp(1),
                        marginHorizontal: wp(1),
                      }}
                      source={{uri: image2}}
                    />
                  ) : (
                    <View
                      style={{
                        width: wp(25),
                        height: wp(25),
                        marginVertical: hp(1),
                        marginHorizontal: wp(1),
                        backgroundColor: colors.textInput,
                      }}
                    />
                  )}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onPressImage(3)}>
                  {image3 ? (
                    <Image
                      style={{
                        width: wp(25),
                        height: wp(25),
                        marginVertical: hp(1),
                        marginHorizontal: wp(1),
                      }}
                      source={{uri: image3}}
                    />
                  ) : (
                    <View
                      style={{
                        width: wp(25),
                        height: wp(25),
                        marginVertical: hp(1),
                        marginHorizontal: wp(1),
                        backgroundColor: colors.textInput,
                      }}
                    />
                  )}
                </TouchableOpacity>
              </View>
              {/* <Text
                style={{
                  fontFamily: fonts.GilroyExtraBold,
                  fontSize: wp(4),
                  color: colors.textColor,
                }}>
                Select Type
              </Text> */}
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={type}
                keyExtractor={type => type.id}
                renderItem={({item}) => (
                  <View style={{marginVertical: hp(0.5), paddingRight: wp(2)}}>
                    <ListButton
                      onPress={() => onPressType(item)}
                      selected={selectedType == item.id}
                      item={item}
                    />
                  </View>
                )}
              />
            </View>
            <View style={{marginVertical: hp(1)}}>
              {/* <Text
                style={{
                  fontFamily: fonts.GilroyExtraBold,
                  fontSize: wp(4),
                  color: colors.textColor,
                }}>
                Select Category
              </Text> */}
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={categories}
                keyExtractor={categories => categories.id}
                renderItem={({item}) => (
                  <View style={{marginVertical: hp(0.5), paddingRight: wp(2)}}>
                    <CategoryButton
                      onPress={() => onPressCategory(item)}
                      selected={selectedCategory == item.id}
                      item={item}
                    />
                  </View>
                )}
              />
            </View>
          </View>

          <TextInput
            onChangeText={text => setProductName(text)}
            defaultValue={productName}
            placeholder={'Product Name'}
          />
          <TextInput
            onChangeText={text => setDescription(text)}
            defaultValue={description}
            placeholder={'Description'}
            multiline
          />
          <TextInput
            onChangeText={text => setQuantity(text)}
            defaultValue={quantity}
            placeholder={'Quantity'}
            keyboardType={'numeric'}
          />

          {/* <TextInput
            onChangeText={text => setPrice(text)}
            defaultValue={price}
            placeholder={'Price'}
            keyboardType={'numeric'}
          /> */}
          <TextInput
            onChangeText={text => setMinimumPrice(text)}
            defaultValue={minimumPrice}
            placeholder={'Minimum Price'}
            keyboardType={'numeric'}
          />
          <TextInput
            onChangeText={text => setOriginalPrice(text)}
            defaultValue={originalPrice}
            placeholder={'Original Price'}
            keyboardType={'numeric'}
          />

          <View style={styles.buttonContainer}>
            <Button
              disabled={loading}
              loading={loading}
              onPress={() => onPressUpload()}
              title={'Upload'}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingVertical: hp(1),
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingBottom: hp(10),
  },
  buttonContainer: {
    paddingVertical: hp(0.5),
  },
});

function mapStateToProps(state) {
  return {
    productsValue: state.auth.products,
    categoriesValue: state.auth.categories,
    cartValue: state.auth.cart,
    userValue: state.auth.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateProducts: payload => dispatch(UpdateProducts(payload)),
    updateCategories: payload => dispatch(UpdateCategories(payload)),
    updateCart: payload => dispatch(UpdateCart(payload)),
    updateUser: payload => dispatch(UpdateUser(payload)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UploadProductScreen);
