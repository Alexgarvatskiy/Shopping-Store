import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext"
import { CartItem } from "../Components/CartItem"
import { FormatCurrency } from "../utilities/FormatCurrency"
import storeItem from "../data/items.json"

type ShopingCartProps = {
    isOpen: boolean
}

export function ShopingCart({ isOpen }: ShopingCartProps) {
    const { closeCart, cartItems } = useShoppingCart();

    return <Offcanvas show={isOpen} onHide={closeCart} placement="end">
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <Stack gap={2}>
                {cartItems.map(item => (
                    <CartItem key={item.id} {...item} />))}
                <div className="ms-auto fw-bold fs-5">
                    Total {FormatCurrency(cartItems.reduce((total, cartItem) => {
                        const item = storeItem.find(i => i.id === cartItem.id)
                        return total + (item?.price || 0) * cartItem.quantity
                    }, 0)
                    )}
                </div>
            </Stack>
        </Offcanvas.Body>
    </Offcanvas>
}