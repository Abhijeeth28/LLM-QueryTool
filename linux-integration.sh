#!/bin/bash

# Set the Node.js application URL
APP_URL="http://localhost:3000/query"

# Get the selected text from the clipboard
selected_text=$(xclip -selection clipboard -o)

# Prompt the user for a query related to the selected text
query=$(zenity --entry --title="LLM Query" --text="Enter a query related to the selected text:")

# Send the selected text and query to the Node.js application
response=$(curl -X POST -H "Content-Type: application/json" -d '{"text": "'"$selected_text"'", "query": "'"$query"'"}' $APP_URL)

# Display the response
zenity --info --title="LLM Response" --text="$response"