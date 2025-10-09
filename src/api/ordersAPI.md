# Orders API Documentation

## Endpoints Required

### 1. Fetch Orders
```
GET /orders
```
**Response:**
```json
{
  "data": [
    {
      "id": "ORD-001",
      "customer": "John Doe",
      "total": 150.00,
      "status": "Pending",
      "createdAt": "2024-01-15T10:30:00Z",
      "shippingAddress": "123 Main St, City"
    }
  ]
}
```

### 2. Update Order Status
```
PUT /orders/:id
```
**Request Body:**
```json
{
  "status": "Shipped"
}
```
**Response:**
```json
{
  "success": true,
  "order": {
    "id": "ORD-001",
    "status": "Shipped"
  }
}
```

## Status Flow
The status toggle cycles through: Pending → Shipped → Completed → Cancelled → Pending

## Implementation Notes
- The Orders page (`/orders`) fetches all orders and allows status toggling
- The AdminOrders component in the admin dashboard also has the same functionality
- Both components handle loading states, errors, and real-time updates
- Status changes are immediately reflected in the UI







