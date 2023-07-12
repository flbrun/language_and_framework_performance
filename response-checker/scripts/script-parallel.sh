#!/bin/bash

# Variables
url="http://localhost:8080/spring-boot/hello-world"
num_requests=500000
concurrency=200


total_time=0
valid_requests=0
min_time=9999999
max_time=0
failed_requests=0

for (( i=1; i<=num_requests; i+=concurrency )); do

  request_list=""
  for (( j=0; j<concurrency; j++ )); do
    request_list+="curl -s -w '%{time_total}\n' -o /dev/null '$url' & "
  done


  start_time=$(date +%s.%N)
  eval "$request_list"
  wait
  end_time=$(date +%s.%N)


  request_time=$(echo "$end_time - $start_time" | bc -l)
  total_time=$(echo "$total_time + $request_time" | bc)

  valid_requests=$((valid_requests + concurrency))

  # Check if request time is valid (greater than 0)
  if (( $(echo "$request_time > 0" | bc -l) )); then
    if (( $(echo "$request_time < $min_time" | bc -l) )); then
      min_time=$request_time                                    # Dont know why the minimaltime is shown wrong
    fi

    if (( $(echo "$request_time > $max_time" | bc -l) )); then
      max_time=$request_time
    fi

    total_time=$(echo "$total_time + $request_time" | bc)
  else
    failed_requests=$((failed_requests + concurrency))
    echo "Invalid request time: $request_time seconds"
  fi
done


# Calculate average time
if (( valid_requests > 0 )); then
  average_time=$(echo "scale=6; $total_time / $valid_requests" | bc)
  echo "Average time spent: $average_time seconds"
  echo "Minimal time: $min_time seconds"
  echo "Maximal time: $max_time seconds"
  echo "Failed requests: $failed_requests"
else
  echo "No valid requests were recorded."
fi
