import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import DetailListItem from "./DetailListItem";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { getActivitiesForADate } from "../../../database/tables/activities";
import { useNavigation } from "@react-navigation/native";

const DetailListContainer = () => {
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const selectedDate = useSelector(
    (state) => state.myPet.calender.selectedDate
  );
  const loading = useSelector((state) => state.myPet.loading);
  const currentPetId = useSelector((state) => state.myPet.currentPetId);

  useEffect(() => {
    if (isFocused) {
      // const date = new Date(selectedDate);
      // date.setHours(date.getHours() + 3);
      // const isoString = date.toISOString();
      getActivitiesForADate(currentPetId, selectedDate).then((activities) => {
        const sortedData = activities.sort((a, b) => {
          return a.startTime?.localeCompare(b?.startTime);
        });
        const formattedArray = sortedData.map((activity) => {
          return {
            id: activity.id,
            activity: activity.activityType,
            time:
              activity.endTime !== ""
                ? activity.startTime + " - " + activity.endTime
                : activity.startTime,
            note: activity.note,
            cal: activity.calorie,
            meter: activity.meter,
          };
        });
        setData(formattedArray);
      });
    }
  }, [selectedDate, loading]);

  return (
    <View style={styles.itemListContainer}>
      {data.length > 0 ? (
        <FlatList
          style={styles.flatList}
          data={data}
          renderItem={(item) => {
            return <DetailListItem item={item.item} />;
          }}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <View style={styles.empty}>
          <TouchableOpacity
            style={styles.addActivityButton}
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate("Activities", {
                screen: "NewActivity",
              });
            }}
          >
            <Text style={styles.addButtonText}>➕</Text>
          </TouchableOpacity>
          <Text style={styles.emptyText}>No activities for this day</Text>
          <Text style={styles.tapText}>Tap + to add new activity</Text>
        </View>
      )}
    </View>
  );
};

export default DetailListContainer;

const styles = StyleSheet.create({
  itemListContainer: {
    width: "90%",
    // height: "100%",
    alignSelf: "center",
    marginTop: 10,
    flex: 1,
  },
  empty: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    flexDirection: "column",
  },
  emptyText: {
    fontSize: 15,
    color: "#A2AEBE",
    marginTop: 10,
    fontWeight: "600",
  },
  addActivityButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#707BFB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
  addButtonText: {
    fontSize: 40,
  },
  tapText: {
    fontSize: 12,
    color: "#A2AEBE",
    marginTop: 10,
    fontStyle: "italic",
  },
});
