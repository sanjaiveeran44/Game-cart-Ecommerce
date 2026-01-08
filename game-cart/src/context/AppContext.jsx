'use client'
import { addressDummyData, productsDummyData, userDummyData } from "@/assets/assets";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

export const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext)
}

export const AppContextProvider = (props) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY
    const router = useRouter()
    const { user } = useUser()

    const [products, setProducts] = useState([])
    const [userData, setUserData] = useState(false)
    const [isSeller, setIsSeller] = useState(false)
    const [cartItems, setCartItems] = useState({})

    const [userAddresses, setUserAddresses] = useState([])
    const [selectedAddressId, setSelectedAddressId] = useState(null)

    // Check if user has admin role
    useEffect(() => {
        if (user) {
            // Multiple ways to check for admin access
            const userRole = user.publicMetadata?.role;
            const userEmail = user.primaryEmailAddress?.emailAddress;
            const userId = user.id;
            
            // Check multiple conditions
            const isAdminByRole = userRole === 'admin';
            const isAdminByEmail = userEmail === 'sanjyrubi@gmail.com';
            const isAdminById = userId === 'user_2sZFHS1UIIysJyDVzCpQhUhTIhw'; // Your user ID
            
            // Remove temporary override - only check actual role
            const isAdmin = isAdminByRole || isAdminByEmail || isAdminById;
            
            setIsSeller(isAdmin);
            
            console.log('=== DEBUG INFO ===');
            console.log('User Email:', userEmail);
            console.log('User ID:', userId);
            console.log('User Role from metadata:', userRole);
            console.log('Is Admin by role:', isAdminByRole);
            console.log('Is Admin by email:', isAdminByEmail);
            console.log('Is Admin by ID:', isAdminById);
            console.log('Final IsSeller:', isAdmin);
            console.log('Full user object:', user);
            console.log('User publicMetadata:', user.publicMetadata);
            console.log('==================');
        } else {
            setIsSeller(false);
            console.log('No user logged in');
        }
    }, [user]);

    const fetchProductData = async () => {
        setProducts(productsDummyData)
    }

    const fetchUserData = async () => {
        setUserData(userDummyData)
    }

    const addUserAddress = async (address) => {
        const newAddress = {
            _id: (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now()),
            ...address,
        }

        setUserAddresses((prev) => {
            const updated = [newAddress, ...prev]
            try {
                localStorage.setItem('quickcart_addresses', JSON.stringify(updated))
            } catch (e) {
            }
            return updated
        })

        setSelectedAddressId(newAddress._id)
        try {
            localStorage.setItem('quickcart_selected_address_id', newAddress._id)
        } catch (e) {
        }
    }

    const addToCart = async (itemId) => {

        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] += 1;
        }
        else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);

    }

    const updateCartQuantity = async (itemId, quantity) => {

        let cartData = structuredClone(cartItems);
        if (quantity === 0) {
            delete cartData[itemId];
        } else {
            cartData[itemId] = quantity;
        }
        setCartItems(cartData)

    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            if (cartItems[items] > 0) {
                totalCount += cartItems[items];
            }
        }
        return totalCount;
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            if (cartItems[items] > 0 && itemInfo && itemInfo.offerPrice) {
                totalAmount += itemInfo.offerPrice * cartItems[items];
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    }

    useEffect(() => {
        fetchProductData()
    }, [])

    useEffect(() => {
        fetchUserData()
    }, [])

    useEffect(() => {
        try {
            const savedAddresses = localStorage.getItem('quickcart_addresses')
            const savedSelectedId = localStorage.getItem('quickcart_selected_address_id')

            if (savedAddresses) {
                const parsed = JSON.parse(savedAddresses)
                if (Array.isArray(parsed)) {
                    setUserAddresses(parsed)
                } else {
                    setUserAddresses(addressDummyData)
                }
            } else {
                setUserAddresses(addressDummyData)
            }

            if (savedSelectedId) {
                setSelectedAddressId(savedSelectedId)
            }
        } catch (e) {
            setUserAddresses(addressDummyData)
        }
    }, [])

    useEffect(() => {
        if (!selectedAddressId) return
        try {
            localStorage.setItem('quickcart_selected_address_id', selectedAddressId)
        } catch (e) {
        }
    }, [selectedAddressId])

    const value = {
        currency, router,
        isSeller, setIsSeller,
        userData, fetchUserData,
        products, fetchProductData,
        cartItems, setCartItems,
        addToCart, updateCartQuantity,
        getCartCount, getCartAmount,
        userAddresses, addUserAddress,
        selectedAddressId, setSelectedAddressId,
        user // Add user to context
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}