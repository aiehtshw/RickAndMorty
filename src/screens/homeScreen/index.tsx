import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { useAppDispatch, useAppSelector } from "../../redux/stores";
import { fetchCharacterSearch, updateList } from "../../redux/reducers/character/characterSlice";
import { LocationResult, Result } from "../../services/types";
import { Status } from "../../utils/enums";
import { Colors } from "../../utils/colors";
import { fetchLocationSearch } from "../../redux/reducers/location/locationSlice";
import { StyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import { ViewStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";

const HomeScreen = () => {
  const [characterInfo, setCharacterInfo] = useState<Result[]>([]);
  const dispatch = useAppDispatch();
  const CharacterSearch = useAppSelector(state => state.CharacterSearch);
  const [locationInfo, setLocationInfo] = useState<LocationResult[]>([]);
  const LocationSearch = useAppSelector(state => state.LocationSearch.results);
  const [filterVisible, setFilterVisible] = useState<boolean>(false);
  const [aliveChecked, setAliveChecked] = useState<boolean>(false);
  const [deadChecked, setDeadChecked] = useState<boolean>(false);
  const [unknownChecked, setUnknownChecked] = useState<boolean>(false);
  const [locationChecked, setLocationChecked] = useState<boolean>(false);
  const [filteredLocation, setFilteredLocation] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isTouchableDisable, setIsTouchableDisable] = useState<boolean>(false);
  useEffect(() => {
    dispatch(fetchCharacterSearch({
      count: 0, next: "", pages: currentPage, prev: ""
    }));
    dispatch(fetchLocationSearch({
      count: 0, next: "", pages: 0, prev: ""
    }));
  }, []);

  useEffect(() => {
    if (CharacterSearch.results) {
      setCharacterInfo(CharacterSearch.results);
    }
  }, [CharacterSearch.results]);

  useEffect(() => {
    if (LocationSearch) {
      setLocationInfo(LocationSearch);
    }
  }, [LocationSearch]);


  useEffect(()=>{
    if(aliveChecked){
      setCharacterInfo(CharacterSearch.results.filter((item) => item.status === Status.alive));
    } else if(deadChecked){
      setCharacterInfo(CharacterSearch.results.filter((item) => item.status === Status.dead));
    } else if (unknownChecked){
      setCharacterInfo(CharacterSearch.results.filter((item) => item.status === Status.unknown));
    } else {
      setCharacterInfo(CharacterSearch.results);
    }
  },[deadChecked,aliveChecked, unknownChecked])

  const flatListHeader = () => {
    return (
      <View>
        <TouchableOpacity style={styles.filterButton} onPress={onTouchPressed}>
          <Text>Filter</Text>
        </TouchableOpacity>
        {
          filterVisible
            ? renderFilterComponent()
            : null
        }
      </View>

    );
  };

  const onTouchPressed = () => {
    setFilterVisible(!filterVisible);
  };
  const onAlivePressed = () => {
    if (deadChecked || unknownChecked) {
      setDeadChecked(false);
      setUnknownChecked(false)
    }
    setAliveChecked(!aliveChecked);
  };

  const onDeadPressed = () => {
    if (aliveChecked || unknownChecked) {
      setAliveChecked(false);
      setUnknownChecked(false);
    }
    setDeadChecked(!deadChecked);
  };

  const onUnknownPressed = () => {
    if (aliveChecked || deadChecked) {
      setAliveChecked(false);
      setDeadChecked(false);
    }
    setUnknownChecked(!unknownChecked);
  }
  const allDisable = () => {
    setAliveChecked(false);
    setUnknownChecked(false);
    setDeadChecked(false);
  }
  const onItemSelected = (item: LocationResult) => {
    let filtered: string[] = filteredLocation;
    if (!filtered.includes(item.name)) {
      filtered.push(item.name);
      setCharacterInfo(CharacterSearch.results.filter((item) => filtered.includes(item.location.name)));
    } else {
      filtered = filtered.filter((itemFiltered) => itemFiltered !== item.name);
      if(filtered.length != 0){
        setCharacterInfo(CharacterSearch.results.filter((item) => filtered.includes(item.location.name)));
      } else {
        setCharacterInfo(CharacterSearch.results);
      }

    }
    setFilteredLocation(filtered);
  };

  const onLocationPressed = () => {
    if(!locationChecked){
      allDisable();
      setIsTouchableDisable(true);
      setLocationChecked(true);
    } else {
      setIsTouchableDisable(false);
      setLocationChecked(false);
      setCharacterInfo(CharacterSearch.results);
    }

  };

  const setStatusBackground = (item: Result): StyleProp<ViewStyle> => {
    switch (item.status){
      case Status.alive:
        return {backgroundColor: Colors.green};
      case Status.dead:
        return {backgroundColor: Colors.red};
      case Status.unknown:
        return {backgroundColor: Colors.orange};
    }
  }

  const renderCharacterField = (item: Result) => {
    return (
      <View style={styles.itemContainer}>
        <Image style={styles.imageContainer} source={{ uri: item.image }} />
        <View style={{ marginLeft: 15 }}>
          <Text style={styles.nameContainer}>{item.name}</Text>
          <View style={styles.statusContainer}>
            <View
              style={[styles.circle, setStatusBackground(item)]} />
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
          <Text>Location:{item.location.name}</Text>

        </View>

      </View>
    );
  };

  const renderFilterComponent = () => {
    return (
      <View style={styles.filterStatusContainer}>
        <Text style={styles.label}>Status:</Text>
        <View style={styles.filterStatus}>
          <TouchableOpacity onPress={onAlivePressed} disabled={isTouchableDisable}>
            <Text style={[{fontSize: 17, fontWeight: '600'},aliveChecked ? { fontWeight: "bold" } : { fontWeight: "normal" }]}>Alive</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onDeadPressed} disabled={isTouchableDisable}>
            <Text style={[{fontSize: 17, fontWeight: '600'},deadChecked ? { fontWeight: "bold" } : { fontWeight: "normal" }]}>Dead</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onUnknownPressed} disabled={isTouchableDisable}>
            <Text style={[{fontSize: 17, fontWeight: '600'},unknownChecked ? { fontWeight: "bold" } : { fontWeight: "normal" }]}>Unknown</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={onLocationPressed}>
          <Text style={[styles.label, {backgroundColor: "#A5DDE2",alignSelf:"flex-start", borderRadius: 5, marginTop:5}]}>Locations</Text>
        </TouchableOpacity>

        {locationChecked ? locationInfo.map((item) => {
          return (
            <TouchableOpacity key={item.id} style={{marginLeft:5}} onPress={() => onItemSelected(item)}>
              <Text
                style={[{textDecorationLine:'underline'},filteredLocation.includes(item.name) ? { fontWeight: "bold" } : { fontWeight: "normal" }]}>{item.name}</Text>
            </TouchableOpacity>
          );
        }) : null}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={flatListHeader}
        data={characterInfo}
        renderItem={({ item }) => (
          renderCharacterField(item)
        )}
      />
    </View>
  );
};

export default HomeScreen;
