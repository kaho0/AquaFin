# AquaFin Backend - NeonDB Migration

This backend has been migrated from MySQL to NeonDB (PostgreSQL).

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
# NeonDB PostgreSQL Connection String
DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require

# Server Configuration
PORT=4000

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

### 3. Get Your NeonDB Connection String

1. Sign up at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string from your project dashboard
4. Replace the DATABASE_URL in your .env file

### 4. Database Schema

You'll need to create the following tables in your NeonDB database:

#### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  uid VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) NOT NULL,
  firstName VARCHAR(255) NOT NULL,
  photo TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Fishes Table
```sql
CREATE TABLE fishes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  species VARCHAR(255),
  color VARCHAR(100),
  size VARCHAR(100),
  weight DECIMAL(10,2),
  lifespan VARCHAR(100),
  water_type VARCHAR(100),
  temperature_range VARCHAR(100),
  pH_level VARCHAR(100),
  habitat TEXT,
  diet TEXT,
  tank_size_min VARCHAR(100),
  compatibility TEXT,
  image_url TEXT,
  description TEXT,
  price DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Plants Table
```sql
CREATE TABLE plants (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  scientific_name VARCHAR(255),
  growth_rate VARCHAR(100),
  light_requirement VARCHAR(100),
  CO2_requirement VARCHAR(100),
  temperature_min DECIMAL(5,2),
  temperature_max DECIMAL(5,2),
  ph_min DECIMAL(4,2),
  ph_max DECIMAL(4,2),
  difficulty VARCHAR(50),
  max_height_cm INTEGER,
  description TEXT,
  image_url TEXT,
  price DECIMAL(10,2),
  price_unit VARCHAR(20) DEFAULT 'USD',
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Cart Table
```sql
CREATE TABLE cart (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  product_id INTEGER NOT NULL,
  category VARCHAR(50) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, product_id, category)
);
```

#### Orders Table
```sql
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  ordered_products JSONB NOT NULL,
  address TEXT NOT NULL,
  order_date TIMESTAMP DEFAULT NOW(),
  total_amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Review Table
```sql
CREATE TABLE review (
  id SERIAL PRIMARY KEY,
  userId VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  review_text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 5. Run the Server

```bash
npm run server
```

## Key Changes Made

1. **Database Driver**: Changed from `mysql2` to `pg` (PostgreSQL)
2. **Connection**: Updated to use NeonDB connection string with SSL
3. **Query Syntax**: Changed from `?` placeholders to `$1, $2, $3...` numbered parameters
4. **Result Handling**: Updated to use `{ rows }` destructuring instead of `[rows]`
5. **Return Values**: Added `RETURNING *` to INSERT/UPDATE queries to get the created/updated records

## API Endpoints

- `GET /api/v1/fish` - Get all fishes
- `GET /api/v1/fish/:id` - Get fish by ID
- `POST /api/v1/fish` - Create new fish
- `PUT /api/v1/fish/:id` - Update fish
- `DELETE /api/v1/fish/:id` - Delete fish

- `GET /api/v1/plant` - Get all plants
- `GET /api/v1/plant/:id` - Get plant by ID
- `POST /api/v1/plant` - Create new plant
- `PUT /api/v1/plant/:id` - Update plant
- `DELETE /api/v1/plant/:id` - Delete plant

- `GET /api/v1/cart/:user_id` - Get cart items
- `POST /api/v1/cart` - Add to cart
- `PUT /api/v1/cart` - Update cart quantity
- `DELETE /api/v1/cart` - Remove from cart
- `DELETE /api/v1/cart/clear` - Clear cart

- `GET /api/v1/orders/:user_id` - Get user orders
- `POST /api/v1/orders` - Create order
- `GET /api/v1/orders/order/:order_id` - Get order by ID
- `PUT /api/v1/orders/:order_id` - Update order status
- `DELETE /api/v1/orders/:order_id` - Delete order

- `GET /api/v1/reviews` - Get all reviews
- `POST /api/v1/reviews` - Add review
- `PUT /api/v1/reviews/:id` - Update review
- `DELETE /api/v1/reviews/:id` - Delete review

- `POST /api/v1/users/register` - Register user
- `GET /api/v1/users/:uid` - Get user by UID 