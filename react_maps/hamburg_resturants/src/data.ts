export type Restaurant = {
    id: number;
    name: string;
    position: { lat: number; lng: number };
};

function generateRandomRestaurantData(count: number): Restaurant[] {
    const restaurants: Restaurant[] = [];
    for (let i = 1; i <= count; i++) {
        const randomLat = 53.55 + Math.random() * 0.05;
        const randomLng = 9.99 + Math.random() * 0.1;
        restaurants.push({
            id: i,
            name: `Restaurant ${i}`,
            position: { lat: randomLat, lng: randomLng },
        });
    }
    return restaurants;
}

export default generateRandomRestaurantData;