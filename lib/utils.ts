import { type ClassValue, clsx } from "clsx";
import { Linking } from "react-native";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const ATSImageHandler = (imageUrl: string) => {
  if (imageUrl.startsWith("http://")) {
    return imageUrl.replace("http://", "https://");
  }
  return imageUrl;
};

export const openExternalUrl = (url: string) => {
  if (url && url !== "" && url !== null) {
    Linking.canOpenURL(url).then((supported: any) => {
      if (supported) {
        Linking.openURL(url);
      }
    });
  }
};

export function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export function locationExtractor(item: any) {
  if (!item.long || !item.lat) return null;
  return {
    address: item.address,
    city: item.city,
    state: item.state,
    country: item.country,
    zipCode: item.zipCode,
    long: item.long,
    lat: item.lat,
  };
}
