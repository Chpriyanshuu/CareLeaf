export interface Plant {
  id: number;
  name: string;
  emoji: string;
  price: number;
  short_desc: string;
  difficulty: string;
  light: string;
  water: string;
  care_tips: string;
}

export interface OrderCreate {
  plant_id: number;
  quantity: number;
  customer_name: string;
  phone: string;
  address: string;
}

export interface Order extends OrderCreate {
  id: number;
  status: string;
  created_at: string;
  plant: Plant;
}

export interface CartLine {
  plant: Plant;
  quantity: number;
}
