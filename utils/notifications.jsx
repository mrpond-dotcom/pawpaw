import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import moment from "moment";

// Note: Remote notifications functionality was removed from Expo Go with SDK 53
// For notifications to work on Android, you need to use a development build or EAS Build
// Local notifications may still work in some cases

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

export const schedulePushNotification = async (title, body, time, hours) => {
  // Skip notifications on web and in Expo Go
  if (Platform.OS === "web") {
    return;
  }

  try {
    const trigger = new Date(time);
    trigger.setHours(hours.split(":")[0]);
    trigger.setMinutes(hours.split(":")[1]);
    trigger.setSeconds(hours.split(":")[2]);

    //15  minute before 
    const date = new Date(time);
    date.setHours(hours.split(":")[0]);
    date.setMinutes(hours.split(":")[1]);
    date.setSeconds(hours.split(":")[2]);
    date.setMinutes(date.getMinutes() - 15);

    // Attempt to schedule local notifications
    // Note: This may not work in Expo Go for Android
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: title,
          body: body,
          data: { data: "goes here" },
        },
        trigger: {
          type: "date",
          date: trigger,
        },
      });

      await Notifications.scheduleNotificationAsync({
        content: {
          title: title,
          body: "15 minute left to activity......",
          data: { data: "goes here" },
        },
        trigger: {
          type: "date",
          date: date,
        },
      });
    } catch (notificationError) {
      console.log("Local notification not available in Expo Go - this is expected on SDK 53+");
    }
  } catch (error) {
    console.log("Schedule notification error:", error);
  }
};
