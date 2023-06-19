export default {
  postgresUrl:
    process.env.DATABASE_URL ||
    'postgresql://postgres:postgres@localhost:5432/rental_car_api_test?schema=public',
  port: process.env.PORT || 5432,
};
