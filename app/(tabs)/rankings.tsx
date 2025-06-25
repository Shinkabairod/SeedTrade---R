import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Animated,
  RefreshControl,
} from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Trophy, 
  TrendingUp, 
  TrendingDown,
  Medal,
  Crown,
  Star,
  Users,
  Target,
  Zap,
  RefreshCw,
  Calendar,
  Globe
} from 'lucide-react-native';
import colors from '@/constants/colors';

const leaderboardData = [
  { 
    id: 1, 
    name: 'Sarah M.', 
    username: '@sarah_green',
    points: 2847, 
    sessions: 89, 
    streak: 12,
    trend: 'up',
    trendValue: '+127',
    level