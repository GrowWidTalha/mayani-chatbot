import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "react-native-heroicons/outline";
import theme from "@/constants/theme";
import { cn } from "@/lib/utils";

const { height, width } = Dimensions.get("window");

interface SearchBoxProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  inputProps?: any;
  RightIcon?: any;
  autoFocus?: boolean;
}

const SearchBox = ({
  value = "",
  onChange = () => null,
  placeholder = "Search Services...",
  inputClassName,
  inputProps,
  className,
  RightIcon = null,
  autoFocus = false,
  ...props
}: SearchBoxProps) => {
  return (
    <View
      className={cn(
        "flex flex-row items-center space-x-4 w-full px-5 py-1 bg-neutral rounded-2xl",
        className
      )}
      {...props}
    >
      <MagnifyingGlassIcon
        color={theme.colors.accent.DEFAULT}
        size={20}
        strokeWidth={2}
      />

      <TextInput
        autoFocus={autoFocus}
        className={cn(
          "flex-1 text-md pt-[14px] text-sm font-pregular",
          inputClassName
        )}
        value={value}
        style={{
          height: 50,
        }}
        selectionColor={theme.colors.primary.DEFAULT}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.accent.DEFAULT}
        onChangeText={onChange}
        {...inputProps}
      />

      {value.length > 0 &&
        (RightIcon ? (
          <RightIcon />
        ) : (
          <TouchableOpacity
            style={{
              height: 40,
              width: 40,
            }}
            className="flex items-center justify-center -mr-[10px]"
            onPress={() => onChange("")}
          >
            <XMarkIcon
              color={theme.colors.accent.DEFAULT}
              size={20}
              opacity={0.6}
              strokeWidth={2}
            />
          </TouchableOpacity>
        ))}
    </View>
  );
};

interface SearchableItem {
  title: string;
  subTitle?: string;
  description?: string;
  category?: {
    name: string;
  };
}

const searchInvoices = (invoices: any[], query: string): any[] => {
  return invoices.filter((invoice) =>
    invoice.service.title.toLowerCase().includes(query.toLowerCase())
  );
};

const searchLocations = (locations: any[], query: string): any[] => {
  return locations.filter((location) =>
    location.name.toLowerCase().includes(query.toLowerCase())
  );
};

const searchBookings = (bookings: any[], query: string): any[] => {
  const searchTerm = query.toLowerCase();
  return bookings.filter((booking) => {
    const service = booking.service;
    return (
      service.title.toLowerCase().includes(searchTerm) ||
      service.subTitle?.toLowerCase().includes(searchTerm) ||
      service.description?.toLowerCase().includes(searchTerm) ||
      booking.address?.toLowerCase().includes(searchTerm) ||
      service?.category?.name?.toLowerCase().includes(searchTerm)
    );
  });
};

const searchServices = (
  services: SearchableItem[],
  query: string
): SearchableItem[] => {
  const searchTerm = query.toLowerCase();
  return services.filter(
    (service) =>
      service.title.toLowerCase().includes(searchTerm) ||
      service.subTitle?.toLowerCase().includes(searchTerm) ||
      service.description?.toLowerCase().includes(searchTerm) ||
      service?.category?.name?.toLowerCase().includes(searchTerm)
  );
};

const searchCategoryBasedServices = (
  services: SearchableItem[],
  query: string,
  categoryId: string | null
): SearchableItem[] => {
  if (!query && !categoryId) return services;

  const searchTerm = query.toLowerCase();
  return services.filter((service: any) => {
    if (categoryId && service.categoryId !== categoryId) return false;

    return (
      service.title.toLowerCase().includes(searchTerm) ||
      service.subTitle?.toLowerCase().includes(searchTerm) ||
      service.description?.toLowerCase().includes(searchTerm) ||
      service?.category?.name?.toLowerCase().includes(searchTerm)
    );
  });
};

const searchCategories = (departments: any[], query: string): any[] => {
  try {
    const searchTerm = query.toLowerCase();
    return departments.reduce((filtered: any[], department) => {
      const filteredCategories = department.categories.filter(
        (category: any) =>
          category.name.toLowerCase().includes(searchTerm) ||
          category.description?.toLowerCase().includes(searchTerm)
      );

      if (filteredCategories.length) {
        filtered.push({
          ...department,
          categories: filteredCategories,
        });
      }
      return filtered;
    }, []);
  } catch (error) {
    console.error("Error in searchCategories:", error);
    return [];
  }
};

export {
  searchInvoices,
  searchLocations,
  searchBookings,
  searchServices,
  searchCategories,
  searchCategoryBasedServices,
};

export default SearchBox;
