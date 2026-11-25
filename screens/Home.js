import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import FilterModal from './FilterModal';
import Ad from './Ad';
import {colors, shadow} from '../constants/theme';

const Home = ({navigation, route}) => {
  const [isLoading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [quiz, setQuiz] = React.useState([]);
  const [specification, setSpecification] = React.useState('');
  const [ad, setAd] = React.useState(false);
  const [showFilterModal, setShowFilterModal] = React.useState(false);

  const getMovies = async () => {
    try {
      const response = require('./data.json');
      setData(response.movies);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getMovies();
  }, []);

  const openLesson = item => {
    setShowFilterModal(true);
    setQuiz(item);
    setSpecification(item.specification);
  };

  return (
    <SafeAreaView style={styles.screen}>
      {ad && (
        <Ad
          isVisible={ad}
          onClose={() => setAd(false)}
          navigation={navigation}
          route={route}
          data={quiz}
          specification={specification}
        />
      )}
      {showFilterModal && (
        <FilterModal
          isVisible={showFilterModal}
          onClose={() => setShowFilterModal(false)}
          navigation={navigation}
          route={route}
          data={quiz}
          specification={specification}
        />
      )}
      <View style={styles.header}>
        <Text style={styles.kicker}>EASY</Text>
        <Text style={styles.title}>Қазақша</Text>
        <Text style={styles.subtitle}>
          Уроки произношения и грамматики
        </Text>
      </View>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color={colors.accent}
          style={styles.loader}
        />
      ) : (
        <FlatList
          data={data}
          keyExtractor={item => `${item.id}`}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.85}
              onPress={() => openLesson(item)}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{index + 1}</Text>
              </View>
              <View style={styles.cardBody}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardHint}>
                  Тренажёр, слова и правила
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 8,
  },
  kicker: {
    color: colors.gold,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 2,
  },
  title: {
    color: colors.ink,
    fontSize: 36,
    fontWeight: '700',
    marginTop: 4,
  },
  subtitle: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 6,
  },
  loader: {
    marginTop: 48,
  },
  list: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 28,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    ...shadow,
  },
  badge: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#E6F6FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  badgeText: {
    color: colors.accent,
    fontSize: 16,
    fontWeight: '700',
  },
  cardBody: {
    flex: 1,
  },
  cardTitle: {
    color: colors.ink,
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 22,
  },
  cardHint: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
  },
});

export default Home;
