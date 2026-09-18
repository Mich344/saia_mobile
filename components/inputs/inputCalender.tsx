import React, { useState } from "react";
import { View, TextInput, Pressable, Platform } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import css from "@/styles/StylesComponent";

export interface CalendarInputProps {
  placeholder: string;
  value?: string;
  error?: boolean;
  onChangeDate?: (date: string) => void;
  disable?: boolean;
}

const CalendarInput = ({
  placeholder,
  value,
  onChangeDate,
  disable,
  error,
}: CalendarInputProps) => {
  const [show, setShow] = useState(false);

  // Parsear fecha evitando el desfase de zona horaria al cargar 'value'
  const parseInitialDate = (dateString?: string) => {
    if (!dateString) return new Date();
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  const [selectedDate, setSelectedDate] = useState<Date>(
    parseInitialDate(value),
  );

  // ✅ EXTRAER AÑO, MES Y DÍA USANDO MÉTODOS LOCALES
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleChange = (event: DateTimePickerEvent, date?: Date) => {
    setShow(Platform.OS === "ios");

    if (event.type === "set" && date) {
      setSelectedDate(date);
      onChangeDate?.(formatDate(date));
    }
  };

  return (
    <View className="relative">
      <Pressable onPress={() => !disable && setShow(true)}>
        <TextInput
          editable={false}
          pointerEvents="none"
          placeholder={placeholder}
          placeholderTextColor="#ABABAB"
          value={value ? value : formatDate(selectedDate)}
          className={`text-black font-calibri rounded-[12px] p-16 border-[1px] ${
            error ? "border-red-600" : "border-[#ACA9A9]"
          }`}
        />
      </Pressable>

      <Ionicons
        name="calendar-outline"
        size={22}
        color="#ABABAB"
        style={css.inputIconMargin}
        className="absolute right-[3px] top-[15px]"
      />

      {show && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          maximumDate={new Date()}
          onChange={handleChange}
        />
      )}
    </View>
  );
};

export default CalendarInput;
