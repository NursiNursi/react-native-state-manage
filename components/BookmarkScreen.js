import { FlatList, Text, View } from "react-native";

export default function BookmarkScreen({ bookmark }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Bookmarked items:</Text>
      <FlatList
        data={bookmark}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text>{item.title}</Text>}
      />
    </View>
  );
}
