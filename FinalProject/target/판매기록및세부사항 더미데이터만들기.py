import random
from datetime import datetime, timedelta

# Define file paths for output SQL files
sales_records_output_path = 'C:\\Users\\user\\Downloads\\sales_records_insert_statements.sql'
sales_details_output_path = 'C:\\Users\\user\\Downloads\\sales_details_insert_statements.sql'

# Define product and coffee prices
products_prices = {
    1: 3500, 2: 3700, 3: 3000, 4: 2500, 5: 4000, 6: 3800, 7: 3800,
    8: 3800, 9: 4500, 10: 3300, 11: 4200, 12: 5000, 13: 3800
}
coffees_prices = {
    1: 3200, 2: 3000, 3: 3500, 4: 3800, 5: 3500, 6: 3800, 7: 3500,
    8: 3500, 9: 4000, 10: 4200, 11: 3800, 12: 3500, 13: 4000, 14: 2500
}

# Total products and coffees list
all_products = list(products_prices.items())
all_coffees = list(coffees_prices.items())

# Initialize data lists
sales_records_statements = []
sales_details_statements = []
sale_detail_id = 1
sale_id = 1
start_date = datetime(2024, 1, 1)
end_date = datetime(2024, 12, 31)

# Loop through each day in the date range
current_date = start_date
while current_date <= end_date:
    # Generate 50 sales details for each day with random time within the day
    for _ in range(50):
        # Randomly select between product or coffee and generate detail row
        if random.choice([True, False]):  # Randomly choose between product and coffee
            product_id, unit_price = random.choice(all_products)
            coffee_id = 'NULL'
        else:
            coffee_id, unit_price = random.choice(all_coffees)
            product_id = 'NULL'

        # Random quantity sold between 1 and 5
        quantity_sold = random.randint(1, 5)
        sale_price = quantity_sold * unit_price

        # Randomize time (hour, minute) for each sale within the day
        random_hour = random.randint(0, 23)
        random_minute = random.randint(0, 59)
        sale_datetime = current_date.replace(hour=random_hour, minute=random_minute)

        # Append SalesDetails entry
        sales_details_statements.append(
            f"INSERT INTO ERP.SalesDetails (SaleDetailID, SaleID, ProductID, CoffeeID, QuantitySold, SalePrice) "
            f"VALUES ({sale_detail_id}, {sale_id}, {product_id}, {coffee_id}, {quantity_sold}, {sale_price});"
        )

        # Append SalesRecords entry with the calculated total for this SaleID
        sales_records_statements.append(
            f"INSERT INTO ERP.SalesRecords (SaleID, SaleDate, PaymentType, TotalSalePrice, OrderAmount, DiscountAmount) "
            f"VALUES ({sale_id}, '{sale_datetime.strftime('%Y-%m-%d %H:%M:%S')}', '카카오페이', "
            f"{sale_price}, {sale_price}, 0);"
        )

        sale_detail_id += 1
        sale_id += 1  # Increment SaleID for each sale entry

    # Move to next day
    current_date += timedelta(days=1)

# Save SalesDetails and SalesRecords insert statements to their respective SQL files
with open(sales_details_output_path, 'w', encoding='utf-8') as file:
    file.write("\n".join(sales_details_statements))
print(f"SalesDetails data saved to {sales_details_output_path}")

with open(sales_records_output_path, 'w', encoding='utf-8') as file:
    file.write("\n".join(sales_records_statements))
print(f"SalesRecords data saved to {sales_records_output_path}")
