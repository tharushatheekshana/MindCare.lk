import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Mood = {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  tint: string;
  background: string;
};

type CopingCard = {
  id: string;
  title: string;
  subtitle: string;
  icon: keyof typeof Feather.glyphMap;
  background: string;
  accent: string;
};

type Article = {
  id: string;
  category: string;
  title: string;
  author: string;
  duration: string;
  image: string;
};

const moods: Mood[] = [
  { id: 'happy', label: 'Happy', icon: 'happy-outline', tint: '#F14E9A', background: '#F9D7E8' },
  { id: 'calm', label: 'Calm', icon: 'moon-outline', tint: '#7D7EF2', background: '#DDDDFE' },
  { id: 'manic', label: 'Manic', icon: 'aperture-outline', tint: '#53C7D4', background: '#D4F3F6' },
  { id: 'angry', label: 'Angry', icon: 'flame-outline', tint: '#F3A145', background: '#FFE7C9' },
  { id: 'sad', label: 'Sad', icon: 'rainy-outline', tint: '#9AD56D', background: '#E6F6D8' },
];

const copingCards: CopingCard[] = [
  {
    id: 'anxiety',
    title: 'Anxiety',
    subtitle: 'Box breathing\nTechnique',
    icon: 'activity',
    background: '#D8ECFF',
    accent: '#2F88E8',
  },
  {
    id: 'stress',
    title: 'Stress',
    subtitle: 'Grounding\nExercise',
    icon: 'eye',
    background: '#DBF0FF',
    accent: '#2F88E8',
  },
];

const articles: Article[] = [
  {
    id: 'gratitude',
    category: 'Neuroscience',
    title: 'The science of gratitude: How to Rewire your Brain',
    author: 'Dr. Nishantha',
    duration: '6 min read',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'stillness',
    category: 'Mindfulness',
    title: 'Finding Stillness in a Chaotic Digital World',
    author: 'Dr. Udaya Kumara',
    duration: '5 min read',
    image: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'sleep',
    category: 'Wellness',
    title: 'Understanding Sleep Hygiene for Better Mental Health',
    author: 'Dr. Saman Bandara',
    duration: '7 min read',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
  },
];

