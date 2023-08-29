import { Card } from "react-bootstrap";

type StoreItemProps = {
    id: number,
    name: string,
    price: number,
    imgUrl: string
};
export function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
    // Component logic goes here
    return <Card>
        <Card.Img variant="top" src={imgUrl} height = "200px" style={{objectFit:'cover'}}></Card.Img>
    </Card>

}
