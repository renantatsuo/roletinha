#!/bin/bash
if [ $# -ne 2 ]; then
    echo "Error: Missing arguments!"
    echo "Usage: $0 <input_file> <output_file>.webp"
    exit 1
fi

input_file=$1
output_file=$2

if [ ! -f "$input_file" ]; then
    echo "Error: Input file '$input_file' not found!"
    exit 1
fi

ffmpeg -i "$input_file" -lossless 1 -preset default -loop 0 -an -vf scale=180:-1 -r 24 "$output_file"

exit 0
