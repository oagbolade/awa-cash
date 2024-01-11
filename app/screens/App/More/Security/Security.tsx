import { FlatList } from 'react-native';

import { SectionCard } from '../Components';
import { securitySettings } from '../Data';

import { Container, Divider, Header, VirtualScroll } from 'components';
import { pallets } from 'constant';
import { AppRoutes, MoreRoutes, RootNavigationProp } from 'navigation';

export default function Security({
  navigation,
}: RootNavigationProp<AppRoutes, MoreRoutes, 'Security'>): JSX.Element {
  return (
    <>
      <Header
        label="Security Settings"
        color={pallets.primary}
        iconColor={pallets.white}
      />
      <>
        <VirtualScroll bounces={false}>
          <Container>
            <Divider space="l" />
            <FlatList
              ListHeaderComponent={() => <Divider space="m" />}
              data={securitySettings}
              ItemSeparatorComponent={() => <Divider space="m" />}
              renderItem={({ item }) => (
                <>
                  <SectionCard
                    item={{
                      color: item.color,
                      icon: item.icon,
                      title: item.title.toString(),
                    }}
                    onPress={() => {
                      if (item.route) {
                        navigation.navigate(item.route);
                      }
                    }}
                  />
                </>
              )}
            />
          </Container>
        </VirtualScroll>
      </>
    </>
  );
}
