import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  circle: {
    alignSelf: "center",
    height: 10,
    width: 10,
    borderRadius: 10,
    marginRight: 15
  },
  container: {
    height: "100%",
    marginHorizontal: 15,
    backgroundColor: "#fff"
  },
  filterButton: {
    alignSelf: "center",
    justifyContent: "center",
    padding: 15,
    backgroundColor: "#aeaeae",
    borderRadius: 10
  },
  filterStatus: {
    flexDirection: "row",
    gap: 15,
    marginLeft: 5,
  },
  filterStatusContainer: {},

  imageContainer: {
    resizeMode: "contain",
    height: 50,
    width: 50
  },
  itemContainer: {
    padding: 10,
    flexDirection: "row"
  },
  label: {
    padding: 10,
    marginRight: 15,
    fontSize: 20,
    color: "#000",
    fontWeight: "600"
  },
  locationContainer: {},
  nameContainer: {},
  statusContainer: {
    flexDirection: "row"
  },
  statusText: {
    alignSelf: "center"
  }
});
