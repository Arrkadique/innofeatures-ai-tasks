# Fake Store API Testing Script

This script performs automated testing of the Fake Store API (https://fakestoreapi.com/products) to validate product data and identify potential defects.

## Test Objectives

The script validates the following:
1. HTTP status code of the GET response (must be 200 OK)
2. For each product object in the returned array:
   - Title (product name) must be a non-empty string
   - Price must be a non-negative number
   - Rating.rate must be less than or equal to 5

## Requirements

- Python 3.x
- `requests` library
- `pytest` library (for future test extensions)

## Installation

1. Install required Python packages:
```bash
pip install requests pytest
```

## Usage

Run the script directly:
```bash
python test_fakestore_api.py
```

## Output

The script will output:
- A success message if all products pass validation
- For defective products, it will show:
  - Product ID
  - Product Title
  - List of validation errors found

## Example Output

```
❌ Found defective products:

Product ID: 1
Title: Example Product
Defects:
  - Rating exceeds 5 or is invalid
```

## Error Handling

The script handles various error cases:
- Network connection issues
- Invalid API responses
- JSON parsing errors 