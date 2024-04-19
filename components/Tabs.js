import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useEffect, useState } from "react";
import HomeScreen from "./HomeScreen";
import BookmarkScreen from "./BookmarkScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  const [bookmark, setBookmark] = useState([]);

  useEffect(() => {
    const loadBookmark = async () => {
      try {
        const storedBookmark = await AsyncStorage.getItem("bookmark");
        if (storedBookmark) {
          setBookmark(JSON.parse(storedBookmark));
        }
      } catch (error) {
        console.error("Error loading bookmark from AsyncStorage:", error);
      }
    };

    loadBookmark();
  }, []);

  const addToBookmark = async (item) => {
    try {
      const newBookmark = [...bookmark, item];
      setBookmark(newBookmark);
      await AsyncStorage.setItem("bookmark", JSON.stringify(newBookmark));
    } catch (error) {
      console.error("Error adding item to bookmark:", error);
    }
  };

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home">
        {() => <HomeScreen bookmark={bookmark} addToBookmark={addToBookmark} />}
      </Tab.Screen>
      <Tab.Screen name="Bookmarks">
        {() => <BookmarkScreen bookmark={bookmark} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
