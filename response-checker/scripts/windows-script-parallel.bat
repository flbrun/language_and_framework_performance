@echo off
setlocal enabledelayedexpansion

REM Variables
set "url=http://localhost:8080/spring-boot/hello-world"
set "num_requests=500000"
set "concurrency=200"

set "total_time=0"
set "valid_requests=0"
set "min_time=9999999"
set "max_time=0"
set "failed_requests=0"

for /l %%i in (1,%concurrency%,%num_requests%) do (
  set "request_list="
  for /l %%j in (1,1,%concurrency%) do (
    set "request_list=!request_list!curl.exe -s -w "%%{time_total}%%{newline}" -o nul "%url%" & "
  )

  set "start_time=!time!"
  for /f "tokens=*" %%a in ('!request_list!') do (
    set "end_time=!time!"
    set "request_time=%%a"
    set "request_time=!request_time:~0,-1!"  REM Remove the newline character at the end
    set /a "request_time=!request_time! * 1000"  REM Convert seconds to milliseconds
    set /a "total_time=!total_time! + !request_time!"

    REM Check if request time is valid (greater than 0)
    if !request_time! gtr 0 (
      if !request_time! lss !min_time! (
        set "min_time=!request_time!"
      )
      if !request_time! gtr !max_time! (
        set "max_time=!request_time!"
      )
      set /a "valid_requests=!valid_requests! + %concurrency%"
    ) else (
      set /a "failed_requests=!failed_requests! + %concurrency%"
      echo Invalid request time: !request_time! milliseconds
    )
  )

  REM Delay to avoid hitting system clock resolution limit
  ping -n 2 127.0.0.1 >nul

  REM Calculate elapsed time in seconds
  set "start_time=!start_time:,=!"
  set "end_time=!end_time:,=!"
  set /a "elapsed_time=(1%end_time:~0,2%-100)*3600 + (1%end_time:~3,2%-100)*60 + (1%end_time:~6,2%-100)*1 + (1%end_time:~9,3%-100)/1000 - (1%start_time:~0,2%-100)*3600 - (1%start_time:~3,2%-100)*60 - (1%start_time:~6,2%-100)*1 - (1%start_time:~9,3%-100)/1000"
  echo Elapsed time: !elapsed_time! seconds
)

REM Calculate average time
if !valid_requests! gtr 0 (
  set /a "average_time=!total_time! / !valid_requests!"
  echo Average time spent: !average_time! milliseconds
  echo Minimal time: !min_time! milliseconds
  echo Maximal time: !max_time! milliseconds
  echo Failed requests: !failed_requests!
) else (
  echo No valid requests were recorded.
)

endlocal
