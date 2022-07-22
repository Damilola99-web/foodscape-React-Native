import {
    View,
    Text,
    Pressable,
    ScrollView,
    TextInput,
    FlatList,
    Alert,
} from "react-native";
import React, { useEffect } from "react";
import { Image } from "react-native";
import { StyleSheet } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addItem, delItem } from "../redux/action/index";
import { useDispatch, useSelector } from "react-redux";

const Carts = ({ navigation }) => {
    const [query, setQuery] = useState("");
    const { cart } = useSelector((state) => state.handleCart);
    const dispatch = useDispatch();

    const deleteAddress = (id) => {
        const filteredAddress = cart.filter((car) => car.ID !== id);
        AsyncStorage.setItem("Cart", JSON.stringify(filteredAddress))
            .then(() => {
                dispatch(addItem(filteredAddress));
                Alert.alert("Success!", "Address removed successfully.");
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getTasks();
    }, []);

    const getTasks = () => {
        AsyncStorage.getItem("Cart")
            .then((cart) => {
                const parseTasks = JSON.parse(cart);
                if (parseTasks && typeof parseTasks === "object") {
                    dispatch(addItem(parseTasks));
                }
            })
            .catch((err) => console.log(err));
    };

    let totalPrice = 0;
    totalPrice = totalPrice + cart.Price;

    // var total = 0;
    // const itemList = (item) => {
    //     total = total + item.Price;
    //     let sliced = item.title.slice(0, 50);
    //     return (
    //         <div className={classes.flex}>
    //             <div>
    //                 <h3>{sliced}</h3>
    //                 <p>Brief Description</p>
    //             </div>
    //             <p>${item.price}</p>
    //         </div>
    //     );
    // };

    const CartItems = () => {
        return (
            <View style={{ paddingTop: 60, backgroundColor: "#F5F5F5" }}>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginHorizontal: 20,
                        marginBottom: 20,
                    }}
                >
                    <Pressable onPress={() => navigation.goBack()}>
                        <Image
                            source={require("../assets/icons/left-arrow.png")}
                        />
                    </Pressable>
                    <Text
                        style={{
                            marginRight: 20,
                            fontSize: 25,
                            fontWeight: "700",
                            color: "#333333",
                        }}
                    >
                        Cart
                    </Text>
                    <Text></Text>
                </View>

                <FlatList
                    style={{ height: 320 }}
                    data={cart}
                    renderItem={({ item }) => (
                        <View
                            style={{
                                backgroundColor: "#FCDEC9",
                                marginHorizontal: 20,
                                paddingHorizontal: 20,
                                paddingVertical: 24,
                                marginTop: 5,
                                flexDirection: "row",
                                justifyContent: "space-between",
                                borderRadius: 10,
                                alignItems: "center",
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <Text
                                    style={{
                                        marginRight: 8,
                                        color: "#A74601",
                                        fontSize: 20,
                                        fontWeight: "900",
                                    }}
                                >
                                    x1
                                </Text>
                                <View>
                                    <Text
                                        style={{
                                            color: "#A74601",
                                            fontSize: 18,
                                            fontWeight: "900",
                                            width: 150,
                                        }}
                                    >
                                        {item.Title}
                                    </Text>
                                    <Text
                                        style={{
                                            color: "#F59D5E",
                                            fontSize: 14,
                                        }}
                                    >
                                        {item.Desc}
                                    </Text>
                                </View>
                            </View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "flex-start",
                                }}
                            >
                                <Text
                                    style={{
                                        color: "#A74601",
                                        fontSize: 20,
                                        fontWeight: "900",
                                    }}
                                >
                                    #{parseInt(item.Price)}
                                </Text>
                                <Pressable
                                    style={{
                                        marginLeft: 15,
                                        backgroundColor: "#F3F3F3",
                                        padding: 5,
                                        borderRadius: 8,
                                    }}
                                    onPress={() => deleteAddress(item.ID)}
                                >
                                    <Image
                                        source={require("../assets/icons/close-cart.png")}
                                        style={{ width: 15, height: 15 }}
                                    />
                                </Pressable>
                            </View>
                        </View>
                    )}
                />

                <View style={styles.inputField}>
                    <TextInput
                        placeholder="Enter promo code"
                        placeholderTextColor="gray"
                        autoCapitalize="none"
                        keyboardType="default"
                        textContentType="name"
                        // autoFocus={true}
                        onChangeText={(query) => setQuery(query)}
                        // onSubmitEditing={fetchingDatas}
                        value={query}
                    />

                    <Pressable
                        onPress={() => setQuery("")}
                        style={{
                            backgroundColor: "#F59D5E",
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            borderRadius: 8,
                        }}
                    >
                        <Text>Apply</Text>
                    </Pressable>
                </View>

                <View style={{ marginHorizontal: 20 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 5,
                        }}
                    >
                        <Text style={{ color: "#828282" }}>Subtotal</Text>
                        <Text
                            style={{
                                color: "#333333",
                                fontWeight: "500",
                                fontSize: 18,
                            }}
                        >
                            # {Number(totalPrice)}
                        </Text>
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 5,
                        }}
                    >
                        <Text style={{ color: "#828282" }}>Promo Discount</Text>
                        <Text
                            style={{
                                color: "#333333",
                                fontWeight: "500",
                                fontSize: 18,
                            }}
                        >
                            # 250
                        </Text>
                    </View>

                    <Text
                        style={{
                            borderWidth: 1,
                            borderLeftWidth: 0,
                            borderRightWidth: 0,
                            borderBottomWidth: 0,
                            borderColor: "#E0E0E0",
                        }}
                    ></Text>

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Text style={{ color: "#828282", fontSize: 18 }}>
                            Total
                        </Text>
                        <Text
                            style={{
                                color: "#333333",
                                fontWeight: "700",
                                fontSize: 18,
                            }}
                        >
                            # 1500
                        </Text>
                    </View>
                </View>

                <Pressable
                    style={styles.cartBtn}
                    onPress={() => navigation.navigate("CheckoutScreen")}
                >
                    <Text style={styles.cartBtnText}>Proceed to Checkout</Text>
                </Pressable>

                <Pressable
                    style={styles.btn}
                    onPress={() => navigation.navigate("SnackScreen")}
                >
                    <Text style={styles.btnText}>Continue Shopping</Text>
                </Pressable>
            </View>
        );
    };

    const EmptyCart = () => {
        return (
            <View>
                <Text>Your Cart is Empty</Text>
            </View>
        );
    };

    return (
        <>
            {/* {state.length === 0 && emptyCart()} */}
            {/* {state.length !== 0 && state.map(cartItems)} */}
            {cart.length === 0 ? <EmptyCart /> : <CartItems cartItem={cart} />}
        </>
    );
};

const styles = StyleSheet.create({
    inputField: {
        borderWidth: 0,
        borderRadius: 8,
        backgroundColor: "#FAFAFA",
        marginBottom: 10,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 30,
        marginHorizontal: 20,
        paddingLeft: 24,
        paddingRight: 6,
        paddingVertical: 5,
    },
    cartBtn: {
        backgroundColor: "#F27C28",
        marginHorizontal: 20,
        paddingHorizontal: 70,
        paddingVertical: 16,
        borderRadius: 32,
        marginTop: 30,
    },
    cartBtnText: {
        textAlign: "center",
        color: "#FAFAFA",
        fontSize: 20,
    },
    btn: {
        marginHorizontal: 20,
        paddingHorizontal: 70,
        paddingVertical: 16,
        borderRadius: 32,
        marginTop: 10,
        borderColor: "#F27C28",
        borderWidth: 1,
    },
    btnText: {
        textAlign: "center",
        color: "#F27C28",
        fontSize: 20,
    },
});

export default Carts;
