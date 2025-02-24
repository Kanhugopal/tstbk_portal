import gspread
from google.oauth2.service_account import Credentials

# Path to the service account JSON key file
SERVICE_ACCOUNT_FILE = r"C:\Users\kdutt\OneDrive\Desktop\demo port\images\placement-website-442307-e057ed82e639.json"

# The ID of your Google Sheet
SPREADSHEET_ID = '1bybQ2uLgBEf2OI22Jev12kdVzJQfXbKlp6_5nW-M9Q4'

# Define the scope
SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']

# Authenticate and create a service client
def authenticate_google_sheets():
    credentials = Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE, scopes=SCOPES)
    
    # Authorize the client
    client = gspread.authorize(credentials)
    return client

# Function to read data from the Google Sheet
def read_sheet():
    client = authenticate_google_sheets()
    
    # Open the spreadsheet by its ID
    sheet = client.open_by_key(SPREADSHEET_ID).sheet1  # Use sheet1 or change to sheet name
    
    # Get all values from the sheet
    data = sheet.get_all_values()
    
    # Print the data to verify
    for row in data:
        print(row)

if __name__ == '__main__':
    read_sheet()
