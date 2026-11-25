import React from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {colors, shadow} from '../constants/theme';

const paragraphsFrom = specification => {
  const raw = Array.isArray(specification)
    ? specification.join('\n')
    : String(specification || '');
  return raw
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(Boolean);
};

const Details = ({navigation, route}) => {
  const paragraphs = paragraphsFrom(route.params?.specification);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.back}
          accessibilityLabel="Назад">
          <Text style={styles.backLabel}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.heading}>Правила</Text>
        <View style={styles.back} />
      </View>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}>
        <View style={styles.sheet}>
          {paragraphs.map((paragraph, index) => (
            <Text
              key={`${index}-${paragraph.slice(0, 12)}`}
              style={
                paragraph.endsWith('!') && paragraph.length < 24
                  ? styles.note
                  : styles.text
              }>
              {paragraph}
            </Text>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  back: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow,
  },
  backLabel: {
    color: colors.ink,
    fontSize: 28,
    lineHeight: 32,
    marginTop: -2,
  },
  heading: {
    flex: 1,
    textAlign: 'center',
    color: colors.ink,
    fontSize: 20,
    fontWeight: '700',
  },
  scroll: {
    padding: 20,
    paddingTop: 12,
  },
  sheet: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    ...shadow,
  },
  text: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    marginBottom: 14,
  },
  note: {
    color: colors.gold,
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 22,
    marginBottom: 8,
    marginTop: 4,
  },
});

export default Details;
