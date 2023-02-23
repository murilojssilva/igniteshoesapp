import OneSignal from "react-native-onesignal";

export function tagUserInfoCreate() {
  OneSignal.sendTags({
    user_name: "Murilo",
    user_email: "murilojssilva@gmail.com",
  });
}
