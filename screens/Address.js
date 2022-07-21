import {
    View,
    Text,
    Pressable,
    Image,
    FlatList,
    StyleSheet,
} from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTasks, setTaskID } from "../redux/action";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Address = ({ navigation }) => {
    const { tasks } = useSelector((state) => state.taskReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        getTasks();
    }, []);

    const getTasks = () => {
        AsyncStorage.getItem("Tasks")
            .then((tasks) => {
                const parseTasks = JSON.parse(tasks);
                if (parseTasks && typeof parseTasks === "object") {
                    dispatch(setTasks(parseTasks));
                }
            })
            .catch((err) => console.log(err));
    };
    return (
        <View
            style={{
                paddingTop: 60,
                marginHorizontal: 10,
                backgroundColor: "#F5F5F5",
                flex: 1,
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginHorizontal: 10,
                    marginBottom: 30,
                }}
            >
                <Pressable onPress={() => navigation.goBack()}>
                    <Image
                        source={require("../assets/icons/left-arrow.png")}
                        style={{ width: 20, height: 17.14 }}
                    />
                </Pressable>
                <Text
                    style={{
                        marginRight: 15,
                        color: "#333333",
                        fontSize: 20,
                        fontWeight: "800",
                    }}
                >
                    Address
                </Text>
                <Text></Text>
            </View>

            <FlatList
                data={tasks}
                renderItem={({ item }) => (
                    <Pressable
                        style={styles.wrapper}
                        onPress={() => {
                            dispatch(setTaskID(item.ID));
                            navigation.navigate("AddressInput");
                        }}
                    >
                        <Image
                            source={require("../assets/icons/map-address.png")}
                        />
                        <View style={{ marginHorizontal: 10 }}>
                            <Text numberOfLines={1}>{item.Title}</Text>
                            <Text numberOfLines={1}>{item.Desc}</Text>
                        </View>
                        <Image
                            source={require("../assets/icons/arrow-right.png")}
                            style={{ position: "absolute", right: 7 }}
                        />
                    </Pressable>
                )}
                keyExtractor={(item, index) => index.toString()}
            />

            <View style={{ position: "relative", flex: 1 }}>
                <Pressable
                    style={{
                        width: 55,
                        height: 55,
                        backgroundColor: "#F27C28",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 27.5,
                        position: "absolute",
                        right: 10,
                        bottom: 100,
                    }}
                    onPress={() => {
                        dispatch(setTaskID(tasks.length + 1));
                        navigation.navigate("AddressInput");
                    }}
                >
                    <Image
                        source={require("../assets/icons/plus-white.png")}
                        style={{
                            width: 20,
                            height: 20,
                        }}
                    />
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "row",
        marginHorizontal: 20,
        paddingLeft: 8,
        paddingVertical: 13,
        backgroundColor: "#FEFEFE",
        alignItems: "center",
        position: "relative",
        marginTop: 10,
        borderRadius: 6,
    },
});

export default Address;