export default function HomeScreen() {
  const handleTap = () => {
    void Haptics.selectionAsync();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.hero}>
            <View style={styles.heroBlueOrb} />
            <Text style={styles.greeting}>Good Morning !</Text>
            <Text style={styles.prompt}>How are you feeling today?</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.moodRow}>
            {moods.map((mood) => (
              <TouchableOpacity key={mood.id} style={styles.moodItem} activeOpacity={0.85} onPress={handleTap}>
                <View style={[styles.moodIconWrap, { backgroundColor: mood.background }]}>
                  <View style={[styles.moodIconTile, { backgroundColor: mood.tint }]}>
                    <Ionicons name={mood.icon} size={26} color="#FFFFFF" />
                  </View>
                </View>
                <Text style={styles.moodLabel}>{mood.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.sectionIntro}>
            <Text style={styles.sectionTitle}>Daily Copings</Text>
            <Text style={styles.sectionSubtitle}>Quick exercise for instant relief</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.copingRow}>
            {copingCards.map((card) => (
              <TouchableOpacity key={card.id} style={[styles.copingCard, { backgroundColor: card.background }]} activeOpacity={0.9}>
                <Feather name={card.icon} size={24} color="#15171B" />
                <Text style={styles.copingTitle}>{card.title}</Text>
                <Text style={styles.copingSubtitle}>{card.subtitle}</Text>
                <View style={styles.startRow}>
                  <Text style={[styles.startText, { color: card.accent }]}>Start</Text>
                  <Feather name="play" size={14} color={card.accent} />
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.searchBar}>
            <Feather name="search" size={20} color="#A0A3AE" />
            <TextInput
              placeholder="Search wellness topics...."
              placeholderTextColor="#A0A3AE"
              style={styles.searchInput}
            />
          </View>

          <Text style={styles.readsHeading}>Mindful Reads</Text>

          {articles.map((article) => (
            <TouchableOpacity key={article.id} style={styles.articleCard} activeOpacity={0.92} onPress={handleTap}>
              <View style={styles.imageWrap}>
                <Image source={{ uri: article.image }} style={styles.articleImage} />
                <View style={styles.categoryPill}>
                  <Text style={styles.categoryText}>{article.category}</Text>
                </View>
              </View>

              <Text style={styles.articleTitle}>{article.title}</Text>

              <View style={styles.articleMetaRow}>
                <View style={styles.authorRow}>
                  <View style={styles.authorBadge}>
                    <Text style={styles.authorInitial}>D</Text>
                  </View>
                  <Text style={styles.authorText}>{article.author}</Text>
                </View>

                <View style={styles.durationRow}>
                  <Feather name="clock" size={16} color="#7A7F8A" />
                  <Text style={styles.durationText}>{article.duration}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.exploreButton} activeOpacity={0.88} onPress={handleTap}>
            <Text style={styles.exploreText}>Explore more articles</Text>
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.navItem} activeOpacity={0.85}>
            <Feather name="home" size={18} color="#2F88E8" />
            <Text style={styles.navActive}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} activeOpacity={0.85} onPress={() => router.replace('/ai-chat')}>
            <MaterialCommunityIcons name="robot-outline" size={18} color="#99A2AD" />
            <Text style={styles.navText}>AI Chat</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.85}
            onPress={() => router.replace('/counselors')}>
            <Feather name="users" size={18} color="#99A2AD" />
            <Text style={styles.navText}>Counselors</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} activeOpacity={0.85}>
            <Feather name="user" size={18} color="#99A2AD" />
            <Text style={styles.navText}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    paddingBottom: 110,
  },
  hero: {
    paddingHorizontal: 22,
    paddingTop: 28,
    paddingBottom: 28,
    overflow: 'hidden',
  },
  heroBlueOrb: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: '#1E96F2',
    top: -78,
    right: -78,
  },
  greeting: {
    fontFamily: 'Inter',
    fontSize: 40,
    lineHeight: 46,
    color: '#12151A',
    fontWeight: '500',
    marginBottom: 18,
    marginTop: 84,
  },
  prompt: {
    fontFamily: 'Inter',
    fontSize: 28,
    lineHeight: 34,
    color: '#6D6F7B',
    fontStyle: 'italic',
    fontWeight: '300',
  },
  moodRow: {
    paddingHorizontal: 18,
    gap: 16,
    paddingBottom: 18,
  },
  moodItem: {
    alignItems: 'center',
    width: 72,
  },
  moodIconWrap: {
    width: 64,
    height: 64,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  moodIconTile: {
    width: 64,
    height: 64,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moodLabel: {
    fontFamily: 'Inter',
    fontSize: 16,
    lineHeight: 20,
    color: '#7A7A7A',
    fontWeight: '500',
  },
  sectionIntro: {
    alignItems: 'center',
    paddingHorizontal: 22,
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter',
    fontSize: 22,
    lineHeight: 28,
    color: '#141414',
    fontWeight: '800',
  },
  sectionSubtitle: {
    fontFamily: 'Inter',
    fontSize: 15,
    lineHeight: 21,
    color: '#444444',
    fontWeight: '500',
  },
  copingRow: {
    paddingHorizontal: 22,
    gap: 14,
    paddingBottom: 22,
  },
  copingCard: {
    width: 244,
    minHeight: 188,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#2F88E8',
    paddingHorizontal: 18,
    paddingTop: 34,
    paddingBottom: 18,
  },
  copingTitle: {
    marginTop: 22,
    fontFamily: 'Inter',
    fontSize: 17,
    lineHeight: 22,
    color: '#111111',
    fontWeight: '800',
  },
  copingSubtitle: {
    marginTop: 4,
    fontFamily: 'Inter',
    fontSize: 15,
    lineHeight: 22,
    color: '#242424',
    fontWeight: '500',
  },
  startRow: {
    marginTop: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  startText: {
    fontFamily: 'Inter',
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '500',
  },
  searchBar: {
    marginHorizontal: 22,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#F7F5F6',
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 22,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter',
    fontSize: 16,
    lineHeight: 20,
    color: '#4C4F57',
  },
  readsHeading: {
    fontFamily: 'Inter',
    fontSize: 24,
    lineHeight: 30,
    color: '#111111',
    fontWeight: '500',
    paddingHorizontal: 22,
    marginBottom: 14,
  },
  articleCard: {
    marginHorizontal: 22,
    marginBottom: 20,
  },
  imageWrap: {
    borderRadius: 22,
    overflow: 'hidden',
    position: 'relative',
  },
  articleImage: {
    width: '100%',
    height: 192,
  },
  categoryPill: {
    position: 'absolute',
    top: 16,
    left: 16,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.88)',
    paddingHorizontal: 18,
    paddingVertical: 6,
  },
  categoryText: {
    fontFamily: 'Inter',
    fontSize: 14,
    lineHeight: 18,
    color: '#1880FF',
    fontWeight: '700',
  },
  articleTitle: {
    fontFamily: 'Inter',
    fontSize: 18,
    lineHeight: 24,
    color: '#111111',
    fontWeight: '800',
    textAlign: 'center',
    paddingHorizontal: 18,
    marginTop: 16,
  },
  articleMetaRow: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  authorBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E2E2E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  authorInitial: {
    fontFamily: 'Inter',
    fontSize: 18,
    lineHeight: 20,
    color: '#5F5F5F',
    fontWeight: '700',
  },
  authorText: {
    fontFamily: 'Inter',
    fontSize: 14,
    lineHeight: 18,
    color: '#757575',
    fontWeight: '500',
  },
  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  durationText: {
    fontFamily: 'Inter',
    fontSize: 14,
    lineHeight: 18,
    color: '#757575',
    fontWeight: '500',
  },
  exploreButton: {
    marginHorizontal: 22,
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
    height: 54,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exploreText: {
    fontFamily: 'Inter',
    fontSize: 17,
    lineHeight: 20,
    color: '#666666',
    fontWeight: '500',
  },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 68,
    borderTopWidth: 1,
    borderTopColor: '#E2E6EB',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  navItem: {
    alignItems: 'center',
    gap: 4,
  },
  navActive: {
    fontFamily: 'Inter',
    fontSize: 11,
    lineHeight: 14,
    color: '#2F88E8',
    fontWeight: '700',
  },
  navText: {
    fontFamily: 'Inter',
    fontSize: 11,
    lineHeight: 14,
    color: '#99A2AD',
    fontWeight: '600',
  },
});
