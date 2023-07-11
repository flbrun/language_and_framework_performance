#!/bin/bash

# Variables

method="method_tmpl"
server="server_tmpl"
port="port_tmpl"
endpoint="endpoint_tmpl"
num_requests="request_tmpl"

url="$method$server:$port/$endpoint"

total_time=0
valid_requests=0
min_time=9999999
max_time=0
failed_requests=0

counter=0
while [ $counter -lt $num_requests ]; do
    start_time=$(date +%s%N)
    response=$(curl -s -o /dev/null -w '%{time_total}' "$url")
    if [ -z "$response" ]; then
        failed_requests=$((failed_requests + 1))
    else
        request_time=$response
        total_time=$(echo "$total_time + $request_time" | bc)
        valid_requests=$((valid_requests + 1))
        if [ "$(echo "$request_time < $min_time" | bc -l)" -eq 1 ]; then
            min_time=$request_time
        fi
        if [ "$(echo "$request_time > $max_time" | bc -l)" -eq 1 ]; then
            max_time=$request_time
        fi
    fi
    echo $request_time
    counter=$((counter + 1))
done

# Calculate average time
if [ $valid_requests -gt 0 ]; then
    average_time=$(echo "scale=6; $total_time / $valid_requests" | bc)
    echo "Average time spent: $average_time seconds"
    echo "Minimal time: $min_time seconds"
    echo "Maximal time: $max_time seconds"
    echo "Failed requests: $failed_requests"
else
    echo "No valid requests were recorded."
fi
