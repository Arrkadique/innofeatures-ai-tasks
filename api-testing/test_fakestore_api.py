import requests
import json
from typing import List, Dict, Any

class ProductValidator:
    API_URL = "https://fakestoreapi.com/products"

    @staticmethod
    def validate_product(product: Dict[str, Any]) -> List[str]:
        """
        Validates a single product and returns a list of validation errors.
        """
        errors = []
        
        # Validate title
        title = product.get('title', '')
        if not isinstance(title, str) or not title.strip():
            errors.append("Empty or invalid title")

        # Validate price
        price = product.get('price', 0)
        if not isinstance(price, (int, float)) or price < 0:
            errors.append("Negative or invalid price")

        # Validate rating
        rating = product.get('rating', {})
        if isinstance(rating, dict):
            rate = rating.get('rate', 0)
            if not isinstance(rate, (int, float)) or rate > 5:
                errors.append("Rating exceeds 5 or is invalid")
        else:
            errors.append("Invalid rating object")

        return errors

    def test_products(self) -> List[Dict[str, Any]]:
        """
        Tests all products from the API and returns a list of defective products with their errors.
        """
        try:
            # Make API request
            response = requests.get(self.API_URL)
            
            # Validate HTTP status code
            if response.status_code != 200:
                raise Exception(f"API request failed with status code: {response.status_code}")

            # Parse JSON response
            products = response.json()
            defective_products = []

            # Validate each product
            for product in products:
                errors = self.validate_product(product)
                if errors:
                    defective_products.append({
                        'id': product.get('id', 'Unknown'),
                        'title': product.get('title', 'Unknown'),
                        'errors': errors
                    })

            return defective_products

        except requests.RequestException as e:
            raise Exception(f"Failed to connect to the API: {str(e)}")
        except json.JSONDecodeError as e:
            raise Exception(f"Failed to parse API response: {str(e)}")

def main():
    validator = ProductValidator()
    try:
        defective_products = validator.test_products()
        
        if not defective_products:
            print("✅ All products passed validation!")
        else:
            print("❌ Found defective products:")
            for product in defective_products:
                print(f"\nProduct ID: {product['id']}")
                print(f"Title: {product['title']}")
                print("Defects:")
                for error in product['errors']:
                    print(f"  - {error}")

    except Exception as e:
        print(f"Error: {str(e)}")

if __name__ == "__main__":
    main() 