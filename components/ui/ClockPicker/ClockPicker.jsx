import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  TextInput,
  Platform,
} from "react-native";
import React, { useState } from "react";
import Button from "../Button/Button";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

const ClockPicker = ({ placeHolder, buttonPlaceHolder, onChange }) => {
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleTimeChange = (event, date) => {
    if (date) {
      setSelectedTime(date);
      if (Platform.OS === "android") {
        const formattedTime = moment(date).format("HH:mm");
        onChange(formattedTime);
        setShowPicker(false);
      }
    }
  };

  const handleDismiss = () => {
    setShowPicker(false);
  };

  const handleConfirm = () => {
    const formattedTime = moment(selectedTime).format("HH:mm");
    onChange(formattedTime);
    setShowPicker(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Pressable style={styles.input} onPress={() => setShowPicker(true)}>
          <Text style={styles.inputText}>
            {selectedTime ? moment(selectedTime).format("HH:mm") : placeHolder}
          </Text>
          <Text style={styles.timeIcon}>⏰</Text>
        </Pressable>
      </View>
      {showPicker && (
        <>
          <DateTimePicker
            value={selectedTime}
            mode="time"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleTimeChange}
            onDismiss={handleDismiss}
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
                  {buttonPlaceHolder || "Confirm"}
                </Text>
              </Pressable>
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default ClockPicker;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 10,
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
    width: 270,
    height: 275,
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
  datePickerContainer: {
    width: 230,
    height: 230,
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
  timeIcon: {
    fontSize: 24,
  },
});
