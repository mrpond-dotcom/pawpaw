import { StyleSheet, Text, View, Button, ScrollView, Modal, TouchableOpacity, Image, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import StatsContainer from "../../components/MainStats/StatsContainer/StatsContainer";
import UpcomingEvents from "../../components/UpcomingEvents/UpcomingEvents";
import ActivityRing from "../../components/ui/charts/ActivityRings/ActivityRing";
import CustomBarChart from "../../components/ui/charts/BarChart/CustomBarChart";
import CustomLineChart from "../../components/ui/charts/LineChart/CustomLineChart";
import CustomStackedBarChart from "../../components/ui/charts/StackedBarChart/CustomStackedBarChart";
import { useIsFocused } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedDate, setPetData } from "../../redux/slice/myPetSlice";
import moment from "moment";
import catImage from "../../assets/emptyPetImages/cat.png";
import dogImage from "../../assets/emptyPetImages/dog.png";

const MyPet = ({ navigation }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const myPets = useSelector((state) => state.myPet.myPets);
  const currentPetId = useSelector((state) => state.myPet.currentPetId);
  const [showPetSwitcher, setShowPetSwitcher] = useState(false);

  // useEffect(() => {
  //   if (isFocused) {
  //     const currentDate = moment().format("YYYY-MM-DDTHH:mm:ss");
  //     dispatch(setSelectedDate(currentDate));
  //   }
  // }, [isFocused]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // Reset modal when navigating back to this screen
      setShowPetSwitcher(false);
      // Pass the setter to parent navigation options
      navigation.setParams({ setShowPetSwitcher });
    });
    return unsubscribe;
  }, [navigation]);

  const handlePetSelect = (pet) => {
    dispatch(setPetData(pet));
    setShowPetSwitcher(false);
  };

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.myPetContainer}
      >
        <Text style={styles.headerText}>TODAY</Text>
        <StatsContainer />
        <UpcomingEvents navigation={navigation} />
        <ActivityRing />
        <CustomBarChart title="Weight History" />
        <CustomLineChart />
        <CustomStackedBarChart />
      </ScrollView>

      <Modal
        visible={showPetSwitcher}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowPetSwitcher(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Your Pet</Text>
            <FlatList
              data={myPets}
              renderItem={({ item }) => (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => handlePetSelect(item)}
                  style={[
                    styles.petOption,
                    currentPetId === item.id && styles.petOptionActive,
                  ]}
                >
                  <View style={styles.petOptionImageContainer}>
                    {item.photoURL ? (
                      <Image
                        source={{ uri: item.photoURL }}
                        style={styles.petOptionImage}
                      />
                    ) : (
                      <Image
                        source={item.spicie === "dog" ? dogImage : catImage}
                        style={styles.petOptionImage}
                      />
                    )}
                  </View>
                  <View style={styles.petOptionInfo}>
                    <Text style={styles.petOptionName}>{item.name}</Text>
                    <Text style={styles.petOptionBreed}>{item.breed}</Text>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setShowPetSwitcher(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default MyPet;

const styles = StyleSheet.create({
  myPetContainer: {
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
  headerText: {
    fontSize: 15,
    color: "#434343",
    fontWeight: "bold",
    width: "100%",
    marginTop: "1%",
    marginBottom: "3%",
    paddingHorizontal: "5%",
  },
  petSwitcherButton: {
    position: "absolute",
    top: 12,
    right: 15,
    zIndex: 10,
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#E7ECF3",
    backgroundColor: "#F8FAFD",
  },
  petSwitcherImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
    width: "85%",
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#434343",
    marginBottom: 15,
    textAlign: "center",
  },
  petOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginVertical: 6,
    borderRadius: 10,
    backgroundColor: "#F8FAFD",
    borderWidth: 2,
    borderColor: "#E7ECF3",
  },
  petOptionActive: {
    backgroundColor: "#FEE8DC",
    borderColor: "#EE7942",
  },
  petOptionImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
  },
  petOptionImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain",
  },
  petOptionInfo: {
    flex: 1,
  },
  petOptionName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#434343",
    marginBottom: 2,
  },
  petOptionBreed: {
    fontSize: 13,
    color: "#7D7D7D",
  },
  closeButton: {
    marginTop: 15,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#707BFB",
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});
