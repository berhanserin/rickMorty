import React, { useEffect, useMemo, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import Home from '@/pages/Home';
import Episode from '@/pages/Episode';
import Favourite from '@/pages/Favourite';

import Characters from '@/pages/Characters';

import HomeIcon from '@/assets/icons/Home.svg';
import FavoryIcon from '@/assets/icons/Favory.svg';
import EpisodeIcon from '@/assets/icons/Epsidose.svg';

import { Text } from '@/components';
import { RootState, useTypedSelector } from '@/store';

import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { Dimensions, View } from 'react-native';
import { changeBottom } from '@/store/reducers/bottomReducer';
import RemoveFav from './components/RemoveFav';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setFavorite } from './store/reducers/favReducer';

const MainApp = () => {
  const Tab = createBottomTabNavigator();

  const dispatch = useDispatch();
  const { show, title, size, type } = useSelector(
    (state: RootState) => state.bottom
  );
  const { removeFav, fav } = useTypedSelector(state => state.fav);
  const { height: screenHeight, width: screenWidth } = Dimensions.get('screen');

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => [`25%`, '32%', '50%', '75%', '90%'], []);

  const closeBottom = () => {
    bottomSheetModalRef.current!.forceClose();
    dispatch(changeBottom({ show: false, title: '', size: -1, type: -1 }));
  };

  useEffect(() => {
    if (show == true && title.length > 0) {
      bottomSheetModalRef.current?.present();
    } else {
      closeBottom();
    }
  }, [show]);

  const getFav = async () => {
    const value = await AsyncStorage.getItem('FavItem');
    if (value !== null) {
      dispatch(setFavorite(JSON.parse(value)));
    }
  };

  useEffect(() => {
    getFav();
  }, []);

  return (
    <>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={snapPoints}
        enableHandlePanningGesture={type === 0 ? true : false}
        enablePanDownToClose={type === 0 ? true : false}
        enableDynamicSizing={false}
        enableContentPanningGesture={type === 0 ? true : false}
        enableOverDrag={type === 0 ? true : false}
        backdropComponent={() => (
          <View
            style={{
              width: screenWidth,
              height: screenHeight,
              backgroundColor: '#00000090',
              position: 'absolute',
            }}
            onTouchStart={() => {
              closeBottom();
            }}
          />
        )}
        onDismiss={() => {
          dispatch(changeBottom({ show: !show, title: '', size: 0, type: 0 }));
        }}
        index={size}>
        {type == 0 ? (
          <>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text type="bottomTitle">{title}</Text>
            </View>
            <Characters />
          </>
        ) : (
          <BottomSheetView>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text type="bottomTitle">{title}</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <RemoveFav item={removeFav} />
            </View>
          </BottomSheetView>
        )}
      </BottomSheetModal>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}>
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarTestID: 'Home',
              tabBarStyle: { justifyContent: 'center', alignItems: 'center' },
              tabBarIcon: () => <HomeIcon />,
              tabBarLabel: 'Anasayfa',
            }}
          />
          <Tab.Screen
            name="Episode"
            component={Episode}
            options={{
              tabBarTestID: 'Episode',
              tabBarIcon: () => <EpisodeIcon />,
              tabBarLabel: 'Bölümler',
            }}
          />
          <Tab.Screen
            name="Favory"
            component={Favourite}
            options={{
              tabBarTestID: 'Favorite',
              tabBarIcon: () => <FavoryIcon />,
              tabBarLabel: 'Favori karakter',
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

export default MainApp;
