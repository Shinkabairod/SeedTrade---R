import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import colors from "@/constants/colors";
import { Mission } from "@/constants/missions";

type MissionCardProps = {
  mission: Mission;
  isActive: boolean;
  onPress: ()