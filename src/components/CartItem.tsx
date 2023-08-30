import { useShoppingCart } from "../context/ShoppingCartContext";
import StoreItems from '../data/items.json';
import { Stack } from "react-bootstrap";

type CartItemProps = {
    id: number
    quantity:  number
}

export function CartItem({id,quantity} : CartItemProps){
    const {removeFromCart} = useShoppingCart()
    const item =StoreItems.find(i => i.id === id )
    if(item == null) return null

    return (
        <Stack direction="horizontal" gap={2}>
            <img src = {item.imgUrl} style = {{width: "125px" , height: "75px" , objectFit: "cover"}}/>
        </Stack>

    )
}