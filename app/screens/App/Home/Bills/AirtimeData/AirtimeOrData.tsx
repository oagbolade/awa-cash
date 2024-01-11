import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import React from 'react';

import { Airtime, Data } from './Screens';

import { AltHeader, Container, Text } from 'components';
import { layout, pallets } from 'constant';

const routes = [
  { key: 'airtime', title: 'Airtime' },
  { key: 'data', title: 'Data' },
];

const renderScene = SceneMap({
  airtime: Airtime,
  data: Data,
});

const { spacing, window } = layout;

export default function AirtimeOrData(): JSX.Element {
  const [index, setIndex] = React.useState(0);

  return (
    <View style={styles.container}>
      <AltHeader label="Data & Airtime" />
      <Container>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: window.width }}
          renderTabBar={props => {
            return (
              <TabBar
                {...props}
                style={styles.tab}
                indicatorStyle={{ display: 'none', opacity: 0 }}
                activeColor={pallets.text}
                inactiveColor={pallets.grey}
                renderTabBarItem={({ route }) => {
                  const routeIndex = routes.indexOf(route);
                  const active = routeIndex === index;
                  return (
                    <TouchableOpacity
                      style={[
                        styles.tabBar,
                        active && { backgroundColor: pallets.primary },
                      ]}
                      key={route.key}
                      onPress={() => setIndex(routeIndex)}>
                      <View style={{ padding: 8 }}>
                        <Text color={active ? pallets.white : pallets.text}>
                          {route.title}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            );
          }}
        />
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tab: {
    backgroundColor: pallets.grey3,
    borderRadius: 30,
    height: 50,
  },
  tabBar: {
    alignItems: 'center',
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    width: (window.width - spacing.padding * 2) / 2,
  },
});
