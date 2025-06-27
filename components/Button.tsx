import React from "react";
import { StyleSheet, Text, TouchableOpacity, ViewStyle, TextStyle } from "react-native";
import colors from "@/constants/colors";

type ButtonSize = "small" | "medium" | "large";
type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";

type ButtonProps = {
  title: string;
  onPress: () => void;
  size?: ButtonSize;
  variant?: ButtonVariant;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

export default function Button({
  title,
  onPress,
  size = "medium",
  variant = "primary",
  disabled = false,
  style,
  textStyle,
}: ButtonProps) {
  const getButtonStyle = () => {
    const baseStyle = [styles.button, styles[size], styles[variant]];
    
    if (disabled) {
      baseStyle.push(styles.disabled);
    }
    
    if (style) {
      baseStyle.push(style);
    }
    
    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle = [styles.text, styles[`${variant}Text`], styles[`${size}Text`]];
    
    if (disabled) {
      baseStyle.push(styles.disabledText);
    }
    
    if (textStyle) {
      baseStyle.push(textStyle);
    }
    
    return baseStyle;
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={disabled ? 1 : 0.9}
    >
      <Text style={getTextStyle()}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // Base button styles
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    shadowColor: colors.shadowMedium,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
  },
  
  // Size styles
  small: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  medium: {
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  large: {
    paddingHorizontal: 32,
    paddingVertical: 18,
    borderRadius: 20,
  },
  
  // Variant styles
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.secondary,
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: colors.primary,
    shadowOpacity: 0,
    elevation: 0,
  },
  ghost: {
    backgroundColor: colors.wellness.lavender,
    shadowOpacity: 0,
    elevation: 0,
  },
  
  // Disabled state
  disabled: {
    backgroundColor: colors.inactive,
    shadowOpacity: 0,
    elevation: 0,
  },
  
  // Text styles
  text: {
    fontWeight: "600",
    textAlign: "center",
    letterSpacing: -0.3,
  },
  
  // Text size styles
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  
  // Text variant styles
  primaryText: {
    color: "white",
  },
  secondaryText: {
    color: "white",
  },
  outlineText: {
    color: colors.primary,
  },
  ghostText: {
    color: colors.primary,
  },
  
  // Disabled text
  disabledText: {
    color: colors.textMuted,
  },
});