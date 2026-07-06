import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  TextInput,
  Dimensions,
  LogBox,
  Platform
} from "react-native";
import React, { useState } from "react";
import Button from "../Button/Button";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

const DatePickerInput = ({
  showLabel = true,
  buttonText,
  customLabel,
  onChange,
  isStartingScreenBirthDate,
  title,
  selectedDateForUpdate,
}) => {
  const [selectedDate, setSelectedDate] = useState(() => {
    if (selectedDateForUpdate) {
      const date = new Date(selectedDateForUpdate);
      return isNaN(date.getTime()) ? new Date() : date;
    }
    return new Date();
  });
  const [showPicker, setShowPicker] = useState(false);

  LogBox.ignoreLogs(['Deprecation warning:']);

  const handleDateChange = (event, date) => {
    if (date) {
      setSelectedDate(date);
      if (Platform.OS === "android") {
        const formattedDate = moment(date).format("YYYY/MM/DD HH:mm");
        onChange(formattedDate);
        setShowPicker(false);
      }
    }
  };

  const handleDismiss = () => {
    setShowPicker(false);
  };

  const handleConfirm = () => {
    if (selectedDate && typeof selectedDate === "object" && selectedDate instanceof Date) {
      const formattedDate = moment(selectedDate).format("YYYY/MM/DD HH:mm");
      onChange(formattedDate);
    }
    setShowPicker(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {isStartingScreenBirthDate && (
          <Text style={styles.labelText}>Birth Date</Text>
        )}
        <Pressable style={styles.input} onPress={() => setShowPicker(true)}>
          <Text style={styles.inputText}>
            {selectedDate
              ? moment(selectedDate).format("YYYY/MM/DD")
              : title}
          </Text>
          <Text style={styles.calendarIcon}>📅</Text>
        </Pressable>
      </View>
      {showPicker && (
        <>
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleDateChange}
            onDismiss={handleDismiss}
            maximumDate={new Date()}
            minimumDate={new Date(2010, 0, 1)}
          />
          {Platform.OS === "ios" && (
            <View style={styles.iosButtonContainer}>
              <Pressable
                style={[styles.button, styles.buttonCancel]}
                onPress={() => setShowPicker(false)}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={handleConfirm}
              >
                <Text style={styles.textStyle}>
                  {buttonText ? buttonText : "Pick Birth Date"}
                </Text>
              </Pressable>
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default DatePickerInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    flexDirection: "column",
  },
  input: {
    height: 50,
    borderColor: "#E7ECF3",
    borderWidth: 1,
    marginTop: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#F8FAFD",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  datepicker: {
    borderRadius: 10,
  },
  inputText: {
    color: "#7D7D7D",
    fontSize: 15,
  },
  labelText: {
    fontSize: 20,
    color: "#555555",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: "72%",
    // height: Dimensions.get("window").height * 0.40,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 0,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  iosButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  button: {
    borderRadius: 8,
    padding: 10,
    elevation: 2,
    marginBottom: 10,
    flex: 1,
    marginHorizontal: 5,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonCancel: {
    backgroundColor: "#999999",
  },
  buttonClose: {
    backgroundColor: "#707BFB",
    borderRadius: 8,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  calendarIcon: {
    fontSize: 24,
  },
});
